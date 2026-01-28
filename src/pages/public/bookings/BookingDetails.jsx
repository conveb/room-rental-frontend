// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useBookings } from '../../../hooks/bookings/useBookings';

// const BookingDetails = () => {
//   const { id } = useParams();
//   const { 
//    requestBooking, bookingLoading
//   } = useBookings();

//   // 1. Using createBookingApi (Used if we are on a "New Booking" mode)
//   const handleCreate = async () => {
//     const newBookingData = { property_id: "123", dates: "2026-02-01" };
//     await createBooking("temp-id", newBookingData);
//   };

//   // Load details on mount
//   useEffect(() => {
//     if (id) fetchDetails(id);
//   }, [id]);

//   return (
//     <div className="p-6 max-w-2xl mx-auto space-y-6">
      
//       {/* 2. Using getBookingDetailsApi */}
//       {!id ? (
//         <div className="p-10 border-2 border-dashed rounded-3xl text-center">
//           <button onClick={handleCreate} className="bg-black text-white px-8 py-3 rounded-xl font-bold">
//             Test CreateBookingApi
//           </button>
//         </div>
//       ) : (
//         <div className="bg-white rounded-3xl p-8 shadow-sm border">
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-2xl font-bold">Booking Details</h1>
            
//             {/* 3. Using ViewBookingStatusApi */}
//             <button 
//               onClick={() => updateStatus(id)}
//               className="p-2 hover:bg-gray-100 rounded-full transition"
//               title="Refresh Status Only"
//             >
//               🔄
//             </button>
//           </div>

//           <div className="space-y-4 mb-10">
//             <div className="flex justify-between border-b pb-2">
//               <span className="text-gray-500">Status</span>
//               <span className="font-bold text-blue-600">{bookingData?.status || 'Active'}</span>
//             </div>
//             <div className="flex justify-between border-b pb-2">
//               <span className="text-gray-500">Booking ID</span>
//               <span className="font-mono text-xs">{id}</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             {/* 4. Using CompleteBookingApi */}
//             <button
//               onClick={() => completeBooking(id)}
//               className="bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-200"
//             >
//               Complete
//             </button>

//             {/* 5. Using CancelBookingApi */}
//             <button
//               onClick={() => cancelBooking(id)}
//               className="bg-red-50 text-red-600 py-4 rounded-2xl font-bold border border-red-100"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingDetails;