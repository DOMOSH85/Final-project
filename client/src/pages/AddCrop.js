import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddCrop = () => {
  const { addCrop } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    area: '',
    cropType: '',
    plantingDate: '',
    expectedHarvest: '',
    notes: ''
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
    const result = await addCrop(user.id, form);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/farmer-portal'), 1200);
    } else {
      setError(result.error || 'Failed to add crop');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Crop</h2>
      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Field Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Crop Type</label>
          <select name="cropType" value={form.cropType} onChange={handleChange} className="input w-full" required>
            <option value="">Select crop type</option>
            <option value="Wheat">Wheat</option>
            <option value="Corn">Corn</option>
            <option value="Soybeans">Soybeans</option>
            <option value="Rice">Rice</option>
            <option value="Cotton">Cotton</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Area (acres)</label>
          <input name="area" type="number" min="0" step="0.01" value={form.area} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Planting Date</label>
          <input name="plantingDate" type="date" value={form.plantingDate} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Harvest Date</label>
          <input name="expectedHarvest" type="date" value={form.expectedHarvest} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} className="input w-full" rows={3} />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">Crop added! Redirecting...</div>}
        <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Adding...' : 'Add Crop'}</button>
      </form>
    </div>
  );
};

export default AddCrop;
