import React, { useState, useEffect } from 'react';
import './../css/MainPage.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';

export default function MainPage() {
    const [userData, setUserData] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user-data/${user_id}`);
                setUserData(response.data.user);
                setQuizzes(response.data.quizzes[0]);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (user_id) fetchUserData();
    }, [user_id]);

    const fetchQuizAndNavigate = async (quizCode) => {
        try {
            const response = await fetch(`http://localhost:5000/api/quiz/${quizCode}`);
            if (!response.ok) throw new Error('Quiz code not found.');
            
            const quizData = await response.json();
            navigate('/QuizPage', { state: { quiz: quizData } });
        } catch (error) {
            console.error('Error joining quiz:', error.message);
            // Optional: set an error state if you want to display an error message
        }
    }; 

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen w-full">
            <aside className="sideNave w-1/4 p-4 flex flex-col justify-between">
                <div>
                <img className=' w-60 mb-3 pl-0 relative right-6' src={'logo.png'} alt="logo" />
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <a href="#" className="flex items-center p-2 rounded">
                                    <i className=" fa-home mr-2"></i> Home
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="/CreatQuiz" className="flex items-center p-2 rounded">
                                    <i className="fas fa-file-alt mr-2"></i> Create Quiz
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center p-2 rounded">
                                    <i className="fas fa-trophy mr-2"></i> Leaderboard
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="/profile" className="flex items-center p-2 rounded">
                                    <i className="fas fa-user mr-2"></i> My Profile
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <ul>
                        <li>
                            <button onClick={handleLogout}>
                                <a href="" className="flex items-center p-2">
                                    <i className="fas fa-sign-out-alt mr-2"></i> Log Out
                                </a>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
            <main className="mainSection w-3/4 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">
                            Welcome, {userData.length > 0 ? userData[0].username : 'User'}!
                        </h2>
                    </div>
                    <img 
                        src={userData.length > 0 ? userData[0].user_pic : 'https://placehold.co/50x50'} 
                        alt="User profile picture" 
                        className="rounded-full w-12 h-12" 
                    />
                </header>
                <section className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Your Quiz Creations</h3>
                    <div className="flex items-center space-x-4">
                        {quizzes.map((quiz) => (
                            <div key={quiz.id} className="flex flex-col items-center">
                                <img 
                                    src={quiz.quiz_pic || 'https://placehold.co/50x50'} 
                                    alt={`Quiz ${quiz.title}`} 
                                    className="rounded-full w-20 h-20"
                                />
                                <button 
                                    style={{ backgroundColor: "#078C10" }} 
                                    className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
                                    onClick={() => fetchQuizAndNavigate(quiz.quiz_code)}
                                >
                                    Play
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
                <br />
                <section className="mb-8">
                    <div className=" mainT rou p-4 mb-4 flex justify-between items-center">
                        <div>
                            <h4 className="text-lg font-bold">Quiz Time!</h4>
                            <p className="text-gray-400">Put your knowledge to the test with our</p>
                        </div>
                        <button className="bg-white text-black px-4 py-2 "><a href="/JoinQuiz">Start</a></button>
                    </div>
                    <div className="mainT p-4  flex justify-between items-center">
                        <div>
                            <h4 className="text-lg font-bold">Italian Cuisine</h4>
                            <p className="text-gray-400">Food Lover's Quiz</p>
                        </div>
                        <button className="bg-white text-black px-4 py-2 ">Begin Quiz</button>
                    </div>
                </section>
                <section>
                    <h3 className="text-xl font-bold mb-4">Quiz Activities</h3>
                    <div className="flex space-x-4">
                        <div className="flex flex-col items-center">
                            <i className="fas fa-book text-2xl mb-2"></i>
                            <span>Reading</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-headphones text-2xl mb-2"></i>
                            <span>Listening</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-spell-check text-2xl mb-2"></i>
                            <span>Grammar</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-certificate text-2xl mb-2"></i>
                            <span>Skill</span>
                        </div>
                    </div>
                </section>
            </main>
            <aside className="sideSection w-1/4 p-4">
                <div className="joinSec mb-8">
                    <h3 className="text-xl font-bold mb-4">Join a Quiz</h3>
                    <p className=" mb-4">Test your knowledge with challenging questions!</p>
                    <a href="/JoinQuiz"><button style={{ backgroundColor: "#078C10" }} className=" text-white px-4 py-2 w-100">Join</button></a>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Quiz Leaderboard</h3>
                    <button className="bg-white text-black px-4 py-2 rounded mb-4">View All</button>
                    <ul className='leaderbord'>
                        <li className="flex justify-between items-center mb-3">
                            <div className="flex items-center">
                                <img src="https://placehold.co/30x30" alt="Top Scorer" className="rounded-full w-8 h-8 mr-2"/>
                                <span>#01 Top</span>
                            </div>
                            <span>2398 points</span>
                        </li>
                        <li className="flex justify-between items-center mb-3">
                            <div className="flex items-center">
                                <img src="https://placehold.co/30x30" alt="Quiz Master" className="rounded-full w-8 h-8 mr-2"/>
                                <span>#02 Master</span>
                            </div>
                            <span>2019 points</span>
                        </li>
                        <li className="flex justify-between items-center mb-3">
                            <div className="flex items-center">
                                <img src="https://placehold.co/30x30" alt="Quiz" className="rounded-full w-8 h-8 mr-2"/>
                                <span>#03 Quiz</span>
                            </div>
                            <span>1832 points</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <div className="flex items-center">
                                <img src="https://placehold.co/30x30" alt="You" className="rounded-full w-8 h-8 mr-2"/>
                                <span>#07 You</span>
                            </div>
                            <span>420 points</span>
                        </li>
                    </ul>
                </div>
            </aside>
            {console.log(quizzes)}
        </div>
    );
}
