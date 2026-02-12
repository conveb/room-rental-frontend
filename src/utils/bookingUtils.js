// src/pages/admin/utils/bookingUtils.js
export const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "paid":
    case "confirmed":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "failed":
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};