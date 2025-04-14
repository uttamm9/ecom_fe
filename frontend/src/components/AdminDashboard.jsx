import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


const AdminDashboard = () => {
  const chartData = {
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

  return (
    <Container fluid>
      <Row>
        <Col >
          
        </Col>
        <Col md={15} className="p-0">
          <AdminNavbar />

          <div className="p-4">
            <h1 className="mb-4">eCommerce Dashboard</h1>

            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <div className="bg-danger text-white p-3 rounded">
                  <p>New Product</p>
                  <h4>65.51k</h4>
                  <small>↓ 0.4% Last Month</small>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="bg-success text-white p-3 rounded">
                  <p>Total Sales</p>
                  <h4>98.65M</h4>
                  <small>↑ 25% Last Month</small>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="bg-light p-3 rounded">
                  <p>Customers</p>
                  <h4>698k</h4>
                  <small className="text-success">↑ 25% Last Month</small>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="bg-light p-3 rounded">
                  <p>Order</p>
                  <h4>10.63k</h4>
                  <small className="text-danger">↓ 0.5% Last Month</small>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="bg-light p-3 rounded">
                  <p>Revenue</p>
                  <h4>$85420</h4>
                  <small className="text-danger">↓ 2.1% Last Month</small>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="bg-light p-3 rounded">
                  <p>Expenses</p>
                  <h4>$56874</h4>
                  <small className="text-success">↑ 9% Last Month</small>
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
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
