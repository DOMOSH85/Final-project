import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplySubsidy = () => {
  const navigate = useNavigate();
  const [subsidies, setSubsidies] = useState([]);
  const [selectedSubsidy, setSelectedSubsidy] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchSubsidies = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/subsidies', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setSubsidies(Array.isArray(data) ? data : []);
      } catch {
        setError('Failed to load subsidies');
      }
    };
    fetchSubsidies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/subsidies/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          subsidyId: selectedSubsidy,
          applicationData: { note }
        })
      });
      if (!res.ok) throw new Error('Failed to apply for subsidy');
      setSuccess(true);
      setTimeout(() => navigate('/farmer-portal'), 1200);
    } catch {
      setError('Failed to apply for subsidy');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Apply for Subsidy</h2>
      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Select Subsidy</label>
          <select value={selectedSubsidy} onChange={e => setSelectedSubsidy(e.target.value)} className="input w-full" required>
            <option value="">Choose a subsidy</option>
            {subsidies.map(sub => (
              <option key={sub._id} value={sub._id}>{sub.name} (Deadline: {new Date(sub.applicationDeadline).toLocaleDateString()})</option>
            ))}
          </select>
        </div>
        {selectedSubsidy && (
          <div className="bg-gray-50 p-3 rounded border text-sm">
            <div className="font-semibold mb-1">{subsidies.find(s => s._id === selectedSubsidy)?.name}</div>
            <div>{subsidies.find(s => s._id === selectedSubsidy)?.description}</div>
            <div className="mt-1 text-green-700">Eligibility: {subsidies.find(s => s._id === selectedSubsidy)?.eligibility}</div>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Application Note (optional)</label>
          <textarea value={note} onChange={e => setNote(e.target.value)} className="input w-full" rows={3} placeholder="Add any relevant info..." />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">Subsidy application submitted! Redirecting...</div>}
        <button type="submit" className="btn-primary w-full" disabled={loading || !selectedSubsidy}>{loading ? 'Applying...' : 'Apply'}</button>
      </form>
    </div>
  );
};

export default ApplySubsidy;
