import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactGovernment = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ recipientId: '', subject: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/communication/contacts', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setContacts(Array.isArray(data) ? data.filter(u => u.role === 'government') : []);
      } catch {
        setError('Failed to load government contacts');
      }
    };
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/communication/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to send message');
      setSuccess(true);
      setTimeout(() => navigate('/farmer-portal'), 1200);
    } catch {
      setError('Failed to send message');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Government</h2>
      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Recipient</label>
          <select name="recipientId" value={form.recipientId} onChange={handleChange} className="input w-full" required>
            <option value="">Select government contact</option>
            {contacts.map(gov => (
              <option key={gov._id} value={gov._id}>{gov.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input name="subject" value={form.subject} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea name="content" value={form.content} onChange={handleChange} className="input w-full" rows={4} required />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">Message sent to government! Redirecting...</div>}
        <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Sending...' : 'Send'}</button>
      </form>
    </div>
  );
};

export default ContactGovernment;
