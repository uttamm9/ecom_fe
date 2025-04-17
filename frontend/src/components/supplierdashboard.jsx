import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import SupplierNavbar from './SupplierNavbar'

const supplierdashboard = () => {
  const navigate = useNavigate()
  const [products, setProducts] = React.useState([])
  const [module, setModule] = useState(false);
  const [editproduct, setEditProduct] = useState(null)

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  const getproducts = async() => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get('http://localhost:3000/supplier/getproducts', {
      headers: {
        'authorization': `Bearer ${token}`
      }
      })
      console.log(response.data)
      setProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getproducts()
  }, [])

  const handledelete = async(productId) => {
    const token = localStorage.getItem('token')
    console.log(productId)
    try {
      const response = await axios.delete(`http://localhost:3000/supplier/deleteproduct/${productId}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
      alert(response.data.message)
      getproducts()
    } catch (error) {
      console.log(error)
    }
  }

  const editproductAPI = async() => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.patch(`http://localhost:3000/supplier/editproduct/${editproduct._id}`, editproduct, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      })
      console.log(response.data)
      alert(response.data.message)
      getproducts()
      setModule(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
   <SupplierNavbar/>

      <div style={{ padding: '20px',display: 'flex', justifyContent: 'center',marginTop:'70px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0', border: '1px solid #ddd', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Stock</th>
            <th>category</th>
            <th>Status</th>
            <th>Brand</th>
            <th>Rating</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody style={{ border: '1px solid #ddd' }}>
          {products.map((product, index) => {
            return (
              <tr key={index}>
              <td>{index + 1}</td>
              <td>{(product.productId.name).slice(0,20)}</td>
              <td>{product.productId.price}</td>
              <td>{product.quantity}</td>
              <td>{product.productId.category}</td>
              <td>{product.productId.isDeleted ? 'Inctive' : 'active'}</td>
              <td>{product.productId.brand}</td>
              <td>{product.rating?product.rating:'0'}</td>
              <td>
              <button onClick={()=>{setModule(true),setEditProduct(product)}} 
              style={{ backgroundColor: 'green', color: '#fff', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} >Edit</button>
              <button onClick={(e)=>handledelete(product._id)} 
              style={{ backgroundColor: 'red', color: '#fff', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '5px' }}>Delete</button>
              </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
      {module && <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' ,color:'#000' }}>
        <div style={{ width: '50%', padding: '20px', backgroundColor: '#fff', borderRadius: '5px' }}>
          <h3>Edit Product</h3>
          <form>
            <div style={{ marginBottom: '10px' }}>
              <label>Product Name: </label>
              <input type='text' value={editproduct.name} onChange={(e)=>setEditProduct({...editproduct,name:e.target.value})} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Product Price: </label>
              <input type='text' value={editproduct.price} onChange={(e)=>setEditProduct({...editproduct,price:e.target.value})}/>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Stock: </label>
              <input type='text' value={editproduct.quantity} onChange={(e)=>setEditProduct({...editproduct,quantity:e.target.value})}/>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Category: </label>
              <input type='text' value={editproduct.category} onChange={(e)=>setEditProduct({...editproduct,category:e.target.value})}/>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label>Brand: </label>
              <input type='text' value={editproduct.brand} onChange={(e)=>setEditProduct({...editproduct,brand:e.target.value})} />
            </div>

            <div style={{ marginBottom: '10px' }}>
            <label>description: </label>
            <input type='text' value={editproduct.description} onChange={(e)=>setEditProduct({...editproduct,description:e.target.value})}/>
            </div>
            
            <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={()=>{editproductAPI(editproduct._id)}}>Update</button>
            <button onClick={()=>setModule(false)} style={{ padding: '10px 20px', backgroundColor: 'red', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}>Cancel</button>
          </form>
        </div>
      </div>}
    </>
      
      
  )
}

export default supplierdashboard
