import React, { useState, useEffect } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Sidenav from "./components/Sidenav";
const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    vaccinatedStudents: 0,
    upcomingDrives: []
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/metrics', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });
        setMetrics(response.data);
        // M.toast({ html: 'Metrics loaded!', classes: 'green' });
      } catch (error) {
        console.error('❌ Error fetching metrics:', error);
        M.toast({ html: 'Failed to load metrics', classes: 'red' });
      }
    };

    fetchMetrics();

    // Initialize sidenav
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   window.location.href = '/login';
  // };

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <Sidenav />

      {/* Content */}
      <div className="container">
        <h4 className="center-align">📊 Dashboard</h4>
        <div className="row">
          <div className="col s12 m4">
            <div
              className="card blue lighten-4 hoverable"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/students')}
            >
              <div className="card-content">
                <span className="card-title">Total Students</span>
                <h5>{metrics.totalStudents}</h5>
              </div>
            </div>
          </div>

          <div className="col s12 m4">
            <div
              className="card teal lighten-4 hoverable"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/vaccinated')}
            >
              <div className="card-content">
                <span className="card-title">Vaccinated Students</span>
                <h5>{metrics.vaccinatedStudents}</h5>
              </div>
            </div>
          </div>

          <div className="col s12 m4">
            <div
              className="card green lighten-4 hoverable"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/vaccinationdrives')}
            >
              <div className="card-content">
                <span className="card-title">Upcoming Drives</span>
                <ul>
                  {metrics.upcomingDrives.length === 0 ? (
                    <li>No upcoming drives</li>
                  ) : (
                    metrics.upcomingDrives.map((drive, index) => (
                      <li key={index}>
                        <strong>{drive.vaccine_name}</strong> -{' '}
                        {new Date(drive.drive_date).toLocaleDateString()}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
