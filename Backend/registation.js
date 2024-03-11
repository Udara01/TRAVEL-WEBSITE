const express = require('express');
const mysql = require('mysql');
const app = express();

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'traveling_guide_web'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle POST requests to the submit route
app.post('/touristregistration', (req, res) => {
    // Extract the data from the request body
    const { name, email, password, phone } = req.body;
    // Insert the data into the database
    const sql = 'INSERT INTO `tourist registration` (Name, Email, Password, PhoneNo) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, password, phone], (err, result) => {
      if (err) {
        res.status(500).send('Failed to register user');
        throw err;
      }
      res.status(200).send('User registered successfully');
    });
  });
  

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
