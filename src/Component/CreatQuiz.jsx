import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import './../css/CreatQuiz.css';
import { Navigate } from "react-router-dom";

export default function CreatQuiz() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [image, setImage] = useState(null);
    const [questions, setQuestions] = useState([{ question: '', answers: ['', '', '', ''], correctAnswer: 0 }]);
    const [showQuestionsSection, setShowQuestionsSection] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [quizCode, setQuizCode] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    // Add a question
    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { question: '', answers: ['', '', '', ''], correctAnswer: 0 }
        ]);
    };

    // Handle title input change
    const handleTitleChange = (value) => setTitle(value);
    const handleDescriptionChange = (value) => setDescription(value);
    const handleIsPublicChange = () => setIsPublic(!isPublic);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
    
            // Create a preview URL for display purposes
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    // Handle submit quiz
    const handleSubmitQuiz = async () => {
        const user_id = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');

        if (!user_id) {
            alert('User not logged in.');
            return;
        }

        // Use FormData to include the image file
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("is_public", isPublic);
        formData.append("user_id", user_id);
        formData.append("image", image);
        formData.append("questions", JSON.stringify(questions.map(q => ({
            text: q.question,
            answers: q.answers.map((answer, index) => ({
                text: answer,
                is_correct: index === q.correctAnswer
            }))
        }))));

        try {
            const response = await fetch('http://localhost:5000/api/quiz', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert('Quiz created successfully!');
                setQuizCode(data.quiz_code);
                setShowPopup(true);
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error creating quiz:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to="/MainPage" />;
    }

    return (
        <div>
            <NavigationBar />
            <div className="mainS flex justify-center w-full text-white">
                <div className="main2 bg-gray-800 p-8 w-3/4">
                    <h1 className="text-2xl font-bold mb-4">Create Your Quiz</h1>

                    <div className={`quiz-info ${showQuestionsSection ? 'hidden' : ''}`}>
                        <label className="block mb-2">Title:</label>
                        <input
                            type="text"
                            placeholder="Enter the title"
                            className="w-full p-2 bg-gray-700 text-white rounded"
                            value={title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                        />

                        <label className="block mt-4 mb-2">Description:</label>
                        <input
                            type="text"
                            placeholder="Enter the description"
                            className="w-full p-2 bg-gray-700 text-white rounded"
                            value={description}
                            onChange={(e) => handleDescriptionChange(e.target.value)}
                        />

                        <label className="block mt-4 mb-2">Public:</label>
                        <input
                            type="checkbox"
                            checked={isPublic}
                            onChange={handleIsPublicChange}
                            className="mr-2"
                        />
                        <span>{isPublic ? 'Yes' : 'No'}</span>

                        <div className="mt-4 mb-6">
                            <label>Quiz Picture:</label>
                            <div
                                className="quiz-picture rounded-full bg-gray-600 w-24 h-24 flex items-center justify-center cursor-pointer"
                                onClick={() => document.getElementById('imageUpload').click()}
                            >
                                {previewImage ? (
                                    <img src={previewImage} alt="Quiz Preview" className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <span>Upload</span>
                                )}
                            </div>
                            <input
                                type="file"
                                id="imageUpload"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>

                        <button
                            onClick={() => setShowQuestionsSection(true)}
                            className="w-full bg-blue-600 p-2 rounded-full text-white"
                        >
                            Next: Add Questions
                        </button>
                    </div>

                    {/* Questions Section */}
                    {showQuestionsSection && (
                        <div className="questions-section">
                            {questions.map((q, qIndex) => (
                                <div key={qIndex} className="mb-6">
                                    <label className="block mb-2">Question {qIndex + 1}</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your question here"
                                        className="w-full p-2 bg-gray-700 text-white rounded"
                                        value={q.question}
                                        onChange={(e) => {
                                            const newQuestions = [...questions];
                                            newQuestions[qIndex].question = e.target.value;
                                            setQuestions(newQuestions);
                                        }}
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
                                                    onChange={(e) => {
                                                        const newQuestions = [...questions];
                                                        newQuestions[qIndex].answers[aIndex] = e.target.value;
                                                        setQuestions(newQuestions);
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button onClick={handleAddQuestion} className="w-full bg-blue-600 p-2 rounded-full text-white mb-4">
                                Add Another Question
                            </button>
                            <button onClick={handleSubmitQuiz} className="w-full bg-green-600 p-2 rounded-full text-white">
                                Submit Quiz
                            </button>
                        </div>
                    )}
                </div>

                {/* Popup for displaying the quiz code */}
                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <h2>Quiz Created!</h2>
                            <p>Your quiz code is:</p>
                            <h3>{quizCode}</h3>
                            <button onClick={() => navigator.clipboard.writeText(quizCode)}>
                                Copy Code
                            </button>
                            <button onClick={handlePopupClose}>Done</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
