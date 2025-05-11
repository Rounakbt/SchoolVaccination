// src/components/Sidenav.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidenav = () => {
  return (
    <div className="sidenav">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/vaccinationdrives">vaccination drives</Link></li>

      </ul>
    </div>
  );
};

export default Sidenav;
