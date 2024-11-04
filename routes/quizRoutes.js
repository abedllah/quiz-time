const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// Route to create a quiz with questions and answers
router.post('/quiz', async (req, res) => {
    try {
        const { title, user_id, questions } = req.body;
        if (!user_id) {
            return res.status(400).json({ error: 'User ID is required.' });
        }

        // Generate a unique quiz code
        const quiz_code = uuidv4().slice(0, 6);

        // Insert the quiz into the `quizzes` table
        const quizResult = await connection.query(
            'INSERT INTO quizzes (title, quiz_code, created_by) VALUES (?, ?, ?)',
            [title, quiz_code, user_id]
        );
        const quiz_id = quizResult[0].insertId;

        // Insert questions and answers into their respective tables
        for (const question of questions) {
            const questionResult = await connection.query(
                'INSERT INTO questions (quiz_id, question_text) VALUES (?, ?)',
                [quiz_id, question.text]
            );
            const question_id = questionResult.insertId;

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