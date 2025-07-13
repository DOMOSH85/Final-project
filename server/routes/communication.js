const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const router = express.Router();

// Mock message data - in real app, this would be stored in database
let messages = [
  {
    id: 1,
    sender: {
      id: 'user1',
      name: 'John Smith',
      role: 'farmer'
    },
    recipient: {
      id: 'user2',
      name: 'Dr. Emily Wilson',
      role: 'government'
    },
    subject: 'Subsidy Application Query',
    content: 'I have a question about the new subsidy program. Can you provide more details about the eligibility criteria?',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
    priority: 'normal'
  },
  {
    id: 2,
    sender: {
      id: 'user2',
      name: 'Dr. Emily Wilson',
      role: 'government'
    },
    recipient: {
      id: 'user1',
      name: 'John Smith',
      role: 'farmer'
    },
    subject: 'Re: Subsidy Application Query',
    content: 'Thank you for your inquiry. The eligibility criteria include land size, crop type, and sustainable practices. Please check our website for detailed information.',
    timestamp: '2024-01-15T14:20:00Z',
    read: true,
    priority: 'normal'
  }
];

// @route   GET /api/communication/messages
// @desc    Get user's messages
// @access  Private
router.get('/messages', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Filter messages for the current user
    const userMessages = messages.filter(
      msg => msg.sender.id === userId || msg.recipient.id === userId
    );

    // Sort by timestamp (newest first)
    userMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json(userMessages);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/communication/messages/:id
// @desc    Get specific message
// @access  Private
router.get('/messages/:id', auth, async (req, res) => {
  try {
    const message = messages.find(msg => msg.id === parseInt(req.params.id));
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if user has access to this message
    if (message.sender.id !== req.user.id && message.recipient.id !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Mark as read if recipient is viewing
    if (message.recipient.id === req.user.id && !message.read) {
      message.read = true;
    }

    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/communication/messages
// @desc    Send a new message
// @access  Private
router.post('/messages', auth, [
  body('recipientId', 'Recipient ID is required').not().isEmpty(),
  body('subject', 'Subject is required').not().isEmpty(),
  body('content', 'Message content is required').not().isEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { recipientId, subject, content, priority = 'normal' } = req.body;

    // Get recipient details (in real app, this would be from database)
    const recipient = await User.findById(recipientId).select('name role');
    
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const newMessage = {
      id: messages.length + 1,
      sender: {
        id: req.user.id,
        name: req.user.name,
        role: req.user.role
      },
      recipient: {
        id: recipient.id,
        name: recipient.name,
        role: recipient.role
      },
      subject,
      content,
      timestamp: new Date().toISOString(),
      read: false,
      priority
    };

    messages.push(newMessage);

    res.json(newMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/communication/messages/:id/read
// @desc    Mark message as read
// @access  Private
router.put('/messages/:id/read', auth, async (req, res) => {
  try {
    const message = messages.find(msg => msg.id === parseInt(req.params.id));
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if user is the recipient
    if (message.recipient.id !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    message.read = true;

    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/communication/messages/:id
// @desc    Delete message
// @access  Private
router.delete('/messages/:id', auth, async (req, res) => {
  try {
    const messageIndex = messages.findIndex(msg => msg.id === parseInt(req.params.id));
    
    if (messageIndex === -1) {
      return res.status(404).json({ message: 'Message not found' });
    }

    const message = messages[messageIndex];

    // Check if user is the sender or recipient
    if (message.sender.id !== req.user.id && message.recipient.id !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    messages.splice(messageIndex, 1);

    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/communication/contacts
// @desc    Get available contacts for messaging
// @access  Private
router.get('/contacts', auth, async (req, res) => {
  try {
    // Get all users except current user
    const contacts = await User.find({ 
      _id: { $ne: req.user.id },
      isActive: true 
    })
    .select('name role department location')
    .sort({ name: 1 });

    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/communication/notifications
// @desc    Get unread message count
// @access  Private
router.get('/notifications', auth, async (req, res) => {
  try {
    const unreadCount = messages.filter(
      msg => msg.recipient.id === req.user.id && !msg.read
    ).length;

    const recentMessages = messages
      .filter(msg => msg.sender.id === req.user.id || msg.recipient.id === req.user.id)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);

    res.json({
      unreadCount,
      recentMessages
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/communication/announcements
// @desc    Get system announcements
// @access  Private
router.get('/announcements', auth, async (req, res) => {
  try {
    // Mock announcements data
    const announcements = [
      {
        id: 1,
        title: 'New Subsidy Program Launch',
        content: 'A new agricultural subsidy program has been launched. Check the government portal for details.',
        type: 'info',
        priority: 'high',
        timestamp: '2024-01-15T09:00:00Z',
        expiresAt: '2024-02-15T09:00:00Z'
      },
      {
        id: 2,
        title: 'System Maintenance Notice',
        content: 'The platform will be under maintenance on January 20th from 2-4 AM. Please plan accordingly.',
        type: 'warning',
        priority: 'medium',
        timestamp: '2024-01-14T16:00:00Z',
        expiresAt: '2024-01-21T16:00:00Z'
      },
      {
        id: 3,
        title: 'Weather Alert',
        content: 'Heavy rainfall expected in the northern region. Farmers are advised to take necessary precautions.',
        type: 'alert',
        priority: 'high',
        timestamp: '2024-01-13T10:00:00Z',
        expiresAt: '2024-01-16T10:00:00Z'
      }
    ];

    res.json(announcements);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 