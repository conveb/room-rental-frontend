import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io"; // Assuming you use react-icons
import { useGroups } from '../../../hooks/admin/constants/useGroups';

const GroupsManagement = () => {
  const { 
    groups, 
    groupDetails, 
    loading, 
    fetchAllGroups, 
    fetchGroupDetails, 
    addGroup,
    removeGroup,
    setGroupDetails 
  } = useGroups();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  useEffect(() => {
    fetchAllGroups();
  }, []);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const result = await addGroup({ name: newGroupName });
    if (result.success) {
      setNewGroupName("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Groups</h1>
          <p className="text-xs md:text-sm text-gray-500">Manage system roles and permissions</p>
        </div>
        
        {/* ADD GROUP BUTTON */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-black text-xs md:text-md text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-all shadow-sm"
        >
          <IoMdAdd size={20} />
          Create New Group
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List Section (Left) */}
        <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Group Name</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {groups.map((group) => (
                <tr key={group.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-gray-400">#{group.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-700">{group.name}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button 
                      onClick={() => fetchGroupDetails(group.id)}
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => removeGroup(group.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && groups.length === 0 && <p className="p-10 text-center text-gray-400">Loading groups...</p>}
        </section>

        {/* Details Panel (Right) */}
        <section className="bg-neutral-50 rounded-2xl border border-dashed border-neutral-300 p-6">
          <h2 className="text-md font-bold text-gray-800 mb-4 underline decoration-blue-500 underline-offset-4">Group Inspection</h2>
          {groupDetails ? (
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase text-gray-400 font-bold">Role Identity</label>
                <p className="text-xl font-bold text-blue-600">{groupDetails.name}</p>
              </div>
              <div>
                <label className="text-[10px] uppercase text-gray-400 font-bold">Permissions</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {groupDetails.permissions?.length > 0 ? (
                    groupDetails.permissions.map((p, i) => (
                      <span key={i} className="bg-white px-2 py-1 rounded border text-xs">{p}</span>
                    ))
                  ) : (
                    <p className="text-xs italic text-gray-400">No specific permissions found.</p>
                  )}
                </div>
              </div>
              <button 
                onClick={() => setGroupDetails(null)}
                className="w-full mt-4 text-xs py-2 border rounded-lg hover:bg-white transition"
              >
                Close Details
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic text-center py-20">Select a group to view deeper insights</p>
          )}
        </section>
      </div>

      {/* CREATE GROUP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-4">Create New Group</h2>
            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                <input 
                  autoFocus
                  type="text" 
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value.toUpperCase())}
                  placeholder="e.g., MODERATOR"
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading || !newGroupName.trim()}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-xl disabled:bg-gray-400 transition-colors"
                >
                  {loading ? "Creating..." : "Confirm Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupsManagement;