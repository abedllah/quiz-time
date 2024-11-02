// authRoutes.js
const express = require('express');
const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('./../src/Component/SignUp.jsx');
});

router.get('/login', (req, res) => {
    res.render('./../src/Component/SignUp'); // Render the login view
});

module.exports = router;
