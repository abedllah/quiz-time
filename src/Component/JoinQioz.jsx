import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JoinQuiz({ onClose }) {
    const [quizCode, setQuizCode] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Navigate to the home page
    const goToHome = () => {
        navigate('/MainPage');
    };

    // Search quizzes by title
    const handleSearch = async () => {
        setError('');
        try {
            const response = await fetch(`http://localhost:5000/api/quiz/search?title=${searchTerm}`);
            if (!response.ok) throw new Error('Quiz not found.');
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            setError(error.message);
        }
    };

    // Join a quiz by code
    const handleJoinByCode = async () => {
        setError(''); // Clear any previous errors
        try {
            const response = await fetch(`http://localhost:5000/api/quiz/${quizCode}`);
            console.log("Response:", response);
            if (!response.ok) {
                throw new Error('Quiz code not found.');
            }
            
            const quizData = await response.json();
            navigate('/QuizPage', { state: { quiz: quizData } });
        } catch (error) {
            setError(error.message); // Set the error message to display it in the UI
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div style={{ backgroundColor: "#262626"}} className="text-white p-6 rounded-lg w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Join a Quiz</h2>
                    <button onClick={goToHome} className="text-gray-400 hover:text-white">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Search by Quiz Name */}
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Search by Quiz Name</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter quiz name..."
                        className="w-full p-2 rounded border-b-2 border-gray-500 bg-gray-900 text-white focus:border-blue-500 outline-none"
                    />
                    <button
                        onClick={handleSearch}
                        className="mt-3 bg-white hover:bg-blue-600 w-full text-black py-2 rounded-full font-semibold"
                    >
                        Search
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>

                {/* Display Search Results */}
                {searchResults.length > 0 && (
                    <div className="mb-4">
                        <h3 className="font-semibold">Search Results:</h3>
                        <ul>
                            {searchResults.map((quiz) => (
                                <li
                                    key={quiz.id}
                                    className="cursor-pointer text-blue-400 hover:underline mt-2"
                                    onClick={() => navigate('/QuizPage', { state: { quiz } })}
                                >
                                    {quiz.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Join with a Code */}
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Or Join with a Code</label>
                    <input
                        type="text"
                        value={quizCode}
                        onChange={(e) => setQuizCode(e.target.value)}
                        placeholder="Enter quiz code..."
                        className="w-full p-2 rounded border-b-2 border-gray-500 bg-gray-900 text-white focus:border-green-500 outline-none"
                    />
                    <button
                        onClick={handleJoinByCode}
                        style={{ backgroundColor: "#078C10" }}
                        className="mt-3 hover:bg-green-600 w-full text-white py-2 rounded-full font-semibold"
                    >
                        Join Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}