import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

const AddLand = () => {
  const { addLandRecord } = useData();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    area: '',
    crop: '',
    soilType: '',
    coordinates: ['', '']
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'coordinates0' || name === 'coordinates1') {
      const idx = name === 'coordinates0' ? 0 : 1;
      setForm({ ...form, coordinates: form.coordinates.map((c, i) => i === idx ? value : c) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const payload = {
      ...form,
      area: parseFloat(form.area),
      coordinates: form.coordinates.map(Number)
    };
    const result = await addLandRecord(payload);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/farmer-portal'), 1200);
    } else {
      setError(result.error || 'Failed to add land record');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Land Record</h2>
      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Area (acres)</label>
          <input name="area" type="number" min="0" step="0.01" value={form.area} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Crop</label>
          <input name="crop" value={form.crop} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Soil Type</label>
          <input name="soilType" value={form.soilType} onChange={handleChange} className="input w-full" required />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Latitude</label>
            <input name="coordinates0" value={form.coordinates[0]} onChange={handleChange} className="input w-full" required />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Longitude</label>
            <input name="coordinates1" value={form.coordinates[1]} onChange={handleChange} className="input w-full" required />
          </div>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">Land record added! Redirecting...</div>}
        <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Adding...' : 'Add Land'}</button>
      </form>
    </div>
  );
};

export default AddLand;
