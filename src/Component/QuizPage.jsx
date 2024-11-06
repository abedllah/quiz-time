import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from "./NavigationBar";

const QuizPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const quizData = location.state?.quiz; // Access quizData from location.state

    // Initialize state variables
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const [showCorrection, setShowCorrection] = useState(false);

    // Handle cases where quizData is not available
    useEffect(() => {
        if (!quizData) {
            console.warn("No quiz data available, redirecting to JoinQuiz.");
            navigate('/JoinQuiz'); // Redirect if data is missing
        }
    }, [quizData, navigate]);

    // Return early if quizData is not available
    if (!quizData || !quizData.questions || quizData.questions.length === 0) {
        return <div>No questions are available</div>;
    }

    // Rest of the QuizPage component logic
    const handleAnswerClick = (isCorrect) => {
        setSelectedAnswers(prev => [...prev, isCorrect]);
        if (isCorrect) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < quizData.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowScore(true);
        }
    };

    const handleViewCorrection = () => {
        setShowCorrection(true);
    };

    const goHome = () => {
        navigate('/MainPage');
    };

    return (
        <div>
            <NavigationBar />
            <div className="mainS flex justify-center w-full text-white mt-8">
                <div className="p-5 w-3/4" style={{ backgroundColor: "#262626", borderRadius: "50px" }}>
                    {showScore ? (
                        <div className="text-center">
                            <h1 className="text-4xl font-bold mb-4">Your Score: {score} out of {quizData.questions.length}</h1>
                            <button onClick={goHome} className="bg-blue-500 px-4 py-2 rounded-full text-white mr-4">
                                Return
                            </button>
                            <button onClick={handleViewCorrection} className="bg-green-500 px-4 rounded-full py-2 text-white">
                                View Correction
                            </button>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold mb-4">Quiz Time!</h1>
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold mb-2">
                                    {quizData.questions[currentQuestion].question_text}
                                </h2>
                                {quizData.questions[currentQuestion].answers.map((answer, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <input
                                            type="radio"
                                            name="answer"
                                            id={`answer-${index}`}
                                            className="mr-2"
                                            onChange={() => handleAnswerClick(answer.is_correct)}
                                        />
                                        <label htmlFor={`answer-${index}`} className="border-b border-gray-600 p-1 focus:outline-none">
                                            {answer.answer_text}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleNextQuestion}
                                className="w-full rounded-full p-2 text-white bg-blue-500 hover:bg-blue-600"
                            >
                                {currentQuestion < quizData.questions.length - 1 ? "Next Question" : "Quiz Complete"}
                            </button>
                        </>
                    )}
                    {showCorrection && (
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold mb-2">Corrections:</h2>
                            {quizData.questions.map((question, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="font-semibold">{question.question_text}</h3>
                                    {question.answers.map((answer, ansIndex) => {
                                        const selected = selectedAnswers[index];
                                        const answerStyle = selected === answer.is_correct
                                            ? "text-green-500"
                                            : selected !== undefined && selected !== answer.is_correct
                                                ? "text-red-500"
                                                : "";
                                        return (
                                            <div key={ansIndex} className={`flex items-center mb-2 ${answerStyle}`}>
                                                <label className="border-b border-gray-600 p-1 focus:outline-none">
                                                    {answer.answer_text} {answer.is_correct && "(Correct)"}
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