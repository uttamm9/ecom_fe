import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import UserSignUp from './components/userSignUp'
import SupplierSignUp from './components/supplierSignUp'
import Login from './components/login'
import ForgatePassword from './components/forgate_password'
import UpdatePassword from './components/update_password'
import UserView from './components/userView'
import SupplierDashboard from './components/supplierdashboard'
import AddProduct from './components/addproduct'
import Single from './components/singleProductPage'
import AddToCart from './components/addTocart'
import Wishlist from './components/wishlist'
import Address from './components/address'
import Checkout from './components/checkout'
import UserOrders from './components/userorders'
import SupplierOrders from './components/supplierOrders'
import Invetory from './components/inventory'
import AdminDashboard from './components/AdminDashboard'
function App() {
  
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserView/>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/usersignup" element={<UserSignUp />}/>
      <Route path="/suppliersignup" element={<SupplierSignUp />}/>
      <Route path="/forgetpassword" element={<ForgatePassword/>}/>
      <Route path="/updatepassword" element={<UpdatePassword/>}/>
      <Route path="/supplierdashboard" element={<SupplierDashboard/>}/>
      <Route path='/addproduct' element={<AddProduct/>}/>
      <Route path='/showSingleProdut/:id' element={<Single/>}/>
      <Route path='/cart' element={<AddToCart/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/address' element={<Address/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/userorders' element={<UserOrders/>}/>
      <Route path="/supplierorder" element={< SupplierOrders/>}/>
      <Route path='/inventory' element={<Invetory/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
   </BrowserRouter>

  )
}

export default App
