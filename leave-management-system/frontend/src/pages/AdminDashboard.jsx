import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const AdminDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchLeaves = async () => {
    try {
      const res = await axios.get('/admin/leaves');
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
      setError('Unauthorized or token missing');
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch users');
    }
  };

  const handleApprove = async (id, status) => {
    try {
      await axios.put(`/admin/leaves/${id}/${status}`);
      fetchLeaves();
    } catch (err) {
      console.error(err);
      setError('Failed to update leave status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    fetchLeaves();
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Leave Requests */}
      <h4 className="mt-4">Leave Requests</h4>
      <table className="table table-striped">
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

      {/* User Overview */}
      <h4 className="mt-5">User Overview</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>            
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="4" className="text-center">No users found</td></tr>
          ) : (
            users.map((user, idx) => (
              <tr key={user.id}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role?.name || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
