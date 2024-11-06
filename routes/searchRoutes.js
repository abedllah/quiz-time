const express = require('express')
const db = require('./../config/db')
const router = express.Router();

// Search for quizzes by title
router.get('/quiz/search', async (req, res) => {
    const { title } = req.query;

    try {
        const [results] = await db.promise().query(
            'SELECT * FROM quizzes WHERE title LIKE ?',
            [`%${title}%`]
        );

        if (results.length === 0) {
            return res.status(404).json({ message: 'No quizzes found.' });
        }

        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error searching quizzes.' });
    }
});


// Get a quiz by its unique code
router.get('/quiz/:code', async (req, res) => {
    const { code } = req.params;

    try {
        const [results] = await db.promise().query(
            'SELECT * FROM quizzes WHERE quiz_code = ?',
            [code]
        );

        if (results.length === 0) {
            return res.status(404).json({ message: 'Quiz not found.' });
        }

        const quizId = results[0].id;

        const [questions] = await db.promise().query(
            'SELECT * FROM questions WHERE quiz_id = ?',
            [quizId]
        );

        const quizData = {
            ...results[0],
            questions: [],
        };

        for (let question of questions) {
            const [answers] = await db.promise().query(
                'SELECT * FROM answers WHERE question_id = ?',
                [question.id]
            );
            quizData.questions.push({
                ...question,
                answers,
            });
        }

        res.json(quizData);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving quiz.' });
    }
});

module.exports = router;