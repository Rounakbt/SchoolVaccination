import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Students from "./Students"; // ✅ Import Students page
import VaccinationDrives from "./VaccinationDrives"; // ✅ Import VaccinationDrives page
import VaccinatedStudents from "./VaccinatedStudents";

import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/vaccinationdrives" element={<VaccinationDrives />} /> 
          <Route path="/vaccinated" element={<VaccinatedStudents />} /> 

        </Routes>
      </div>
    </Router>
  );
}

export default App;
