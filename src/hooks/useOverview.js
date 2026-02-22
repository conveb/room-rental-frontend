import { useState, useEffect } from 'react';
import { getOverviewAPI } from '../services/allAPI'; // Adjust path

export const useOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const response = await getOverviewAPI();
      // Assuming your commonAPI returns the data in response.data
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  return { data, loading, error, refetch: fetchOverview };
};

// counts
// : 
// active_users
// : 
// 17
// completed_bookings
// : 
// 0
// successful_payments
// : 
// 0
// total_bookings
// : 
// 29
// total_landowners
// : 
// 3
// total_payments
// : 
// 0
// total_properties
// : 
// 6
// total_students
// : 
// 20
// total_users
// : 
// 24
// [[Prototype]]
// : 
// Object
// recent_bookings
// : 
// Array(5)
// 0
// : 
// created_at
// : 
// "2026-02-17T11:38:31.937610Z"
// end_date
// : 
// "2026-03-17"
// id
// : 
// "106bc169-d97e-45d6-806a-05de935752bd"
// payment_status
// : 
// "UNPAID"
// property_title
// : 
// "Testing purpose"
// reference_no
// : 
// "BK-2026-4F5E2E5A"
// start_date
// : 
// "2026-02-17"
// status
// : 
// "PENDING"
// total_rent_amount
// : 
// "1099.00"
// [[Prototype]]
// : 
// Object
// 1
// : 
// {id: '613a3f69-87ef-4020-bcc6-b4b27eff78ed', reference_no: 'BK-2026-7DA670CD', status: 'PENDING', payment_status: 'UNPAID', start_date: '2026-02-17', …}
// 2
// : 
// {id: 'c3f42c3f-6ee4-4df0-bf80-4c81e443714a', reference_no: 'BK-2026-00713C39', status: 'APPROVED', payment_status: 'UNPAID', start_date: '2026-02-16', …}
// 3
// : 
// {id: '0d825dc9-6d82-4ed4-b002-6f1f0f239312', reference_no: 'BK-2026-AF15C35C', status: 'PENDING', payment_status: 'UNPAID', start_date: '2027-10-20', …}
// 4
// : 
// {id: '6e7ce7b3-aa3f-46ba-9f87-b8de8247bf5c', reference_no: 'BK-2026-BBE16D0C', status: 'APPROVED', payment_status: 'UNPAID', start_date: '2026-02-27', …}
// length
// : 
// 5