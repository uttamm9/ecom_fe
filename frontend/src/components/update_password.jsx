import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomNavbar from './navbar';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const color = localStorage.getItem('color');
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
    <div style={{ height: '100vh', width: '1250px' }}>
      <CustomNavbar islogin={true}/>
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default UpdatePassword;