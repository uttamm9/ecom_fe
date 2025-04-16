import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SupplierNavbar from './SupplierNavbar'
const inventory = () => {
  const [products, setProducts] = React.useState([])
  const [inputValue, setInputValue] = useState('');

  const getproducts = async() => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get('http://localhost:3000/supplier/getinvertory', {
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

  const addstock = async (product_id,quantity) => {
    const token = localStorage.getItem('token')
    console.log(quantity);
    try {
      const response = await axios.patch('http://localhost:3000/supplier/addstock', {
        product_id,
        quantity
      }, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      })
      console.log(response.data)
      document.querySelectorAll('input[type="tel"]').forEach(input => input.value = '')
      if (response.data) {
        getproducts()
      }
    } catch (error) {
      console.log(error)
    }
  
  }
  return (
   <>
   <SupplierNavbar/>
    <div className='container' style={{ marginTop: '70px' }}>
      <h1 className='text-center'>Inventory</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{(product.productId._id).slice(0,10)}</td>
              <td>{product.productId.name}</td>
              <td>{product.productId.price}</td>
              <td>
                {product.quantity} 
                <input 
                  type="tel" 
                  id={`add-${product.productId._id}`} 
                  style={{width:'35px'}} 
                  placeholder='+..' 
                /> 
                <button 
                  onClick={() => addstock(product.productId._id, document.getElementById(`add-${product.productId._id}`).value)} 
                  style={{border:'none', color:"green"}}
                >
                  +
                </button>
              </td>
              <td>{product.productId.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className='text-center'>
      <button className='btn btn-primary' onClick={() => navigate('/addproduct')}>Add Product</button>
    </div>
   </>
  )
}

export default inventory