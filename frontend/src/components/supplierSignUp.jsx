import React, { useState } from 'react';

const SupplierSignUp = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessAddress: '',
    businessEmail: '',
    contactNumber: '',
    gstNo: '',
    category: '',
    aadharCardNo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Business Name:</label>
        <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} required />
      </div>
      <div>
        <label>Business Address:</label>
        <input type="text" name="businessAddress" value={formData.businessAddress} onChange={handleChange} required />
      </div>
      <div>
        <label>Business Email:</label>
        <input type="email" name="businessEmail" value={formData.businessEmail} onChange={handleChange} required />
      </div>
      <div>
        <label>Contact Number:</label>
        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
      </div>
      <div>
        <label>GST No.:</label>
        <input type="text" name="gstNo" value={formData.gstNo} onChange={handleChange} required />
      </div>
      <div>
        <label>Category:</label>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Books & Stationery">Books & Stationery</option>
          <option value="Beauty & Personal Care">Beauty & Personal Care</option>
          <option value="Toys & Games">Toys & Games</option>
          <option value="Sports & Outdoors">Sports & Outdoors</option>
          <option value="Grocery & Gourmet Foods">Grocery & Gourmet Foods</option>
          <option value="Health & Wellness">Health & Wellness</option>
        </select>
      </div>
      <div>
        <label>Aadhar Card No.:</label>
        <input type="text" name="aadharCardNo" value={formData.aadharCardNo} onChange={handleChange} required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SupplierSignUp;