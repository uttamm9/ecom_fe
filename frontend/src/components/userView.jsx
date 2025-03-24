import React from 'react'
import { useNavigate } from 'react-router-dom'
const userView = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>User View</h1>
      <button onClick={()=>navigate('/updatepassword')}>Update Password</button>
    </div>
  )
}

export default userView