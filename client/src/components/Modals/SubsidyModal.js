import React, { useState } from 'react';

const SubsidyModal = ({ open, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState(initialData || { name: '', amount: 0, deadline: '', description: '' });

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
        <h2 className="text-lg font-bold mb-4">{initialData ? 'Edit' : 'Add'} Subsidy</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Subsidy Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input name="amount" type="number" value={form.amount} onChange={handleChange} className="input" min="0" />
          </div>
          <div>
            <label className="block text-sm font-medium">Deadline</label>
            <input name="deadline" type="date" value={form.deadline} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="input" />
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

export default SubsidyModal;
