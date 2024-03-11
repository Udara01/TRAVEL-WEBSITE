const express = require('express');
const app = express();

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'traveling_guide_web'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + connection.threadId);
});

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/destinations', (req, res) => {
    connection.query('SELECT * FROM destinations', (err, results) => {
        if (err) {
            console.error('Error retrieving destinations: ' + err.stack);
            res.status(500).json({ error: 'Error retrieving destinations' });
            return;
        }
        res.json(results);
    });
});


app.use(express.urlencoded({ extended: true }));

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



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3306, () => {
    console.log('Server running on port 3306');
});

