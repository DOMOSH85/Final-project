import React, { useState } from 'react';

const DepartmentModal = ({ open, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState(initialData || { department: '', policies: 0, activeSubsidies: 0, contact: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">{initialData ? 'Edit' : 'Add'} Department</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Department Name</label>
            <input name="department" value={form.department} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Policies</label>
            <input name="policies" type="number" value={form.policies} onChange={handleChange} className="input" min="0" />
          </div>
          <div>
            <label className="block text-sm font-medium">Active Subsidies</label>
            <input name="activeSubsidies" type="number" value={form.activeSubsidies} onChange={handleChange} className="input" min="0" />
          </div>
          <div>
            <label className="block text-sm font-medium">Contact</label>
            <input name="contact" value={form.contact} onChange={handleChange} className="input" />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">{initialData ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentModal;
