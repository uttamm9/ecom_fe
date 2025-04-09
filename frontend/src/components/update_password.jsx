import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomNavbar from './navbar';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    axios.patch('http://localhost:3000/user/resetPassword', { newPassword, currentPassword },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
  })
      .then((response) => {
        console.log(response.data);
        alert('Password updated successfully');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        alert('Invalid current password');
      });
  };

  return (
    <div>
      <CustomNavbar islogin={true} />
      <h2 className="text-center my-4">Update Password</h2>
      <div className="d-flex justify-content-center">
        <div className="card p-4" style={{ width: '400px' }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Current Password:</label>
              <input
                type="password"
                className="form-control"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">New Password:</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm New Password:</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;