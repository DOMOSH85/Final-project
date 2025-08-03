import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { BuildingOfficeIcon, DocumentTextIcon, CurrencyDollarIcon, UserGroupIcon, CalendarIcon, ChartBarIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, XAxis, YAxis, CartesianGrid, Bar } from 'recharts';
import Layout from '../components/Layout/Layout';
import DepartmentModal from '../components/Modals/DepartmentModal';
import PolicyModal from '../components/Modals/PolicyModal';
import SubsidyModal from '../components/Modals/SubsidyModal';

const GovernmentPortal = () => {
  const { user } = useAuth();

  const { governmentData, analyticsData, fetchGovernmentData, fetchAnalyticsData, fetchPolicies, fetchSubsidies, loading, error } = useData();
  // Local state for modals and selected items
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [editDept, setEditDept] = useState(null);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [editPolicy, setEditPolicy] = useState(null);
  const [showSubsidyModal, setShowSubsidyModal] = useState(false);
  const [editSubsidy, setEditSubsidy] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [subsidies, setSubsidies] = useState([]);

  useEffect(() => {
    fetchGovernmentData();
    fetchAnalyticsData();
    fetchPolicies().then(setPolicies);
    fetchSubsidies().then(setSubsidies);
  }, [fetchGovernmentData, fetchAnalyticsData, fetchPolicies, fetchSubsidies]);

  // Handlers for Department
  const handleAddDept = () => { setEditDept(null); setShowDeptModal(true); };
  const handleEditDept = (dept) => { setEditDept(dept); setShowDeptModal(true); };
  const handleDeleteDept = (dept) => { /* TODO: delete from backend */ };
  const handleDeptSubmit = (data) => {
    // TODO: call backend to add or update
    setShowDeptModal(false);
    setEditDept(null);
  };
  // Handlers for Policy
  const handleAddPolicy = () => { setEditPolicy(null); setShowPolicyModal(true); };
  const handleEditPolicy = (policy) => { setEditPolicy(policy); setShowPolicyModal(true); };
  const handleDeletePolicy = (policy) => { /* TODO: delete from backend */ };
  const handlePolicySubmit = (data) => {
    // TODO: call backend to add or update
    setShowPolicyModal(false);
    setEditPolicy(null);
  };
  // Handlers for Subsidy
  const handleAddSubsidy = () => { setEditSubsidy(null); setShowSubsidyModal(true); };
  const handleEditSubsidy = (subsidy) => { setEditSubsidy(subsidy); setShowSubsidyModal(true); };
  const handleDeleteSubsidy = (subsidy) => { /* TODO: delete from backend */ };
  const handleSubsidySubmit = (data) => {
    // TODO: call backend to add or update
    setShowSubsidyModal(false);
    setEditSubsidy(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {loading && <div className="text-center py-8 text-gray-500">Loading...</div>}
        {error && <div className="text-center py-2 text-red-600">{error}</div>}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Government Portal</h1>
            <p className="text-gray-600">Welcome, {user?.name || 'Official'}</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
        {/* Government Dashboard Features */}
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">{governmentData.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500">
                <UserGroupIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Policies</p>
                <p className="text-2xl font-bold text-gray-900">{governmentData.reduce((sum, d) => sum + (d.policies || 0), 0)}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500">
                <DocumentTextIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Subsidies</p>
                <p className="text-2xl font-bold text-gray-900">{governmentData.reduce((sum, d) => sum + (d.activeSubsidies || 0), 0)}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500">
                <CurrencyDollarIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Regions</p>
                <p className="text-2xl font-bold text-gray-900">{(analyticsData.regionalData && analyticsData.regionalData.length) || 0}</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500">
                <ChartBarIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Crop Distribution */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Crop Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={Object.entries(analyticsData.cropDistribution || {}).map(([name, value]) => ({ name, value }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(Object.entries(analyticsData.cropDistribution || {})).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#22c55e", "#3b82f6", "#8b5cf6", "#f59e0b"][index % 4]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Regional Land Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Land Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.regionalData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="landArea" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {/* Example: Show recent department/policy/subsidy updates */}
          {governmentData.slice(0, 5).map(dep => (
            <div key={dep.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <UserGroupIcon className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{dep.department} Updated</p>
                <p className="text-sm text-gray-600">Policies: {dep.policies}, Subsidies: {dep.activeSubsidies}</p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span>{dep.contact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="card mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-green-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
            <BuildingOfficeIcon className="w-6 h-6 text-green-600 mr-2" />
            <span className="font-medium text-green-700">Add Department</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <UserGroupIcon className="w-6 h-6 text-blue-600 mr-2" />
            <span className="font-medium text-blue-700">Register Farmer</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-purple-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <UserGroupIcon className="w-6 h-6 text-purple-600 mr-2" />
            <span className="font-medium text-purple-700">Contact Farmers</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-emerald-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
            <ChartBarIcon className="w-6 h-6 text-emerald-600 mr-2" />
            <span className="font-medium text-emerald-700">Generate Report</span>
          </button>
        </div>
      </div>
      {/* Government Functionalities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Department Management */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Department Management</h3>
              <button className="btn-primary" onClick={handleAddDept}>Add Department</button>
            </div>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Department</th>
                  <th className="p-2 text-left">Policies</th>
                  <th className="p-2 text-left">Active Subsidies</th>
                  <th className="p-2 text-left">Contact</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {governmentData.map((dept) => (
                  <tr key={dept.id} className="border-b">
                    <td className="p-2">{dept.department}</td>
                    <td className="p-2">{dept.policies}</td>
                    <td className="p-2">{dept.activeSubsidies}</td>
                    <td className="p-2">{dept.contact}</td>
                    <td className="p-2 flex space-x-2">
                      <button onClick={() => handleEditDept(dept)} className="text-blue-600 hover:underline"><PencilIcon className="w-4 h-4 inline" /></button>
                      <button onClick={() => handleDeleteDept(dept)} className="text-red-600 hover:underline"><TrashIcon className="w-4 h-4 inline" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Policy Management */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Policy Management</h3>
              <button className="btn-primary" onClick={handleAddPolicy}>Add Policy</button>
            </div>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Department</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((policy, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2">{policy.name}</td>
                    <td className="p-2">{policy.description}</td>
                    <td className="p-2">{policy.department}</td>
                    <td className="p-2 flex space-x-2">
                      <button onClick={() => handleEditPolicy(policy)} className="text-blue-600 hover:underline"><PencilIcon className="w-4 h-4 inline" /></button>
                      <button onClick={() => handleDeletePolicy(policy)} className="text-red-600 hover:underline"><TrashIcon className="w-4 h-4 inline" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Subsidy Management */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Subsidy Management</h3>
              <button className="btn-primary" onClick={handleAddSubsidy}>Add Subsidy</button>
            </div>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Deadline</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subsidies.map((subsidy, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2">{subsidy.name}</td>
                    <td className="p-2">{subsidy.amount}</td>
                    <td className="p-2">{subsidy.deadline}</td>
                    <td className="p-2">{subsidy.description}</td>
                    <td className="p-2 flex space-x-2">
                      <button onClick={() => handleEditSubsidy(subsidy)} className="text-blue-600 hover:underline"><PencilIcon className="w-4 h-4 inline" /></button>
                      <button onClick={() => handleDeleteSubsidy(subsidy)} className="text-red-600 hover:underline"><TrashIcon className="w-4 h-4 inline" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Regional Analytics */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Analytics</h3>
            <p className="text-gray-600">View analytics and reports by region.</p>
            {/* Example: Table of regional data */}
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Region</th>
                  <th className="p-2 text-left">Land Area</th>
                </tr>
              </thead>
              <tbody>
                {(analyticsData.regionalData || []).map((region, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2">{region.region}</td>
                    <td className="p-2">{region.landArea}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Support */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
            <p className="text-gray-600">Request help or contact support for assistance.</p>
            {/* TODO: Support request form/component */}
          </div>
        </div>
        {/* Modals for add/edit */}
        <DepartmentModal open={showDeptModal} onClose={() => { setShowDeptModal(false); setEditDept(null); }} onSubmit={handleDeptSubmit} initialData={editDept} />
        <PolicyModal open={showPolicyModal} onClose={() => { setShowPolicyModal(false); setEditPolicy(null); }} onSubmit={handlePolicySubmit} initialData={editPolicy} />
        <SubsidyModal open={showSubsidyModal} onClose={() => { setShowSubsidyModal(false); setEditSubsidy(null); }} onSubmit={handleSubsidySubmit} initialData={editSubsidy} />
    </div>
    </Layout>
  );
};

export default GovernmentPortal; 