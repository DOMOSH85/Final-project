import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';

const ViewResource = () => {
  const { fetchResources } = useData();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getResources = async () => {
      try {
        const res = await fetchResources();
        setResources(res);
      } catch {
        setError('Failed to load resources');
      }
      setLoading(false);
    };
    getResources();
  }, [fetchResources]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">View Resource</h2>
      {loading ? (
        <div>Loading resources...</div>
      ) : error ? (
        <div className="text-red-600 text-sm">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(resource => (
            <div key={resource.id} className="card-hover p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{resource.title}</h4>
              <span className="text-xs font-medium text-gray-500">{resource.type}</span>
              <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
              {resource.url && (
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="btn-primary">Open Resource</a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewResource;
