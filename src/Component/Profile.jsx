import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../css/Profile.css'


export default function Profile() {

    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const [history, setHistory] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        user_pic: '',
        password: ''
    });

    const [newImage, setNewImage] = useState(null);
    
    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user-data/${user_id}`);
                const { username, email, user_pic } = response.data.user[0];
                setUserData({ username, email, user_pic});
                setQuizzes(response.data.quizzes[0]);
                setHistory(response.data.history[0]);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (user_id) fetchUserData();
    }, [user_id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            
            // Show a local preview without affecting `userData.user_pic` until update
            const reader = new FileReader();
            reader.onload = () => {
                setUserData((prevData) => ({ ...prevData, user_pic_preview: reader.result })); 
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        if (newImage) formData.append('user_pic', newImage);
        
        try {
            await axios.put(`http://localhost:5000/api/user-data/${user_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Profile updated successfully!');
            navigate(0)
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    
    let imageP =""
    if (userData.length > 0 || userData.user_pic != null){
        imageP = `http://localhost:5000/${userData.user_pic}`
    } else {
        imageP ="avatar.jpg"
    }
    
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
    console.log(userData.length > 0 || userData.user_pic != null)

  return (
    <div className='flex h-screen w-full'>
         <aside className="sideNave w-1/5 p-4 flex flex-col justify-between">
                <div>
                <img className=' w-60 mb-3 pl-0 relative right-6' src={'logo.png'} alt="logo" />
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <a href="/MainPage" className="flex items-center p-2 rounded">
                                    <i className="fas fa-home mr-2"></i> Home
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="/CreatQuiz" className="flex items-center p-2 rounded">
                                    <i className="fas fa-file-alt mr-2"></i> Create Quiz
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="/Leaderbord" className="flex items-center p-2 rounded">
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
            <main className="mainSection h-full w-full p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">Welcome {userData.username}!</h2>
                    </div>
                    <img src={userData.length > 0 || userData.user_pic != null ? `http://localhost:5000/${userData.user_pic}` : 'avatar.jpg' }  
                    alt="User profile picture" className="rounded-full w-12 h-12"/>
                </header>
                
                <section className="Psection text-white flex justify-center space-x-4 ">
                <div className="w-1/2 p-6 shadow bg-gray-800 flex items-center">
            <div className="flex items-center justify-center mr-6">
                <div
                    className="quiz-picture rounded-full bg-gray-600 w-24 h-24 flex items-center justify-center cursor-pointer mb-4"
                    onClick={() => document.getElementById('imageUpload').click()}
                >
                    <img 
                        src={
                            
                                (userData.user_pic_preview || imageP)
                        }
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
                <input
                    type="file"
                    id="imageUpload"
                    className="hidden"
                    onChange={handleImageChange}
                />
            </div>

            <div className="w-full flex flex-col items-start">
                <input 
                    type="text" 
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    className="profile-input text-center text-white mb-3 bg-gray-800 border-b border-gray-300 focus:border-green-500"
                    placeholder="Username"
                />
                <input 
                    type="email" 
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="profile-input text-center text-white mb-3 bg-gray-800 border-b border-gray-300 focus:border-green-500"
                    placeholder="Email"
                />
                <input 
                    type="password" 
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    className="profile-input text-center text-white mb-3 bg-gray-800 border-b border-gray-300 focus:border-green-500"
                    placeholder="New Password"
                />
                <button 
                    onClick={handleUpdate}
                    className="update-btn mt-2 w-full"
                >
                    Update
                </button>
            </div>
        </div>

                <div className="w-1/2 p-3 shadow">
                    <h2 className="text-xl font-bold mb-4">
                        Created Quizzes
                    </h2>
                    <ul className="space-y-4 max-h-[190px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
                        {quizzes.map((quiz, i) => (
                            <li key={quiz.id} className="rounded-lg flex items-center">
                                <img 
                                    alt="Quiz image placeholder" 
                                    className="w-12 h-12 rounded-full mr-4" 
                                    height="50" 
                                    src={quiz.quiz_pic ? `http://localhost:5000${quiz.quiz_pic}` : 'https://placehold.co/50x50'} 
                                    width="50"
                                />
                                <span className="flex-grow text-white">
                                    {quiz.title}
                                </span>
                                <button 
                                    onClick={() => fetchQuizAndNavigate(quiz.quiz_code)} 
                                    style={{ backgroundColor: "#078C10" }}  
                                    className="text-white px-4 mr-3 py-2 rounded-full">
                                    Play
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <div class="history p-6 shadow-lg mt-6">
                <h2 class="text-xl font-bold mb-4 text-white">
                    Quiz History
                    </h2>
                    <table  class="min-w-full text-white">
                      <thead>
                        <tr>
                        <th class="py-2 px-4 border-b border-gray-200 text-left">
                            Title
                        </th>
                        <th class="py-2 px-4 border-b border-gray-200 text-left">
                            Score
                        </th>
                        <th class="py-2 px-4 border-b border-gray-200 text-left">
                            Date
                        </th>
                        </tr>
                        </thead>
                        <tbody>
                            {history.map((element) => {
                                return (
                                    <tr>
                                <td class="py-2 px-4 border-b border-gray-200">
                                    {element.title}
                                </td>
                                <td class="py-2 px-4 border-b border-gray-200">
                                    {element.score}
                                </td>
                                <td class="py-2 px-4 border-b border-gray-200">
                                    {element.completed_at}
                                </td>
                                </tr>
                                )
                            } )
                                }
                        </tbody>
                    </table>
                </div>
            </main>
    </div>
  )
}
