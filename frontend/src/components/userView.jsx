import React, { useEffect , useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from './navbar'
const userView = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const getAllProduts = async() => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get('http://localhost:3000/user/getAllproduts', {
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
  useEffect(() => {
    getAllProduts()
  }, [])
  return (
    <>
      <Navbar islogin= {true} />
      <button onClick={()=>navigate('/updatepassword')}>Update Password</button>
      {products.map((product) => (

        <div style={{border:'1px solid black',width:'120px'}} key={product._id}>
        <div style={{height:'150px',width:'120px',overflow:'hidden'}} >
        <Link to={`/showSingleProdut/${product._id}`} key={product._id}>
          <img src={product.imageUrl[0]} alt="" style={{width:'100%'}} />
          </Link>
        </div>
        <h2>{product.product_id.name}</h2>
        <h3>{product.product_id.price}</h3>
        <h4>{product.product_id.brand}</h4>
      </div>
   
      ))}
     
    </>
  )
}

export default userView