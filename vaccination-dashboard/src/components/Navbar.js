// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper teal">
        <Link to="/" className="brand-logo center">
          Vaccination Dashboard
        </Link>
        <ul className="left hide-on-med-and-down">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/students">Students</Link>
          </li>
          <li>
            <Link to="/vaccinationdrives">vaccination drives</Link>
          </li>
        </ul>
        <ul className="right hide-on-med-and-down">
          <li>
            <a href="#!">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
