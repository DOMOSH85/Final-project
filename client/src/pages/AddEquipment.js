import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddEquipment = () => {
  const { addEquipment } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    type: '',
    purchaseDate: '',
    maintenanceDate: '',
    status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    if (!user || !user.id) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }
    const result = await addEquipment(user.id, form);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/farmer-portal'), 1200);
    } else {
      setError(result.error || 'Failed to add equipment');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Equipment</h2>
      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Equipment Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Equipment Type</label>
          <select name="type" value={form.type} onChange={handleChange} className="input w-full" required>
            <option value="">Select equipment type</option>
            <option value="Tractor">Tractor</option>
            <option value="Harvester">Harvester</option>
            <option value="Irrigation">Irrigation System</option>
            <option value="Seeder">Seeder</option>
            <option value="Sprayer">Sprayer</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Purchase Date</label>
          <input name="purchaseDate" type="date" value={form.purchaseDate} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Next Maintenance Date</label>
          <input name="maintenanceDate" type="date" value={form.maintenanceDate} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="input w-full" required>
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="retired">Retired</option>
          </select>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">Equipment added! Redirecting...</div>}
        <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Adding...' : 'Add Equipment'}</button>
      </form>
    </div>
  );
};

export default AddEquipment;
