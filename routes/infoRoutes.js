const express = require('express')
const db = require('./../config/dbp')
const router = express.Router();

// Get user data and quizzes based on user_id
router.get('/user-data/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    
    try {
        // Fetch user data
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [user_id]);
        
        // Fetch quizzes created by the user
        const quizzes = await db.query('SELECT * FROM quizzes WHERE created_by = ?', [user_id]);

        res.json({ user, quizzes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;