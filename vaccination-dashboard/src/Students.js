import React, { useState, useEffect } from "react";
import axios from "axios";
import M from "materialize-css";
import Navbar from "./components/Navbar";
import Sidenav from "./components/Sidenav";

const Students = () => {
  const [students, setStudents] = useState([]);
  
  const [modalData, setModalData] = useState({
    id: null,
    name: "",
    class: "",
    roll_number: "",
    vaccinated: false,
  });

  useEffect(() => {
    fetchStudents();
    const modalElements = document.querySelectorAll(".modal");
    M.Modal.init(modalElements);
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students", {
        headers: { Authorization: "Bearer dummy-token-123" },
      });
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      M.toast({ html: "Error loading students", classes: "red" });
    }
  };

  const handleOpenModal = (student = null) => {
    if (student) {
      setModalData({
        id: student.id || null,
        name: student.name || "",
        class: student.class || "",
        roll_number: student.roll_number || "",
        vaccine_date: student.vaccine_date || "",
        dose: student.dose || "",
        vaccine_name: student.vaccine_name || "",
        vaccinated: student.vaccinated || false,
      });
    } else {
      setModalData({
        id: null,
        name: "",
        class: "",
        roll_number: "",
        vaccine_date: "",
        dose: "",
        vaccine_name: "",
        vaccinated: false,
      });
    }
  
    const modal = M.Modal.getInstance(document.getElementById("student-modal"));
    modal.open();
  };
  

  const handleCSVImport = async (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;
      const rows = text.trim().split("\n");
      const header = rows[0].split(",").map((h) => h.trim().toLowerCase());

      if (
        !["name", "class", "roll_number", "vaccinated"].every((col) =>
          header.includes(col)
        )
      ) {
        M.toast({ html: "Invalid CSV format", classes: "red" });
        return;
      }

      const newStudents = rows.slice(1).map((row) => {
        const values = row.split(",").map((v) => v.trim());
        const student = {};
        header.forEach((key, index) => {
          student[key] =
            key === "vaccinated"
              ? values[index].toLowerCase() === "true"
              : values[index];
        });
        return student;
      });

      try {
        for (const student of newStudents) {
          await axios.post("http://localhost:5000/api/students", student, {
            headers: { Authorization: "Bearer dummy-token-123" },
          });
        }
        M.toast({ html: "Import successful", classes: "green" });
        fetchStudents();
      } catch (err) {
        console.error(err);
        M.toast({ html: "Error importing students", classes: "red" });
      }
    };

    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, ...payload } = modalData;

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/students/${id}`, payload, {
          headers: { Authorization: "Bearer dummy-token-123" },
        });
        M.toast({ html: "Student updated", classes: "green" });
      } else {
        await axios.post("http://localhost:5000/api/students", payload, {
          headers: { Authorization: "Bearer dummy-token-123" },
        });
        M.toast({ html: "Student added", classes: "green" });
      }

      fetchStudents();
      M.Modal.getInstance(document.getElementById("student-modal")).close();
    } catch (err) {
      console.error(err);
      M.toast({ html: "Error saving student", classes: "red" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: "Bearer dummy-token-123" },
      });
      M.toast({ html: "Student deleted", classes: "green" });
      fetchStudents();
    } catch (err) {
      console.error(err);
      M.toast({ html: "Error deleting student", classes: "red" });
    }
  };

  return (
    <div>
      <Navbar />
      <Sidenav />
      <div className="container">
        <h4 className="center-align">👩‍🎓 Students</h4>
        <div className="right-align">
          <input
            type="file"
            id="csvFile"
            accept=".csv"
            style={{ display: "none" }}
            onChange={(e) => handleCSVImport(e.target.files[0])}
          />
          <button className="btn green" onClick={() => handleOpenModal()}>
            Add Student
          </button>
          <button
            className="btn orange"
            onClick={() => document.getElementById("csvFile").click()}
            style={{ marginLeft: "10px" }}
          >
            Import CSV
          </button>
        </div>

        <table className="highlight responsive-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Roll Number</th>
              <th>Vaccinated</th>
              <th>Vaccine Name</th>
              <th>Vaccinated Date</th>
              <th>No Of Vaccines</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => (
              <tr key={stu.id}>
                <td>{stu.name}</td>
                <td>{stu.class}</td>
                <td>{stu.roll_number}</td>
                <td>{stu.vaccinated ? "✅" : "❌"}</td>
                <td>{stu.vaccination_name ? stu.vaccination_name : "❌"}</td>
                <td>{stu.vaccination_date ? stu.vaccination_date : "❌"}</td>
                <td>{stu.number_of_vaccines}</td>

                <td>
                  <button
                    className="btn-small blue"
                    onClick={() => handleOpenModal(stu)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    className="btn-small red"
                    onClick={() => handleDelete(stu.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div id="student-modal" className="modal">
        <div className="modal-content">
          <h5>{modalData.id ? "Edit Student" : "Add Student"}</h5>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="text"
                value={modalData.name}
                onChange={(e) =>
                  setModalData({ ...modalData, name: e.target.value })
                }
                required
              />
              <label className={modalData.name ? "active" : ""}>Name</label>
            </div>

            <div className="input-field">
              <input
                type="text"
                value={modalData.class}
                onChange={(e) =>
                  setModalData({ ...modalData, class: e.target.value })
                }
                required
              />
              <label className={modalData.class ? "active" : ""}>Class</label>
            </div>

            <div className="input-field">
              <input
                type="text"
                value={modalData.roll_number}
                onChange={(e) =>
                  setModalData({ ...modalData, roll_number: e.target.value })
                }
                required
              />
              <label className={modalData.roll_number ? "active" : ""}>
                Roll Number
              </label>
            </div>

            <p>
              <label>
                <input
                  type="checkbox"
                  checked={modalData.vaccinated}
                  onChange={(e) =>
                    setModalData({ ...modalData, vaccinated: e.target.checked })
                  }
                />
                <span>Vaccinated</span>
              </label>
            </p> 

            {modalData.vaccinated && (
              <>
                <div className="input-field">
                  <input
                    type="date"
                    value={modalData.vaccine_date || ""}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        vaccine_date: e.target.value,
                      })
                    }
                    required
                  />
                  <label className="active">Vaccine Date</label>
                </div>

                <div className="input-field">
                  <input
                    type="text"
                    value={modalData.dose || ""}
                    onChange={(e) =>
                      setModalData({ ...modalData, dose: e.target.value })
                    }
                    required
                  />
                  <label className={modalData.dose ? "active" : ""}>Dose</label>
                </div>

                <div className="input-field">
                  <input
                    type="text"
                    value={modalData.vaccine_name || ""}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        vaccine_name: e.target.value,
                      })
                    }
                    required
                  />
                  <label className={modalData.vaccine_name ? "active" : ""}>
                    Vaccine Name
                  </label>
                </div>
              </>
            )}

            <div className="modal-footer">
              <button type="submit" className="modal-close btn green">
                {modalData.id ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Students;
