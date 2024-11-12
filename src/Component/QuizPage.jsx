import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from "./NavigationBar";

const QuizPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const quizData = location.state?.quiz;
    const userId = localStorage.getItem("user_id");

    // State variables
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const [showCorrection, setShowCorrection] = useState(false);

    // Handle missing quiz data by redirecting
    useEffect(() => {
        if (!quizData) {
            console.warn("No quiz data available, redirecting to JoinQuiz.");
            navigate('/JoinQuiz');
        }
    }, [quizData, navigate]);

    // Early return if no questions are available
    if (!quizData || !quizData.questions || quizData.questions.length === 0) {
        return <div>No questions are available</div>;
    }

    // Track selected answers for each question
    const handleAnswerSelection = (questionIndex, isCorrect, answerId) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[questionIndex] = { isCorrect, answerId };
        setSelectedAnswers(updatedAnswers);
    };

    // Proceed to next question or finish the quiz
    const handleNext = () => {
        if (currentQuestion < quizData.questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setShowScore(true);
            // Calculate score based on correct answers
            const finalScore = selectedAnswers.reduce(
                (acc, answer) => (answer?.isCorrect ? acc + 1 : acc), 
                0
            );
            setScore(finalScore);
        }
    };

    // Submit quiz results to the server
    const handleQuizComplete = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/saveQuizResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    quizId: quizData.id,
                    score,
                    answers: selectedAnswers.map(answer => ({
                        questionId: quizData.questions[selectedAnswers.indexOf(answer)].id,
                        selectedAnswerId: answer.answerId,
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save quiz result");
            }
            console.log("Quiz result saved successfully.");
            navigate('/MainPage');
        } catch (error) {
            console.error("Error saving quiz result:", error);
        }
    };

    return (
        <div>
            <NavigationBar />
            <div className="mainS flex justify-center w-full text-white mt-8">
                <div className="p-5 w-3/4" style={{ backgroundColor: "#262626", borderRadius: "50px" }}>
                    {showScore ? (
                        <div className="text-center">
                            <h1 className="text-4xl font-bold mb-4">Your Score: {score} out of {quizData.questions.length}</h1>
                            <button onClick={handleQuizComplete} className="bg-blue-500 px-4 py-2 rounded-full text-white mr-4">
                                Return
                            </button>
                            <button onClick={() => setShowCorrection(true)} className="bg-green-500 px-4 rounded-full py-2 text-white">
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
                                            onChange={() => handleAnswerSelection(currentQuestion, answer.is_correct, answer.id)}
                                            checked={selectedAnswers[currentQuestion]?.answerId === answer.id}
                                        />
                                        <label htmlFor={`answer-${index}`} className="border-b border-gray-600 p-1 focus:outline-none">
                                            {answer.answer_text}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleNext}
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
                                        const selected = selectedAnswers[index]?.answerId === answer.id;
                                        const answerStyle = answer.is_correct ? "text-green-500" : (selected ? "text-red-500" : "");
                                        return (
                                            <div key={ansIndex} className={`flex items-center mb-2 ${answerStyle}`}>
                                                <label className="border-b border-gray-600 p-1 focus:outline-none">
                                                    {answer.answer_text} {answer.is_correct == 0 ? "" : "wrong" && "(Correct)"}
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