import React from 'react';
import { MdBlock, MdEmail } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';

const BlockedPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border-t-8 border-red-600">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <MdBlock className="text-red-600 text-4xl" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Suspended</h1>
        <p className="text-gray-500 mb-6">
          Your access has been restricted by the administrator.
        </p>

        {/* Reason Section */}
        <div className="bg-red-50 rounded-2xl p-5 mb-8 text-left border border-red-100">
          <h3 className="text-xs font-bold text-red-800 uppercase tracking-widest mb-2">Reason provided:</h3>
          <p className="text-red-700 italic">
            "{user?.block_reason || "Violation of platform terms and conditions."}"
          </p>
        </div>

        {/* Admin Contact Info */}
        <div className="space-y-4">
          <p className="text-sm text-gray-600">To appeal this decision, please contact the admin:</p>
          <a 
            href="mailto:admin@example.com" 
            className="flex items-center justify-center gap-2 w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition"
          >
            <MdEmail /> Contact Administrator
          </a>
          
          <button 
            onClick={logout}
            className="w-full py-3 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition"
          >
            Go Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockedPage;