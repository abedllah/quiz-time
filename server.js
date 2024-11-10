const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = 5000;
const jwtSecret = process.env.JWT_SECRET;
const quizRoutes = require('./routes/quizRoutes');
const searchRoutes = require('./routes/searchRoutes');
const infoRoutes = require('./routes/infoRoutes');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Signup route
app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).send('Error hashing password.');

        // Insert the new user into the database
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hash], (error, results) => {
            if (error) return res.status(500).send('Error inserting user.');
            res.status(201).send('User created successfully.');
        });
    });
});

// Login route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    const query = 'SELECT * FROM users WHERE email = ?';
    const id =
    db.query(query, [email], (error, results) => {
        if (error || results.length === 0) return res.status(401).send('User not found.');

        const user = results[0];

        bcrypt.compare(password, user.password, (err, match) => {
            if (err || !match) return res.status(401).send('Invalid credentials.');

            const token = jwt.sign({ id: user.id }, 'jwtSecret', { expiresIn: '1h' });
            const id = user.id
            res.status(200).json({ token,id});
        });
    });
});

app.use('/api', quizRoutes);
app.use('/api', searchRoutes);
app.use('/api', infoRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
