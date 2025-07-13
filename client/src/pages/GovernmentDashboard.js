import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  DocumentTextIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const GovernmentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddPolicy, setShowAddPolicy] = useState(false);
  const [showAddSubsidy, setShowAddSubsidy] = useState(false);

  const mockPolicies = [
    {
      id: 1,
      title: 'Sustainable Agriculture Initiative 2024',
      status: 'active',
      category: 'Environmental',
      department: 'Agriculture Department',
      createdDate: '2024-01-15',
      effectiveDate: '2024-02-01',
      budget: '$2.5M',
      beneficiaries: 450
    },
    {
      id: 2,
      title: 'Crop Insurance Program',
      status: 'draft',
      category: 'Financial',
      department: 'Rural Development',
      createdDate: '2024-01-10',
      effectiveDate: '2024-03-01',
      budget: '$1.8M',
      beneficiaries: 320
    },
    {
      id: 3,
      title: 'Water Conservation Policy',
      status: 'review',
      category: 'Environmental',
      department: 'Environmental Protection',
      createdDate: '2024-01-05',
      effectiveDate: '2024-04-01',
      budget: '$3.2M',
      beneficiaries: 280
    }
  ];

  const mockSubsidies = [
    {
      id: 1,
      name: 'Equipment Purchase Grant',
      status: 'active',
      amount: '$5,000',
      applicants: 156,
      approved: 89,
      pending: 45,
      rejected: 22
    },
    {
      id: 2,
      name: 'Organic Certification Support',
      status: 'active',
      amount: '$2,500',
      applicants: 89,
      approved: 67,
      pending: 12,
      rejected: 10
    },
    {
      id: 3,
      name: 'Irrigation System Upgrade',
      status: 'planning',
      amount: '$8,000',
      applicants: 234,
      approved: 0,
      pending: 234,
      rejected: 0
    }
  ];

  const mockStats = [
    {
      name: 'Active Policies',
      value: mockPolicies.filter(p => p.status === 'active').length,
      icon: DocumentTextIcon,
      color: 'bg-blue-500'
    },
    {
      name: 'Total Subsidies',
      value: mockSubsidies.length,
      icon: CurrencyDollarIcon,
      color: 'bg-green-500'
    },
    {
      name: 'Beneficiaries',
      value: '1,250',
      icon: UserGroupIcon,
      color: 'bg-purple-500'
    },
    {
      name: 'Budget Allocated',
      value: '$12.5M',
      icon: ChartBarIcon,
      color: 'bg-emerald-500'
    }
  ];

  const mockApplications = [
    {
      id: 1,
      farmerName: 'John Smith',
      subsidyType: 'Equipment Purchase Grant',
      amount: '$5,000',
      status: 'approved',
      submittedDate: '2024-01-15',
      reviewDate: '2024-01-20'
    },
    {
      id: 2,
      farmerName: 'Sarah Johnson',
      subsidyType: 'Organic Certification Support',
      amount: '$2,500',
      status: 'pending',
      submittedDate: '2024-01-18',
      reviewDate: null
    },
    {
      id: 3,
      farmerName: 'Mike Davis',
      subsidyType: 'Irrigation System Upgrade',
      amount: '$8,000',
      status: 'review',
      submittedDate: '2024-01-12',
      reviewDate: null
    }
  ];

  const handlePolicySubmit = (e) => {
    e.preventDefault();
    toast.success('Policy created successfully!');
    setShowAddPolicy(false);
  };

  const handleSubsidySubmit = (e) => {
    e.preventDefault();
    toast.success('Subsidy program created successfully!');
    setShowAddSubsidy(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Government Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.name || 'Government Official'}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat) => (
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

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: ChartBarIcon },
            { id: 'policies', name: 'Policies', icon: DocumentTextIcon },
            { id: 'subsidies', name: 'Subsidies', icon: CurrencyDollarIcon },
            { id: 'applications', name: 'Applications', icon: UserGroupIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
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
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                <CalendarIcon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New policy approved</p>
                    <p className="text-xs text-gray-500">Sustainable Agriculture Initiative</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <ExclamationTriangleIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Subsidy applications pending</p>
                    <p className="text-xs text-gray-500">45 applications require review</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <ClockIcon className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Budget review due</p>
                    <p className="text-xs text-gray-500">Q1 budget review in 3 days</p>
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
                  onClick={() => setActiveTab('policies')}
                  className="flex items-center justify-center p-4 border-2 border-purple-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <DocumentTextIcon className="w-6 h-6 text-purple-600 mr-2" />
                  <span className="font-medium text-purple-700">Create Policy</span>
                </button>
                <button
                  onClick={() => setActiveTab('subsidies')}
                  className="flex items-center justify-center p-4 border-2 border-green-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                >
                  <CurrencyDollarIcon className="w-6 h-6 text-green-600 mr-2" />
                  <span className="font-medium text-green-700">Add Subsidy</span>
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="flex items-center justify-center p-4 border-2 border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <UserGroupIcon className="w-6 h-6 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-700">Review Applications</span>
                </button>
                <button className="flex items-center justify-center p-4 border-2 border-emerald-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                  <ChartBarIcon className="w-6 h-6 text-emerald-600 mr-2" />
                  <span className="font-medium text-emerald-700">Generate Report</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Policies Tab */}
        {activeTab === 'policies' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Policy Management</h3>
              <button
                onClick={() => setShowAddPolicy(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Create Policy</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPolicies.map((policy) => (
                <div key={policy.id} className="card-hover">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{policy.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      policy.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : policy.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {policy.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Category:</span>
                      <span className="text-sm font-medium">{policy.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Department:</span>
                      <span className="text-sm font-medium">{policy.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Budget:</span>
                      <span className="text-sm font-medium">{policy.budget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Beneficiaries:</span>
                      <span className="text-sm font-medium">{policy.beneficiaries}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="btn-secondary text-xs py-1 px-2">
                      <EyeIcon className="w-3 h-3 mr-1" />
                      View
                    </button>
                    <button className="btn-secondary text-xs py-1 px-2">
                      <PencilIcon className="w-3 h-3 mr-1" />
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Policy Modal */}
            {showAddPolicy && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Policy</h3>
                  <form onSubmit={handlePolicySubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Policy Title
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select className="input-field" required>
                        <option value="">Select category</option>
                        <option value="Environmental">Environmental</option>
                        <option value="Financial">Financial</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Education">Education</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <select className="input-field" required>
                        <option value="">Select department</option>
                        <option value="Agriculture Department">Agriculture Department</option>
                        <option value="Environmental Protection">Environmental Protection</option>
                        <option value="Rural Development">Rural Development</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Budget
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="$1,000,000"
                        required
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="btn-primary flex-1"
                      >
                        Create Policy
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddPolicy(false)}
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

        {/* Subsidies Tab */}
        {activeTab === 'subsidies' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Subsidy Programs</h3>
              <button
                onClick={() => setShowAddSubsidy(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Add Subsidy Program</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockSubsidies.map((subsidy) => (
                <div key={subsidy.id} className="card-hover">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{subsidy.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      subsidy.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {subsidy.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Amount:</span>
                      <span className="text-sm font-medium">{subsidy.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Applicants:</span>
                      <span className="text-sm font-medium">{subsidy.applicants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Approved:</span>
                      <span className="text-sm font-medium text-green-600">{subsidy.approved}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pending:</span>
                      <span className="text-sm font-medium text-yellow-600">{subsidy.pending}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="btn-secondary text-xs py-1 px-2">
                      <EyeIcon className="w-3 h-3 mr-1" />
                      View Details
                    </button>
                    <button className="btn-secondary text-xs py-1 px-2">
                      <PencilIcon className="w-3 h-3 mr-1" />
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Subsidy Modal */}
            {showAddSubsidy && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Subsidy Program</h3>
                  <form onSubmit={handleSubsidySubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Program Name
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="$5,000"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        className="input-field"
                        rows="3"
                        placeholder="Describe the subsidy program..."
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="btn-primary flex-1"
                      >
                        Create Program
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddSubsidy(false)}
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

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Subsidy Applications</h3>
              <div className="flex items-center space-x-2">
                <button className="btn-secondary">Export Data</button>
                <button className="btn-primary">Bulk Approve</button>
              </div>
            </div>

            <div className="card">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Farmer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subsidy Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockApplications.map((application) => (
                      <tr key={application.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{application.farmerName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{application.subsidyType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{application.amount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            application.status === 'approved' 
                              ? 'bg-green-100 text-green-800' 
                              : application.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {application.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{application.submittedDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">Review</button>
                            <button className="text-green-600 hover:text-green-900">Approve</button>
                            <button className="text-red-600 hover:text-red-900">Reject</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernmentDashboard; 