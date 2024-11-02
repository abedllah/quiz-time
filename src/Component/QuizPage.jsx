import React, { useState } from 'react';
import NavigationBar from "./NavigationBar";
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
    // Placeholder questions and answers with correct answers
    const navigate =useNavigate()
    const questions = [
        {
            id: 1,
            questionText: "What is the capital of France?",
            answers: [
                { text: "Berlin", isCorrect: false },
                { text: "Paris", isCorrect: true },
                { text: "Rome", isCorrect: false },
                { text: "Madrid", isCorrect: false },
            ],
        },
        {
            id: 2,
            questionText: "What is the largest planet in our solar system?",
            answers: [
                { text: "Earth", isCorrect: false },
                { text: "Mars", isCorrect: false },
                { text: "Jupiter", isCorrect: true },
                { text: "Saturn", isCorrect: false },
            ],
        },
        {
            id: 3,
            questionText: "Which ocean is the largest?",
            answers: [
                { text: "Indian", isCorrect: false },
                { text: "Atlantic", isCorrect: false },
                { text: "Arctic", isCorrect: false },
                { text: "Pacific", isCorrect: true },
            ],
        },
    ];

    function goHome(){
        navigate('/MainPage');
    }

    // State to keep track of the current question index, score, and selected answers
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const [showCorrection, setShowCorrection] = useState(false);

    // Handle answer selection
    const handleAnswerClick = (isCorrect) => {
        setSelectedAnswers(prev => [...prev, isCorrect]);
        if (isCorrect) {
            setScore(prev => prev + 1);
        }
    };

    // Handle Next Question button click
    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowScore(true);
        }
    };

    // Handle View Correction button click
    const handleViewCorrection = () => {
        setShowCorrection(true);
    };

    return (
        <div>
            <NavigationBar />
            <div className="mainS flex justify-center w-full text-white mt-10">
                <div className="p-8 w-3/4 bg-gray-800 rounded-lg">
                    {!showScore ? (
                        <>
                            <h1 className="text-2xl font-bold mb-4">Quiz Time!</h1>
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold mb-2">
                                    {questions[currentQuestion].questionText}
                                </h2>
                                {questions[currentQuestion].answers.map((answer, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <input
                                            type="radio"
                                            name="answer"
                                            id={`answer-${index}`}
                                            className="mr-2"
                                            onChange={() => handleAnswerClick(answer.isCorrect)}
                                        />
                                        <label
                                            htmlFor={`answer-${index}`}
                                            className="border-b border-gray-600 p-1 focus:outline-none"
                                        >
                                            {answer.text}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleNextQuestion}
                                className={`w-full rounded-full p-2 text-white bg-blue-500 hover:bg-blue-600`}
                            >
                                {currentQuestion < questions.length - 1 ? "Next Question" : "Quiz Complete"}
                            </button>
                        </>
                    ) : (
                        <div className="text-center">
                            <h1 className="text-4xl font-bold mb-4">Your Score: {score} out of {questions.length}</h1>
                            <button
                                onClick={() => goHome()}
                                className="bg-blue-500 px-4 py-2 rounded-full text-white mr-4"
                            >
                                Return
                            </button>
                            <button
                                onClick={handleViewCorrection}
                                className="bg-green-500 px-4 rounded-full py-2 text-white"
                            >
                                View Correction
                            </button>
                        </div>
                    )}
                    {showCorrection && (
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold mb-2">Corrections:</h2>
                            {questions.map((question, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="font-semibold">{question.questionText}</h3>
                                    {question.answers.map((answer, ansIndex) => {
                                        const selected = selectedAnswers[index];
                                        const answerStyle = selected === undefined ? "" :
                                            selected === answer.isCorrect ? "text-green-500" : "text-red-500";
                                        return (
                                            <div key={ansIndex} className={`flex items-center mb-2 ${answerStyle}`}>
                                                <label className="border-b border-gray-600 p-1 focus:outline-none">
                                                    {answer.text} {answer.isCorrect && "(Correct)"}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizPage;
