import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useNotifications } from "../../hooks/useNotifications";

const NotificationPage = () => {
  const navigate = useNavigate();
  const { notifications, setNotifications, loading } = useNotifications();

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const clearAll = () => setNotifications([]);
  console.log(notifications)

  if (loading) return <div className="p-10 text-center">
    <img src="https://static.vecteezy.com/system/resources/previews/023/570/826/non_2x/still-empty-no-notification-yet-concept-illustration-line-icon-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-vector.jpg" alt="Loading..." className="mx-auto" />
  </div>;

  return (
    <div className="min-h-screen container mx-auto ">
      <div className="w-full max-w-none px-4 md:px-10 py-6">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 rounded-full transition">
              <FaArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">Notifications</h1>
          </div>
          {notifications.length > 0 && (
            <button onClick={clearAll} className="text-sm font-semibold text-red-500 hover:text-red-700">
              Clear All
            </button>
          )}
        </div>

        {/* List Section - Full Width */}
        <div className="space-y-2">
          {notifications.length === 0 ? (
            <div className="bg-white p-10 md:p-20 text-center rounded-xl shadow-sm border border-gray-100">
              <img src="https://static.vecteezy.com/system/resources/previews/023/570/826/non_2x/still-empty-no-notification-yet-concept-illustration-line-icon-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-vector.jpg" alt="Loading..." className="mx-auto w-52 md:w-96" />
              <p className="text-gray-500 mt-4">No notifications to show</p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => markAsRead(item.id)}
                className={`flex items-start gap-4 p-5 transition-all cursor-pointer border-b ${
                  item.unread ? "bg-white border-l-4 border-l-blue-500 shadow-sm" : "bg-transparent opacity-70"
                }`}
              >
                <div className="mt-1">
                  <div className={`h-2.5 w-2.5 rounded-full ${item.unread ? "bg-blue-500" : "bg-transparent"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className={`text-base ${item.unread ? "font-bold text-gray-900" : "font-medium text-gray-600"}`}>
                      {item.title}
                    </h3>
                    <span className="text-xs text-gray-400 uppercase">{item.time || 'recent'}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;