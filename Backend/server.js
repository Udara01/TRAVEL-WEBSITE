import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3003;

// Middleware for parsing JSON
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE,
}).promise();

app.get('/table', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM tourist");
        console.log(rows); // Log the rows to the terminal
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await pool.query("SELECT * FROM tourist WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/tourist', async (req, res) => {
    console.log(req.body); // Log the request body
    const { id, Nmae, Email, Password, PhoneNo } = req.body;
    try {
        if (!id || !Nmae || !Email || !Password || !PhoneNo) {
            throw new Error("Missing required fields");
        }
        const result = await pool.query("INSERT INTO tourist (id, Nmae, Email, Password, PhoneNo) VALUES (?, ?, ?, ?, ?)", [id, Nmae, Email, Password, PhoneNo]);
        res.json({ message: "Tourist created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});//adding comment
