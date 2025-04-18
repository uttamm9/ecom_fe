import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
  Legend
);

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


const AdminDashboard = () => {
  const [customers,setCustomers] = useState([])
  const [orders,setOrders]= useState([])
  const [products,setProducts]= useState([])
  const [suppliers, setSuppliers] = useState([])
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Cost',
        data: [12, 19, 10, 22, 15, 30, 10],
        backgroundColor: 'rgba(93, 112, 255, 0.8)',
        borderWidth: 2,
      },
      {
        label: 'Profit',
        data: [15, 20, 13, 25, 17, 35, 12],
        backgroundColor: 'rgba(115, 204, 255, 0.8)',
      },
    ],
  };

  const chartData1 = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Cost',
        data: [12, 19, 10, 22, 15, 30, 10],
        backgroundColor: 'rgba(93, 112, 255, 0.8)',
      
      },
      {
        label: 'Profit',
        data: [15, 20, 13, 25, 17, 35, 12],
        backgroundColor: 'rgba(115, 204, 255, 0.8)',
       
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  


const getAlldata = async()=>{
  try {
    const customer = await axios.get('http://localhost:3000/admin/allcustomers')
    console.log("customers>>",customer.data)
    setCustomers(customer.data)

    const order = await axios.get('http://localhost:3000/admin/allorders')
    console.log("all orders>>",order.data)
    setOrders(order.data)

    const product = await axios.get('http://localhost:3000/admin/allprodcuts')
    console.log("all products>>",product.data)
    setProducts(product.data)

    const supplirer = await axios.get('http://localhost:3000/admin/allsupllier')
    console.log("all suppliers>>",supplirer.data)
    setSuppliers(suppliers.data)
    
  } catch (error) {
    console.log("all orders error>>",error.response.data.message)
  }
}
  useEffect(()=>{
    getAlldata()
  },[])

  const totalrevanue = orders.reduce((acc, order) => {
    return acc + (order.productId.price * order.quantity);
  }, 0);
  
  console.log("reavlanue", totalrevanue)
  return (
    <Container fluid>
      <Row>
        <Col>
        </Col>
        <Col md={15} className="p-0">
          <AdminNavbar />

          <div></div>
          <div >
            <div style={{  width: '100%' , padding: '10px', borderRadius: '5px'}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '10px', borderRadius: '5px',marginTop:'0px'}}>
                <div>ecommerce</div>
                <div>🔃 📅 </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%',height:'450px',  padding: '10px', borderRadius: '5px'}}>
                <div style={{width:'49%',}}>

                <div style={{
  width: '100%',
  overflow: 'hidden',
  height: '150px',
 
  padding: '10px',
  borderRadius: '5px',
  position: 'relative'
}}>
  <div
    style={{
      display: 'flex',
      width: 'fit-content',
      animation: 'slide 20s linear infinite'
    }}
  >
    {/* Duplicate the content for seamless loop */}
    {[1, 2].map((_, repeatIndex) => (
      <React.Fragment key={repeatIndex}>
        <div style={{ height: '138px', width: '180px', marginRight: '20px',  background: '#ff4f7f', borderRadius: '5px', textAlign: 'center', padding: '10px' }}>
          <h5>new Product</h5>
          <h4>{products.length}</h4>
          <span>↑ 12% last month</span>
        </div>
        <div style={{ height: '138px', width: '180px', marginRight: '20px',  background: '#5F6AF5' ,borderRadius: '5px', textAlign: 'center', padding: '10px'  }}>
          <h5>wallet</h5>
            <h4>₹90K</h4>
            <span>↑ 5% last month</span>
        </div>
        <div style={{ height: '138px', width: '180px', marginRight: '20px',  background: '#2BBB93',borderRadius: '5px', textAlign: 'center', padding: '10px'  }}>
          <h5>total sales</h5>
          <h4>₹{totalrevanue}</h4>
          <span>↓ 3% last month</span>
        </div>
      </React.Fragment>
    ))}
  </div>

  <style>
    {`
      @keyframes slide {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
    `}
  </style>
</div>

                  <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns
    gap: '15px', // spacing between grid items
    width: '100%',
    padding: '10px',
    
    borderRadius: '5px'
  }}
>
  <div style={{ width: '100%', height: '125px',  textAlign:'left', padding:'10px',  boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
    <h5>customers</h5>
    <h4>{customers.length}</h4>
    <span>↑ 11% last month</span>
  </div>
  <div style={{ width: '100%', height: '125px',  textAlign:'left', padding:'10px',  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'  }}>
  <h5>orders</h5>
  <h4>{orders.length}</h4>
  <span>↓ 8% last month</span>
  </div>
  <div style={{ width: '100%', height: '125px',  textAlign:'left', padding:'10px',  boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
  <h5>revenue</h5>
    <h4>₹{totalrevanue}</h4>
    <span>↑ 6% last month</span>
  </div>
  <div style={{ width: '100%', height: '125px',  textAlign:'left', padding:'10px',  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'  }}>
  <h5>expenses</h5>
    <h4>₹{orders.length*40}</h4>
    <span>↑ 7% last month</span>
  </div>
</div>
                </div>

                <div style={{width:'49%',}}>

                  <div style={{display:'flex',justifyContent:'space-between',width:'100%',padding:'10px',borderRadius:'5px',paddingTop:'20px'}}>
                    <div><h5>costing and profit</h5></div>
                    <div>▢ ⁞</div>
                  </div>

                  <div>
                    <div style={{display:'flex',justifyContent:'space-between',width:'100%',padding:'10px',borderRadius:'5px',paddingTop:'20px'}}>
                      <h6>profit</h6>
                      <div><span style={{color:'green'}}>94%↑</span> <span>7K</span> ⁞</div>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',width:'100%',padding:'10px',borderRadius:'5px',paddingTop:'20px'}}>
                    <h6>costing</h6>
                    <div><span style={{color:'red'}}>54%↓</span> <span>5K</span> ⁞</div>
                    </div>
                  </div>
                  <div>
                    <Bar data={chartData1} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>

         

            <div className="bg-white p-4 rounded shadow-sm">
              <h5 className="mb-3">Costing & Profit</h5>
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <p className="text-muted mb-1">Profit</p>
                  <h6 className="text-success">94% ↑</h6>
                  <p>75k</p>
                </div>
                <div>
                  <p className="text-muted mb-1">Costing</p>
                  <h6 className="text-danger">96% ↓</h6>
                  <p>54k</p>
                </div>
              </div>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
