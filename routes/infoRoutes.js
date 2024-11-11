const express = require('express')
const db = require('./../config/dbp')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Get user data and quizzes based on user_id
router.get('/user-data/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    
    try {
        // Fetch user data
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [user_id]);
        
        // Fetch quizzes created by the user
        const quizzes = await db.query('SELECT * FROM quizzes WHERE created_by = ?', [user_id]);

        const history = await db.query('SELECT q.title, a.score, a.completed_at FROM quizzes q INNER JOIN quiz_attempts a ON q.id = a.quiz_id WHERE a.user_id = ?'
            ,[user_id]
        )

        res.json({ user, quizzes, history });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.put('/user-data/:user_id', upload.single('user_pic'), async (req, res) => {
    const { user_id } = req.params;
    const { username, email, password } = req.body;
    let user_pic;

    if (req.file) {
        user_pic = `uploads/${req.file.filename}`;
    }

    try {
        let hashedPassword = password;

        if (password) {
            // If the user provided a new password, hash it
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }

                const query = `
            UPDATE users SET 
                username = ?, 
                email = ?, 
                password = ? 
                ${user_pic ? ', user_pic = ?' : ''} 
            WHERE id = ?
        `;
        
        const params = user_pic ? [username, email, hashedPassword, user_pic, user_id] : [username, email, hashedPassword, user_id];

        await db.execute(query, params);

        res.status(200).json({ message: 'Profile updated successfully!' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
});

module.exports = router;