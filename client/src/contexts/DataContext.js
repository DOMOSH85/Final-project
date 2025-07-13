import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

// Mock data for development - moved outside component to prevent recreation
const mockLandData = [
  {
    id: 1,
    name: "North Field",
    area: 150,
    crop: "Wheat",
    soilType: "Loamy",
    status: "Active",
    coordinates: [40.7128, -74.0060],
    farmer: "John Smith",
    lastUpdated: "2024-01-15"
  },
  {
    id: 2,
    name: "South Meadow",
    area: 200,
    crop: "Corn",
    soilType: "Clay",
    status: "Active",
    coordinates: [40.7589, -73.9851],
    farmer: "Sarah Johnson",
    lastUpdated: "2024-01-14"
  },
  {
    id: 3,
    name: "East Valley",
    area: 300,
    crop: "Soybeans",
    soilType: "Sandy",
    status: "Planning",
    coordinates: [40.7505, -73.9934],
    farmer: "Mike Davis",
    lastUpdated: "2024-01-13"
  }
];

const mockFarmerData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-0123",
    location: "North Region",
    totalLand: 450,
    activeCrops: 3,
    joinDate: "2023-01-15"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1-555-0124",
    location: "South Region",
    totalLand: 320,
    activeCrops: 2,
    joinDate: "2023-02-20"
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.davis@email.com",
    phone: "+1-555-0125",
    location: "East Region",
    totalLand: 580,
    activeCrops: 4,
    joinDate: "2023-03-10"
  }
];

const mockGovernmentData = [
  {
    id: 1,
    department: "Agriculture Department",
    contact: "Dr. Emily Wilson",
    email: "emily.wilson@gov.ag",
    phone: "+1-555-0100",
    policies: 12,
    activeSubsidies: 8
  },
  {
    id: 2,
    department: "Environmental Protection",
    contact: "James Brown",
    email: "james.brown@gov.env",
    phone: "+1-555-0101",
    policies: 8,
    activeSubsidies: 5
  },
  {
    id: 3,
    department: "Rural Development",
    contact: "Lisa Garcia",
    email: "lisa.garcia@gov.rural",
    phone: "+1-555-0102",
    policies: 15,
    activeSubsidies: 12
  }
];

const mockAnalyticsData = {
  totalLand: 1250,
  activeFarmers: 156,
  governmentPartners: 8,
  averageYield: 85.5,
  sustainabilityScore: 92,
  monthlyGrowth: 12.5,
  cropDistribution: {
    wheat: 35,
    corn: 28,
    soybeans: 22,
    other: 15
  },
  regionalData: [
    { region: "North", landArea: 450, farmers: 45 },
    { region: "South", landArea: 380, farmers: 38 },
    { region: "East", landArea: 420, farmers: 42 }
  ]
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [landData, setLandData] = useState([]);
  const [farmerData, setFarmerData] = useState([]);
  const [governmentData, setGovernmentData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load mock data on component mount
    setLandData(mockLandData);
    setFarmerData(mockFarmerData);
    setGovernmentData(mockGovernmentData);
    setAnalyticsData(mockAnalyticsData);
  }, []); // Empty dependency array since mock data is now static

  const fetchLandData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/land', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLandData(response.data);
    } catch (error) {
      setError('Failed to fetch land data');
      console.error('Error fetching land data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFarmerData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/farmers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFarmerData(response.data);
    } catch (error) {
      setError('Failed to fetch farmer data');
      console.error('Error fetching farmer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/analytics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalyticsData(response.data);
    } catch (error) {
      setError('Failed to fetch analytics data');
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addLandRecord = async (landData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/land', landData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLandData(prev => [...prev, response.data]);
      return { success: true };
    } catch (error) {
      setError('Failed to add land record');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const updateLandRecord = async (id, landData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`/api/land/${id}`, landData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLandData(prev => prev.map(item => item.id === id ? response.data : item));
      return { success: true };
    } catch (error) {
      setError('Failed to update land record');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const value = {
    landData,
    farmerData,
    governmentData,
    analyticsData,
    loading,
    error,
    fetchLandData,
    fetchFarmerData,
    fetchAnalyticsData,
    addLandRecord,
    updateLandRecord
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}; 