import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const AdminDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');

  const fetchLeaves = async () => {
    try {
      const res = await axios.get('/admin/leaves');
      console.log("res", res);
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
      setError("Unauthorized or token missing");
    }
  };

  const handleApprove = async (id, status) => {
    try {
      const url = `/admin/leaves/${id}/${status}`;
      await axios.put(url);
      fetchLeaves();
    } catch (err) {
      console.error(err);
      setError("Failed to update leave status");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Reason</th>
            <th>Dates</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length === 0 ? (
            <tr><td colSpan="6" className="text-center">No leave requests found</td></tr>
          ) : (
            leaves.map((leave, idx) => (
              <tr key={idx}>
                <td>{leave.user?.name}</td>
                <td>{leave.type}</td>
                <td>{leave.reason}</td>
                <td>{leave.start_date} - {leave.end_date}</td>
                <td>{leave.status}</td>
                <td>
                  {leave.status === 'pending' && (
                    <>
                      <button className="btn btn-sm btn-success me-2" onClick={() => handleApprove(leave.id, 'approve')}>Approve</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleApprove(leave.id, 'reject')}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
