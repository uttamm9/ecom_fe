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
function App() {
  
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/usersignup" element={<UserSignUp />}/>
      <Route path="/suppliersignup" element={<SupplierSignUp />}/>
      <Route path="/forgetpassword" element={<ForgatePassword/>}/>
      <Route path="/updatepassword" element={<UpdatePassword/>}/>
      <Route path="/userview" element={<UserView/>}/>
      <Route path="/supplierdashboard" element={<SupplierDashboard/>}/>
      <Route path='/addproduct' element={<AddProduct/>}/>
    </Routes>
   </BrowserRouter>

  )
}

export default App
