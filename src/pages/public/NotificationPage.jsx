import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
/* ---------------- MOCK NOTIFICATIONS ---------------- */

const notificationsData = [
  {
    id: 1,
    title: "Booking Confirmed",
    message: "Your room booking has been confirmed successfully.",
    time: "2 mins ago",
    type: "success",
    unread: true,
  },
  {
    id: 2,
    title: "New Message",
    message: "You received a message from the property owner.",
    time: "1 hour ago",
    type: "message",
    unread: true,
  },
  {
    id: 3,
    title: "Payment Reminder",
    message: "Your payment is due in 2 days.",
    time: "Yesterday",
    type: "warning",
    unread: false,
  },
  {
    id: 4,
    title: "Account Updated",
    message: "Your profile information was updated successfully.",
    time: "2 days ago",
    type: "info",
    unread: false,
  },
];

/* ---------------- COMPONENT ---------------- */

const NotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(notificationsData);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, unread: false } : n
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const badgeColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "message":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-neutral-50 px-2 md:px-6 py-4 pt-28">
      <div className="max-w-3xl mx-auto space-y-4">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* BACK ARROW */}
            <button
              onClick={() => navigate(-1)}
              className="h-9 w-9 rounded-full flex items-center justify-center
                         hover:bg-neutral-200 transition text-2xl"
            >
            <FaArrowLeft/>
            </button>

            <h1 className="text-lg md:text-xl font-semibold">
              Notifications
            </h1>
          </div>

          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs md:text-sm text-red-500 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {/* EMPTY STATE */}
        {notifications.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <p className="text-sm text-neutral-500">
              You have no notifications 🎉
            </p>
          </div>
        )}

        {/* NOTIFICATION LIST */}
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => markAsRead(item.id)}
              className={`
                flex gap-4 p-4 rounded-2xl shadow-sm cursor-pointer
                transition hover:shadow-md
                ${item.unread ? "bg-white" : "bg-neutral-100"}
              `}
            >
              {/* UNREAD DOT */}
              <div className="pt-1">
                {item.unread && (
                  <span className="block h-2 w-2 rounded-full bg-black" />
                )}
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm md:text-base font-medium">
                    {item.title}
                  </h3>

                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${badgeColor(
                      item.type
                    )}`}
                  >
                    {item.type}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-neutral-600 mt-1">
                  {item.message}
                </p>

                <span className="text-[11px] text-neutral-400 mt-2 block">
                  {item.time}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default NotificationPage;
