const express = require("express");
const router = express.Router();
const connection = require("../config/dbp");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Directory where images are saved
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname)); // Unique file name
    }
});
const upload = multer({ storage: storage });

// Create a quiz route with image upload
router.post('/quiz', upload.single('image'), async (req, res) => {
    try {
        const { title, description, is_public, user_id, questions } = req.body;

        if (!user_id) {
            return res.status(400).json({ error: 'User ID is required.' });
        }

        // Convert `is_public` to integer (1 for true, 0 for false)
        const isPublicInt = is_public === 'true' ? 1 : 0;

        // Generate a unique quiz code
        const quiz_code = uuidv4().slice(0, 6);
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        // Insert the quiz into the `quizzes` table
        const quizResult = await connection.query(
            'INSERT INTO quizzes (title, description, quiz_code, created_by, is_public, quiz_pic) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, quiz_code, user_id, isPublicInt, imagePath]
        );
        const quiz_id = quizResult[0].insertId;

        // Insert questions and answers into their respective tables
        for (const question of JSON.parse(questions)) {
            const questionResult = await connection.query(
                'INSERT INTO questions (quiz_id, question_text) VALUES (?, ?)',
                [quiz_id, question.text]
            );
            const question_id = questionResult[0].insertId;

            for (const answer of question.answers) {
                await connection.query(
                    'INSERT INTO answers (question_id, answer_text, is_correct) VALUES (?, ?, ?)',
                    [question_id, answer.text, answer.is_correct]
                );
            }
        }

        res.status(201).json({ message: 'Quiz created successfully!', quiz_code });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the quiz.' });
    }
});

module.exports = router;