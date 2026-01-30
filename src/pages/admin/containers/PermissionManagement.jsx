import React, { useEffect, useState } from 'react';
import { useGroups } from '../../../hooks/admin/constants/useGroups';

const PermissionManagement = () => {
  const { 
    groups, 
    groupDetails, 
    loading, 
    fetchAllGroups, 
    fetchGroupDetails, 
    removeGroup,
    setGroupDetails 
  } = useGroups();

  useEffect(() => {
    fetchAllGroups();
  }, []);

  const handleViewDetails = (id) => {
    fetchGroupDetails(id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">User Groups Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* List Section */}
        <section className="bg-white rounded-xl shadow border p-4">
          <h2 className="text-lg font-semibold mb-4">All Groups</h2>
          {loading && !groups.length ? <p>Loading...</p> : (
            <ul className="space-y-3">
              {groups.map((group) => (
                <li key={group.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">{group.name}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleViewDetails(group.id)}
                      className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-200"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => removeGroup(group.id)}
                      className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Details Section (Triggered by getGroupDetailsApi) */}
        <section className="bg-gray-50 rounded-xl border border-dashed border-gray-300 p-4 min-h-[200px]">
          <h2 className="text-lg font-semibold mb-4">Group Insights</h2>
          
          {groupDetails ? (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Group Name</p>
                  <p className="text-xl font-bold text-black">{groupDetails.name}</p>
                </div>
                <button onClick={() => setGroupDetails(null)} className="text-gray-400 hover:text-black">✕</button>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Permissions Assigned ({groupDetails.permissions?.length || 0})</p>
                <div className="flex flex-wrap gap-2">
                  {groupDetails.permissions?.length > 0 ? (
                    groupDetails.permissions.map((p, idx) => (
                      <span key={idx} className="bg-white border text-[10px] px-2 py-1 rounded shadow-sm">
                        {p}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs italic text-gray-400">No specific permissions assigned.</p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-[10px] text-gray-400">System ID: {groupDetails.id}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p className="text-sm">Click "View" to see details</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PermissionManagement;