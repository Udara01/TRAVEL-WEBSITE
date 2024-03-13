import express from 'express';
import { getTable, CreateTourist, getTable } from './server.js';

const app = express();
app.use(express.json());

app.get('/traveling_guide_web', async (req, res) => {
    try {
        const Table2 = await getTable();
        res.send(Table2);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/traveling_guide_web", async (req, res) => {
    try {
        const { id, Name, Email, Password, PhoneNo } = req.body;
        const Table21 = await CreateTourist(id, Name, Email, Password, PhoneNo);
        res.status(201).send(Table21);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Server running on port 8080');
});
