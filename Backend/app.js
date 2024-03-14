const express = require('express');//
const app = express();//
const path = require('path')//
const cors = require('cors');
const DbService = require('./database');

const dbService = new DbService();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3002;
app.listen(3002, () => {
    console.log('Server running on port 3002');
});

// Read
app.get('/getAll', async (request, response) => {
    try {
        const data = await dbService.getAllData();
        response.json({ data: data });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Internal server error' });
    }
});

// Create
app.post('/addData', async (request, response) => {
    const { signup_username, fullName, email, signUp_password} = request.body;

    try {
        await dbService.insertData(signup_username, fullName, email, signUp_password);
        response.status(201).json({ message: 'Registration successfully' });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Registration Failed' });
    }
});

/*
//////////////
// Login
app.get('/login', async (req, res) => {
    const { username, password } = req.query;

    try {
        const user = await dbService.getUserByUsername(username, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // You can set a session or token to manage the user's authentication
        req.session.userId = user.id;

        res.json({ message: 'Login successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});*/


//new loging
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login1.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;

    dbService.query(query)
        .then(result => {
            if (result.length > 0) {
                // User is authenticated
               // res.send('Login successful');
               res.json({ message: 'Login successful' });
            } else {
                // Authentication failed
                res.send('Invalid username or password');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

app.get('/logout', (req, res) => {
    // Handle logout logic here
    res.send('Logged out');
});


