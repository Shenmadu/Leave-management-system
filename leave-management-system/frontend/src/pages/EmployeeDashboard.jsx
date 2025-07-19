import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [form, setForm] = useState({ start_date: '', end_date: '', reason: '', type: '' });
  const [leaves, setLeaves] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };


  const fetchLeaves = async () => {
    const res = await axios.get('/leaves');
        setLeaves(res.data);
    };

    const applyLeave = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/leaves', form);
            fetchLeaves();

            // Clear the form after successful submit
            setForm({
            from: '',
            to: '',
            type: '',
            reason: '',
            });
        } catch (error) {
            console.error('Failed to apply leave:', error);
        }
    };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center">
            <h2>Employee Dashboard</h2>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>

      <form onSubmit={applyLeave} className="mt-4">
        <div className="row mb-3">
          <div className="col">
            <input className="form-control" placeholder="Start Date" type="date" onChange={e => setForm({ ...form, start_date: e.target.value })} required />
          </div>
          <div className="col">
            <input className="form-control" placeholder="End Date" type="date" onChange={e => setForm({ ...form, end_date: e.target.value })} required />
          </div>
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Reason" onChange={e => setForm({ ...form, reason: e.target.value })} required />
        </div>
        <div className="mb-3">
          <select className="form-select" onChange={e => setForm({ ...form, type: e.target.value })} required>
            <option value="">Select Leave Type</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
        <button className="btn btn-success">Apply Leave</button>
      </form>

      <hr className="mt-5" />

      <h4>Your Leaves</h4>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Type</th>
            <th>Reason</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr key={index}>
              <td>{leave.type}</td>
              <td>{leave.reason}</td>
              <td>{leave.start_date}</td>
              <td>{leave.end_date}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDashboard;
