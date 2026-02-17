// src/pages/admin/components/Users.jsx
import React, { useState } from 'react';
import SkeletonAdmin from '../../skeleton/skeletonAdmin';
import { getAvatarColor } from '../../../pages/admin/getAvatarColor';
import StudentDetailsModal from './StudentDetailsModal';
import { Characters } from '../../users/account/characterCollection';

const Users = ({
  users,
  loading,
  filteredUsers, // This is already filtered by search and role
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  blockUser,
  blocking
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reason, setReason] = useState("");
  const [statusTab, setStatusTab] = useState('active'); 

  const handleBlockUser = async () => {
    const success = await blockUser(selectedUser.id, {
      is_active: false,
      reason,
    });

    if (success) {
      setShowBlockModal(false);
      setReason("");
      setSelectedUser(null);
    }
  };

  // Filter users based on status tab
  const tabFilteredUsers = filteredUsers.filter(u => 
    statusTab === 'active' ? u.is_active : !u.is_active
  );

  // Get counts for tabs
  const activeCount = filteredUsers.filter(u => u.is_active).length;
  const blockedCount = filteredUsers.filter(u => !u.is_active).length;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Users</h2>

      {/* Search and Role Filter */}
      <div className="flex items-center gap-2 w-full text-sm">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="border p-2 rounded-md flex-1 min-w-0"
        />

        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="border p-2 rounded-md w-[100px] sm:w-auto"
        >
          <option value="ALL">All</option>
          <option value="STUDENT">Student</option>
          <option value="LAND_OWNER">Landowner</option>
        </select>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 border-b">
        <button
          onClick={() => setStatusTab('active')}
          className={`relative px-4 py-2 text-sm font-medium transition-colors ${
            statusTab === 'active'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>Active Users</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              statusTab === 'active' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {activeCount}
            </span>
          </div>
        </button>
        
        <button
          onClick={() => setStatusTab('blocked')}
          className={`relative px-4 py-2 text-sm font-medium transition-colors ${
            statusTab === 'blocked'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>Blocked Users</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              statusTab === 'blocked' 
                ? 'bg-red-100 text-red-700' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {blockedCount}
            </span>
          </div>
        </button>
      </div>

      {/* Users List */}
      {loading ? (
        <SkeletonAdmin />
      ) : tabFilteredUsers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No {statusTab} users found
        </div>
      ) : (
        tabFilteredUsers.map(u => {
          const character = Characters.find((c) => String(c.id) === String(u.avatar_id));

          return (
            <div
              key={u.id}
              className="relative border p-2 rounded-2xl flex gap-3 items-center cursor-pointer hover:bg-gray-50 transition"
              onClick={() => {
                setSelectedUser(u);
                setShowDetails(true);
              }}
            >
              {/* Avatar */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden text-lg font-semibold text-black ${
                  u.avatar ? "bg-gray-200" : getAvatarColor(u.full_name)
                }`}
              >
                {u.avatar_id && character ? (
                  <img
                    src={character.img}
                    alt={u.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  u.full_name?.charAt(0).toUpperCase()
                )}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <p className="font-medium">{u.full_name}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
                <p className="text-xs text-gray-400">{u.role}</p>
              </div>

              {/* Status Badge - Optional, you can remove if tabs are clear enough */}
              <span
                className={`px-3 py-1 text-xs rounded-2xl ${
                  u.is_active 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}
              >
                {u.is_active ? "Active" : "Blocked"}
              </span>
            </div>
          );
        })
      )}

      {/* Modals */}
      {showDetails && selectedUser && (
        <StudentDetailsModal
          id={selectedUser.id}
          avatar_id={selectedUser.avatar_id}
          role={selectedUser.role}
          onClose={() => {
            setShowDetails(false);
            setSelectedUser(null);
          }}
          onBlock={() => {
            setShowBlockModal(true);
          }}
        />
      )}

      {/* Block Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md space-y-4">
            <h3 className="text-lg font-semibold">Block User</h3>
            <p className="text-sm text-gray-500">{selectedUser?.full_name}</p>

            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Enter reason..."
              className="w-full border rounded-xl p-3 text-sm resize-none"
              rows={4}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowBlockModal(false);
                  setReason("");
                  setSelectedUser(null);
                }}
                className="px-4 py-2 rounded-xl border"
              >
                Cancel
              </button>

              <button
                disabled={blocking || !reason}
                onClick={handleBlockUser}
                className="px-4 py-2 rounded-xl bg-red-500 text-white disabled:opacity-50"
              >
                {blocking ? "Blocking..." : "Block"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;