import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JoinQuiz({ onClose }) {
    const [quizCode, setQuizCode] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    // Function to navigate back to the home page
    const goToHome = () => {
        navigate('/MainPage'); // '/' routes to the homepage
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Join a Quiz</h2>
                    <button onClick={goToHome} className="text-gray-400 hover:text-white">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Search by Quiz Name</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter quiz name..."
                        className="w-full p-2 rounded border-b-2 border-gray-500 bg-gray-900 text-white focus:border-blue-500 outline-none"
                    />
                    <button className="mt-3 bg-blue-500 hover:bg-blue-600 w-full text-white py-2 rounded font-semibold">Search</button>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Or Join with a Code</label>
                    <input
                        type="text"
                        value={quizCode}
                        onChange={(e) => setQuizCode(e.target.value)}
                        placeholder="Enter quiz code..."
                        className="w-full p-2 rounded border-b-2 border-gray-500 bg-gray-900 text-white focus:border-green-500 outline-none"
                    />
                    <button className="mt-3 bg-green-500 hover:bg-green-600 w-full text-white py-2 rounded font-semibold">Join Quiz</button>
                </div>
            </div>
        </div>
    );
}
