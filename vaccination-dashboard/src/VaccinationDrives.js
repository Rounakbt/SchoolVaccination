import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import M from "materialize-css";
import Navbar from "./components/Navbar";
// import { useNavigate, Link } from 'react-router-dom';
import Sidenav from "./components/Sidenav";


const VaccinationDrives = () => {
  const [drives, setDrives] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showNoDrivesPopup, setShowNoDrivesPopup] = useState(false);

    // const navigate = useNavigate();
  
  const fetchDrives = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/vaccination-drives", {
        headers: { Authorization: "Bearer dummy-token-123" },
      });
      setDrives(res.data);
    } catch (err) {
      console.error(err);
      M.toast({ html: "Error loading drives", classes: "red" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrives();
  }, [fetchDrives]);

  const isExpired = (driveDate) => {
    const currentDate = new Date();
    const driveDateObj = new Date(driveDate);
    return driveDateObj < currentDate;
  };

  const upcomingDrives = drives.filter((drive) => !isExpired(drive.drive_date));
  const expiredDrives = drives.filter((drive) => isExpired(drive.drive_date));

  useEffect(() => {
    if (!isLoading && drives.length > 0) {
      if (upcomingDrives.length === 0) {
        setShowNoDrivesPopup(true);
      }
    }
  }, [isLoading, drives, upcomingDrives.length]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this drive?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/vaccination-drives/${id}`, {
        headers: { Authorization: "Bearer dummy-token-123" },
      });
      M.toast({ html: "Drive deleted", classes: "green" });
      fetchDrives();
    } catch (err) {
      console.error(err);
      M.toast({ html: "Error deleting drive", classes: "red" });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const driveData = {
      vaccine_name: formData.get("vaccine_name"),
      drive_date: formData.get("drive_date"),
      doses_available: formData.get("doses_available"),
      vaccination_destination: formData.get("vaccination_destination"),
    };

    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:5000/api/vaccination-drives/${modalData.id}`,
          driveData,
          { headers: { Authorization: "Bearer dummy-token-123" } }
        );
        M.toast({ html: "Drive updated", classes: "green" });
      } else {
        await axios.post(
          "http://localhost:5000/api/vaccination-drives",
          driveData,
          { headers: { Authorization: "Bearer dummy-token-123" } }
        );
        M.toast({ html: "Drive added", classes: "green" });
      }

      setModalData(null);
      const modal = M.Modal.getInstance(document.getElementById("addEditModal"));
      modal.close();
      fetchDrives();
    } catch (err) {
      console.error(err);
      M.toast({ html: "Error submitting form", classes: "red" });
    }
  };

  const openAddModal = () => {
    setIsEdit(false);
    setModalData(null);
    const modal = M.Modal.init(document.getElementById("addEditModal"));
    modal.open();
  };

  const openEditModal = (drive) => {
    setIsEdit(true);
    setModalData(drive);
    const modal = M.Modal.init(document.getElementById("addEditModal"));
    modal.open();
  };

  return (
    <div>
      <Navbar />
      <Sidenav />

      {/* Page Content with Blur when Popup is active */}
      <div className={showNoDrivesPopup ? "page-content blur" : "page-content"}>
        <h4>Vaccination Drives</h4>

        <div className="row">
          <div className="col s12 m4">
            <div className="card-panel teal">
              <span className="white-text">Total Drives: {drives.length}</span>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card-panel blue">
              <span className="white-text">Upcoming Drives: {upcomingDrives.length}</span>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card-panel red">
              <span className="white-text">Expired Drives: {expiredDrives.length}</span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m6 l4">
            <button className="btn green" onClick={openAddModal}>
              Add Vaccination Drive
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="center-align">
            <div className="preloader-wrapper active">
              <div className="spinner-layer spinner-blue">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            {upcomingDrives.map((drive) => (
              <div key={drive.id} className="col s12 m6 l4">
                <div className="card hoverable">
                  <div className="card-content">
                    <span className="card-title">
                      <i className="material-icons left">vaccines</i>
                      {drive.vaccine_name}
                    </span>
                    <p>Drive Date: {drive.drive_date}</p>
                    <p>Doses Available: {drive.doses_available}</p>
                    <p>Vaccination Destination: {drive.vaccination_destination}</p>
                  </div>
                  <div className="card-action">
                    <button className="btn-small blue" onClick={() => openEditModal(drive)}>
                      Edit
                    </button>
                    <button className="btn-small red" onClick={() => handleDelete(drive.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {expiredDrives.map((drive) => (
              <div key={drive.id} className="col s12 m6 l4">
                <div className="card hoverable grey lighten-2">
                  <div className="card-content">
                    <span className="card-title">
                      <i className="material-icons left">vaccines</i>
                      {drive.vaccine_name}
                      <span className="badge red white-text">Expired</span>
                    </span>
                    <p>Drive Date: {drive.drive_date}</p>
                    <p>Doses Available: {drive.doses_available}</p>
                    <p>Vaccination Destination: {drive.vaccination_destination}</p>
                  </div>
                  <div className="card-action">
                    <button className="btn-small blue" disabled>
                      Edit
                    </button>
                    <button className="btn-small red" disabled>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <div id="addEditModal" className="modal">
        <div className="modal-content">
          <h5>{isEdit ? "Edit Vaccination Drive" : "Add New Vaccination Drive"}</h5>
          <form onSubmit={handleFormSubmit}>
            <div className="input-field">
              <input
                type="text"
                name="vaccine_name"
                defaultValue={modalData ? modalData.vaccine_name : ""}
                required
              />
              <label htmlFor="vaccine_name" className="active">Vaccine Name</label>
            </div>
            <div className="input-field">
              <input
                type="date"
                name="drive_date"
                defaultValue={modalData ? modalData.drive_date : ""}
                required
              />
              <label htmlFor="drive_date" className="active">Drive Date</label>
            </div>
            <div className="input-field">
              <input
                type="number"
                name="doses_available"
                defaultValue={modalData ? modalData.doses_available : ""}
                required
              />
              <label htmlFor="doses_available" className="active">Doses Available</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                name="vaccination_destination"
                defaultValue={modalData ? modalData.vaccination_destination : ""}
                required
              />
              <label htmlFor="vaccination_destination" className="active">Vaccination Destination</label>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn green">
                {isEdit ? "Update" : "Add"}
              </button>
              <button type="button" className="modal-close btn red">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* No Upcoming Drives Popup */}
      {showNoDrivesPopup && (
        <div className="popup-overlay">
          <div className="popup-modal">
            <h4>No Upcoming Vaccination Drives</h4>
            <p>Currently, there are no upcoming vaccination drives scheduled. Please add a new drive.</p>
            <button className="btn green" onClick={() => setShowNoDrivesPopup(false)}>
              Okay
            </button>
          </div>
        </div>
      )}

      {/* Style */}
      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backdrop-filter: blur(5px);
          background: rgba(0, 0, 0, 0.4);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .popup-modal {
          background: white;
          padding: 30px;
          border-radius: 12px;
          max-width: 400px;
          width: 90%;
          text-align: center;
          box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
          animation: fadeInScale 0.3s ease;
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .blur {
          filter: blur(5px);
          pointer-events: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
};

export default VaccinationDrives;
