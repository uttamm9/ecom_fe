import React from 'react'
import { useNavigate } from 'react-router-dom'
const supplierdashboard = () => {
  const navigate = useNavigate()
  return (
    <>
    <div style={{ position: 'sticky', top: '0', zIndex: '1000', width: '100%', height: '60px' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f8f9fa', marginTop: '0px', position: 'fixed', left: '2px', top: '0', width: '100%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', background: '#f654' }}>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <h3>Welcome {localStorage.getItem('name')}</h3>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h3>Amazon</h3>
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <button style={{ backgroundColor: 'red', marginRight: '15px' }}>Logout</button>
          </div>
        </nav>
      </div>
      <div>
        <button onClick={()=>navigate('/addproduct')} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add products +</button>
        <hr />
      </div>
      <div >All products</div>
      <div style={{ padding: '20px',display: 'flex', justifyContent: 'center' }}>
      <table>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Stock</th>
            <th>category</th>
            <th>Active</th>
            <th>Brand</th>
            <th>Rating</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
      </div>
    </>
      
      
  )
}

export default supplierdashboard
