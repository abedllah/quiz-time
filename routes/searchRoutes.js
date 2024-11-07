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


router.post('/saveQuizResult', async (req, res) => {
    const { userId, quizId, score, answers } = req.body;

    try {
        // Step 1: Insert the score into `user_quiz_results`
        const [result] = await db.promise().execute(
            'INSERT INTO user_quiz_results (user_id, quiz_id, score) VALUES (?, ?, ?)',
            [userId, quizId, score]
        );
        const userQuizResultId = result.insertId;

        // Step 2: Ensure `answers` is a valid array
        if (!Array.isArray(answers)) {
            console.error("Error: Answers is not an array:", answers);
            return res.status(400).json({ error: 'Answers should be an array' });
        }

        // Step 3: Insert each answer into `user_answers`
        const answerInsertPromises = answers.map(answer => {
            return db.promise().execute(
                'INSERT INTO user_answers (user_quiz_result_id, question_id, selected_answer_id) VALUES (?, ?, ?)',
                [userQuizResultId, answer.questionId, answer.selectedAnswerId]
            );
        });

        // Execute all insertions for answers concurrently
        await Promise.all(answerInsertPromises);

        // Send a success response
        res.status(200).json({ message: 'Quiz result saved successfully' });
    } catch (error) {
        console.error("Error saving quiz result:", error);
        res.status(500).json({ error: 'Failed to save quiz result' });
    }
});

module.exports = router;