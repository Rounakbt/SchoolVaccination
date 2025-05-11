const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const pool = require('./config/db'); // ✅ Required for DB queries

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Use Auth Routes
app.use('/api/auth', authRoutes);

// Test DB Connection
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`✅ DB connection successful. Current time: ${result.rows[0].now}`);
  } catch (err) {
    console.error('❌ DB test error:', err);
    res.status(500).send('❌ DB connection failed');
  }
});



// Dashboard Metrics Route
app.get('/api/metrics', async (req, res) => {

  const token = req.headers['authorization'];

  // Simulate auth check for now
  if (!token || token !== 'Bearer dummy-token-123') {
    return res.status(401).send('❌ Unauthorized');
  }

  try {
    const totalStudentsResult = await pool.query('SELECT COUNT(*) FROM students');
    const vaccinatedStudentsResult = await pool.query('SELECT COUNT(*) FROM students WHERE vaccinated = true');
    const upcomingDrivesResult = await pool.query(`
      SELECT vaccine_name, drive_date 
      FROM vaccination_drives 
      WHERE drive_date > NOW() 
      ORDER BY drive_date ASC 
      LIMIT 5
    `);

    const metrics = {
      totalStudents: parseInt(totalStudentsResult.rows[0].count, 10),
      vaccinatedStudents: parseInt(vaccinatedStudentsResult.rows[0].count, 10),
      upcomingDrives: upcomingDrivesResult.rows
    };

    res.json(metrics);
  } catch (error) {
    console.error('❌ Error fetching metrics:', error);
    res.status(500).send('Server error');
  }
});

// Students List Route
app.get('/api/students', async (req, res) => {
  const token = req.headers['authorization'];

  // Simulated auth check
  if (!token || token !== 'Bearer dummy-token-123') {
    return res.status(401).send('❌ Unauthorized');
  }

  try {
    const result = await pool.query('SELECT * FROM students ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching students:', error);
    res.status(500).send('Server error while fetching students');
  }
});


// Add a new student
app.post('/api/students', async (req, res) => {
  const token = req.headers['authorization'];

  if (!token || token !== 'Bearer dummy-token-123') {
    return res.status(401).send('❌ Unauthorized');
  }

  const { name, class: studentClass, roll_number, vaccinated } = req.body;

  try {
    await pool.query(
      'INSERT INTO students (name, class, roll_number, vaccinated) VALUES ($1, $2, $3, $4)',
      [name, studentClass, roll_number, vaccinated]
    );
    res.status(201).send('✅ Student added');
  } catch (error) {
    console.error('❌ Error adding student:', error);
    res.status(500).send('Server error while adding student');
  }
});

// Update a student
app.put('/api/students/:id', async (req, res) => {
  const token = req.headers['authorization'];

  if (!token || token !== 'Bearer dummy-token-123') {
    return res.status(401).send('❌ Unauthorized');
  }

  const { id } = req.params;
  const { name, class: studentClass, roll_number, vaccinated } = req.body;

  try {
    await pool.query(
      'UPDATE students SET name = $1, class = $2, roll_number = $3, vaccinated = $4 ,vaccine_date = $5 ,dose = $6 ,vaccine_name = $7 WHERE id = $5',
      [name, studentClass, roll_number, vaccinated, id]
    );
    res.send('✅ Student updated');
  } catch (error) {
    console.error('❌ Error updating student:', error);
    res.status(500).send('Server error while updating student');
  }
});

// (Optional) Delete a student
app.delete('/api/students/:id', async (req, res) => {
  const token = req.headers['authorization'];

  if (!token || token !== 'Bearer dummy-token-123') {
    return res.status(401).send('❌ Unauthorized');
  }

  const { id } = req.params;

  try {
    await pool.query('DELETE FROM students WHERE id = $1', [id]);
    res.send('✅ Student deleted');
  } catch (error) {
    console.error('❌ Error deleting student:', error);
    res.status(500).send('Server error while deleting student');
  }
});


// Vaccination Drives Routes
// 1. Get all drives
app.get('/api/vaccination-drives', async (req, res) => {

  try {
    const result = await pool.query("SELECT id, vaccine_name, TO_CHAR(drive_date, 'YYYY-MM-DD') AS drive_date, doses_available, vaccination_destination FROM vaccination_drives ORDER BY drive_date DESC;");
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching vaccination drives:', error);
    res.status(500).send('Server error while fetching vaccination drives');
  }
});

// 2. Add a new vaccination drive
app.post('/api/vaccination-drives', async (req, res) => {
  const token = req.headers['authorization'];

  // // Simulated auth check
  // if (!token || token !== 'Bearer dummy-token-123') {
  //   return res.status(401).send('❌ Unauthorized');
  // }

  const { vaccine_name, drive_date, doses_available, vaccination_destination } = req.body;

  try {
    await pool.query(
      'INSERT INTO vaccination_drives (vaccine_name, drive_date, doses_available, vaccination_destination) VALUES ($1, $2, $3, $4)',
      [vaccine_name, drive_date, doses_available, vaccination_destination]
    );
    res.status(201).send('✅ Vaccination drive added');
  } catch (error) {
    console.error('❌ Error adding vaccination drive:', error);
    res.status(500).send('Server error while adding vaccination drive');
  }
});

// 3. Update a vaccination drive
app.put('/api/vaccination-drives/:id', async (req, res) => {
  const token = req.headers['authorization'];

  const { id } = req.params;
  const { vaccine_name, drive_date, doses_available, vaccination_destination } = req.body;

  try {
    await pool.query(
      'UPDATE vaccination_drives SET vaccine_name = $1, drive_date = $2, doses_available = $3, vaccination_destination = $4 WHERE id = $5',
      [vaccine_name, drive_date, doses_available, vaccination_destination, id]
    );
    res.send('✅ Vaccination drive updated');
  } catch (error) {
    console.error('❌ Error updating vaccination drive:', error);
    res.status(500).send('Server error while updating vaccination drive');
  }
});

// 4. Delete a vaccination drive
app.delete('/api/vaccination-drives/:id', async (req, res) => {
  const token = req.headers['authorization'];

  // // Simulated auth check
  // if (!token || token !== 'Bearer dummy-token-123') {
  //   return res.status(401).send('❌ Unauthorized');
  // }

  const { id } = req.params;

  try {
    await pool.query('DELETE FROM vaccination_drives WHERE id = $1', [id]);
    res.send('✅ Vaccination drive deleted');
  } catch (error) {
    console.error('❌ Error deleting vaccination drive:', error);
    res.status(500).send('Server error while deleting vaccination drive');
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
