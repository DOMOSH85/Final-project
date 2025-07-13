import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import {
  MapIcon,
  CogIcon,
  CloudIcon,
  DocumentTextIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const FarmerPortal = () => {
  const { user } = useAuth();
  const { addLandRecord } = useData();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [cropForm, setCropForm] = useState({
    name: '',
    area: '',
    cropType: '',
    plantingDate: '',
    expectedHarvest: '',
    notes: ''
  });
  const [equipmentForm, setEquipmentForm] = useState({
    name: '',
    type: '',
    purchaseDate: '',
    maintenanceDate: '',
    status: 'active'
  });

  // Mock weather data
  useEffect(() => {
    setWeatherData({
      temperature: 24,
      humidity: 65,
      windSpeed: 12,
      condition: 'Partly Cloudy',
      forecast: [
        { day: 'Today', temp: 24, condition: 'Partly Cloudy' },
        { day: 'Tomorrow', temp: 26, condition: 'Sunny' },
        { day: 'Wednesday', temp: 22, condition: 'Rainy' }
      ]
    });
  }, []);

  const handleCropSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCrop = {
        ...cropForm,
        id: Date.now(),
        farmerId: user.id,
        status: 'active',
        createdAt: new Date().toISOString()
      };
      
      await addLandRecord(newCrop);
      setCropForm({
        name: '',
        area: '',
        cropType: '',
        plantingDate: '',
        expectedHarvest: '',
        notes: ''
      });
      setShowAddCrop(false);
      toast.success('Crop added successfully!');
    } catch (error) {
      toast.error('Failed to add crop');
    }
  };

  const handleEquipmentSubmit = (e) => {
    e.preventDefault();
    // Mock equipment addition
    toast.success('Equipment added successfully!');
    setEquipmentForm({
      name: '',
      type: '',
      purchaseDate: '',
      maintenanceDate: '',
      status: 'active'
    });
    setShowAddEquipment(false);
  };

  const mockCrops = [
    {
      id: 1,
      name: 'North Field',
      cropType: 'Wheat',
      area: 150,
      plantingDate: '2024-01-15',
      expectedHarvest: '2024-06-15',
      status: 'active',
      progress: 75
    },
    {
      id: 2,
      name: 'South Field',
      cropType: 'Corn',
      area: 200,
      plantingDate: '2024-02-01',
      expectedHarvest: '2024-07-01',
      status: 'active',
      progress: 45
    }
  ];

  const mockEquipment = [
    {
      id: 1,
      name: 'John Deere Tractor',
      type: 'Tractor',
      purchaseDate: '2020-03-15',
      maintenanceDate: '2024-04-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Irrigation System',
      type: 'Irrigation',
      purchaseDate: '2021-06-20',
      maintenanceDate: '2024-05-20',
      status: 'maintenance'
    }
  ];

  const mockResources = [
    {
      id: 1,
      title: 'Sustainable Farming Guide',
      type: 'PDF',
      description: 'Comprehensive guide to sustainable farming practices',
      url: '#'
    },
    {
      id: 2,
      title: 'Crop Disease Prevention',
      type: 'Video',
      description: 'Learn how to prevent common crop diseases',
      url: '#'
    },
    {
      id: 3,
      title: 'Government Subsidies 2024',
      type: 'Document',
      description: 'Updated information on available subsidies',
      url: '#'
    }
  ];

  const stats = [
    {
      name: 'Total Land Area',
      value: '350 acres',
      icon: MapIcon,
      color: 'bg-green-500'
    },
    {
      name: 'Active Crops',
      value: mockCrops.length,
      icon: ChartBarIcon,
      color: 'bg-blue-500'
    },
    {
      name: 'Equipment Count',
      value: mockEquipment.length,
      icon: CogIcon,
      color: 'bg-purple-500'
    },
    {
      name: 'Monthly Revenue',
      value: '$12,450',
      icon: CurrencyDollarIcon,
      color: 'bg-emerald-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farmer Portal</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'Farmer'}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weather Widget */}
      {weatherData && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Weather Information</h3>
            <CloudIcon className="w-6 h-6 text-blue-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{weatherData.temperature}°C</div>
              <div className="text-sm text-gray-600">Current Temperature</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{weatherData.humidity}%</div>
              <div className="text-sm text-gray-600">Humidity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{weatherData.windSpeed} km/h</div>
              <div className="text-sm text-gray-600">Wind Speed</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">3-Day Forecast</h4>
            <div className="grid grid-cols-3 gap-4">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-medium text-gray-900">{day.day}</div>
                  <div className="text-lg font-bold text-gray-700">{day.temp}°C</div>
                  <div className="text-xs text-gray-600">{day.condition}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: ChartBarIcon },
            { id: 'crops', name: 'Crop Management', icon: MapIcon },
            { id: 'equipment', name: 'Equipment', icon: CogIcon },
            { id: 'resources', name: 'Resources', icon: DocumentTextIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <CalendarIcon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Crop planted in North Field</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <InformationCircleIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Equipment maintenance scheduled</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Weather alert: Rain expected</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('crops')}
                  className="flex items-center justify-center p-4 border-2 border-green-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                >
                  <MapIcon className="w-6 h-6 text-green-600 mr-2" />
                  <span className="font-medium text-green-700">Add Crop</span>
                </button>
                <button
                  onClick={() => setActiveTab('equipment')}
                  className="flex items-center justify-center p-4 border-2 border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <CogIcon className="w-6 h-6 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-700">Manage Equipment</span>
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className="flex items-center justify-center p-4 border-2 border-purple-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <DocumentTextIcon className="w-6 h-6 text-purple-600 mr-2" />
                  <span className="font-medium text-purple-700">View Resources</span>
                </button>
                <button className="flex items-center justify-center p-4 border-2 border-emerald-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                  <CurrencyDollarIcon className="w-6 h-6 text-emerald-600 mr-2" />
                  <span className="font-medium text-emerald-700">Financial Report</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Crops Tab */}
        {activeTab === 'crops' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Crop Management</h3>
              <button
                onClick={() => setShowAddCrop(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Add New Crop</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCrops.map((crop) => (
                <div key={crop.id} className="card-hover">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{crop.name}</h4>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Crop Type:</span>
                      <span className="text-sm font-medium">{crop.cropType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Area:</span>
                      <span className="text-sm font-medium">{crop.area} acres</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Progress:</span>
                      <span className="text-sm font-medium">{crop.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${crop.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Crop Modal */}
            {showAddCrop && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Crop</h3>
                  <form onSubmit={handleCropSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Field Name
                      </label>
                      <input
                        type="text"
                        value={cropForm.name}
                        onChange={(e) => setCropForm({...cropForm, name: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Crop Type
                      </label>
                      <select
                        value={cropForm.cropType}
                        onChange={(e) => setCropForm({...cropForm, cropType: e.target.value})}
                        className="input-field"
                        required
                      >
                        <option value="">Select crop type</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Corn">Corn</option>
                        <option value="Soybeans">Soybeans</option>
                        <option value="Rice">Rice</option>
                        <option value="Cotton">Cotton</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Area (acres)
                      </label>
                      <input
                        type="number"
                        value={cropForm.area}
                        onChange={(e) => setCropForm({...cropForm, area: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Planting Date
                      </label>
                      <input
                        type="date"
                        value={cropForm.plantingDate}
                        onChange={(e) => setCropForm({...cropForm, plantingDate: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expected Harvest Date
                      </label>
                      <input
                        type="date"
                        value={cropForm.expectedHarvest}
                        onChange={(e) => setCropForm({...cropForm, expectedHarvest: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        value={cropForm.notes}
                        onChange={(e) => setCropForm({...cropForm, notes: e.target.value})}
                        className="input-field"
                        rows="3"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="btn-primary flex-1"
                      >
                        Add Crop
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddCrop(false)}
                        className="btn-secondary flex-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Equipment Tab */}
        {activeTab === 'equipment' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Equipment Management</h3>
              <button
                onClick={() => setShowAddEquipment(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Add Equipment</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEquipment.map((equipment) => (
                <div key={equipment.id} className="card-hover">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{equipment.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      equipment.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {equipment.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className="text-sm font-medium">{equipment.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Purchase Date:</span>
                      <span className="text-sm font-medium">{equipment.purchaseDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Next Maintenance:</span>
                      <span className="text-sm font-medium">{equipment.maintenanceDate}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="btn-secondary text-xs py-1 px-2">
                      Schedule Maintenance
                    </button>
                    <button className="btn-secondary text-xs py-1 px-2">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Equipment Modal */}
            {showAddEquipment && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Equipment</h3>
                  <form onSubmit={handleEquipmentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Equipment Name
                      </label>
                      <input
                        type="text"
                        value={equipmentForm.name}
                        onChange={(e) => setEquipmentForm({...equipmentForm, name: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Equipment Type
                      </label>
                      <select
                        value={equipmentForm.type}
                        onChange={(e) => setEquipmentForm({...equipmentForm, type: e.target.value})}
                        className="input-field"
                        required
                      >
                        <option value="">Select equipment type</option>
                        <option value="Tractor">Tractor</option>
                        <option value="Harvester">Harvester</option>
                        <option value="Irrigation">Irrigation System</option>
                        <option value="Seeder">Seeder</option>
                        <option value="Sprayer">Sprayer</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Purchase Date
                      </label>
                      <input
                        type="date"
                        value={equipmentForm.purchaseDate}
                        onChange={(e) => setEquipmentForm({...equipmentForm, purchaseDate: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Next Maintenance Date
                      </label>
                      <input
                        type="date"
                        value={equipmentForm.maintenanceDate}
                        onChange={(e) => setEquipmentForm({...equipmentForm, maintenanceDate: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="btn-primary flex-1"
                      >
                        Add Equipment
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddEquipment(false)}
                        className="btn-secondary flex-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Farming Resources</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockResources.map((resource) => (
                <div key={resource.id} className="card-hover">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <DocumentTextIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-500">{resource.type}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{resource.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                  <button className="btn-primary w-full">
                    View Resource
                  </button>
                </div>
              ))}
            </div>

            <div className="card">
              <h4 className="font-semibold text-gray-900 mb-4">Government Support</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <h5 className="font-medium text-green-900">Subsidy Application</h5>
                    <p className="text-sm text-green-700">Apply for agricultural subsidies</p>
                  </div>
                  <button className="btn-primary">Apply Now</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h5 className="font-medium text-blue-900">Technical Support</h5>
                    <p className="text-sm text-blue-700">Get expert farming advice</p>
                  </div>
                  <button className="btn-primary">Contact Expert</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerPortal; 