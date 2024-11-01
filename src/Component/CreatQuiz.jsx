import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import './../css/CreatQuiz.css';

export default function CreatQuiz() {
    const [questions, setQuestions] = useState([
        { question: '', answers: ['', '', '', ''], correctAnswer: 0 }
    ]);

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { question: '', answers: ['', '', '', ''], correctAnswer: 0 }
        ]);
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (qIndex, aIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers[aIndex] = value;
        setQuestions(newQuestions);
    };

    return (
        <div>
            <NavigationBar />
            <div className="mainS flex justify-center w-full text-white">
                <div className="bg-gray-800 p-8 w-3/4">
                    <h1 className="text-2xl font-bold mb-4">Create Your Quiz</h1>
                    {questions.map((q, qIndex) => (
                        <div key={qIndex} className="mb-6">
                            <label className="block mb-2">Question {qIndex + 1}</label>
                            <input
                                type="text"
                                placeholder="Enter your question here"
                                className="w-full p-2 bg-gray-700 text-white rounded"
                                value={q.question}
                                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                            />
                            <div className="mt-4">
                                <label className="block mb-2">Multiple Choice Answers</label>
                                {q.answers.map((answer, aIndex) => (
                                    <div key={aIndex} className="flex items-center mb-2">
                                        <input
                                            type="radio"
                                            name={`answer-${qIndex}`}
                                            className="mr-2"
                                            checked={q.correctAnswer === aIndex}
                                            onChange={() => {
                                                const newQuestions = [...questions];
                                                newQuestions[qIndex].correctAnswer = aIndex;
                                                setQuestions(newQuestions);
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder={`Answer option ${aIndex + 1}`}
                                            className="w-full bg-gray-700 text-white border-b border-gray-500 p-1 focus:outline-none"
                                            value={answer}
                                            onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button onClick={handleAddQuestion} className="w-full bg-blue-600 p-2 rounded-full text-white mb-4">
                        Add Another Question
                    </button>
                    <button className="w-full bg-green-600 p-2 rounded-full text-white">Submit Quiz</button>
                </div>
            </div>
        </div>
    );
}