import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../css/Profile.css'

export default function Profile() {

    const { logout } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user-data/${user_id}`);
                setUserData(response.data.user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (user_id) fetchUserData();
    }, [user_id]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

  return (
    <div className='flex h-screen w-full'>
         <aside className="sideNave w-1/5  p-4 flex flex-col justify-between">
                <div>
                <img className=' w-60 mb-3 pl-0 relative right-6' src={'logo.png'} alt="logo" />
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <a href="/MainPage" className="flex items-center p-2 rounded">
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
                        <h2 className="text-3xl font-bold">Welcome Abdellah!</h2>
                    </div>
                    <img src={userData.length > 0 ? userData[0].user_pic : 'https://placehold.co/50x50'}  alt="User profile picture" className="rounded-full w-12 h-12"/>
                </header>
                
                <section className="Psection text-white flex justify-center space-x-4 ">
                <div className="w-1/2 p-3 shadow ">
                    <div className="flex items-center mb-6">
                    <div className="mt-4 mb-6">
                            <div
                                className="quiz-picture rounded-full bg-gray-600 w-24 h-24 flex items-center justify-center cursor-pointer"
                                onClick={() => document.getElementById('imageUpload').click()}
                            >
                                    <img src="https://storage.googleapis.com/a1aa/image/Mn7UbdilC64wOl7nPOro9bg9WbFX3g7JwVU2ry95hmFmi07E.jpg" alt="Quiz" className="w-full h-full object-cover rounded-full" />                            
                            </div>
                            <input
                                type="file"
                                id="imageUpload"
                                className="hidden"
                            />
                        </div>
                        <div>
                            <input className="text-black block mb-2 border-b border-gray-300" type="text" value="Username" />
                            <input className="text-black block mb-2 border-b border-gray-300" type="text" value="user@example.com" />
                            <button style={{ backgroundColor: "#078C10" }}  className="text-white p-2 px-4 rounded-full mt-2">Update</button>
                        </div>
                    </div>
                </div>

                <div className=" w-1/2 p-3 shadow">
                <h2 class="text-xl font-bold mb-4 ">
                Created Quizzes
                </h2>
                <ul class="space-y-4">
                <li class="  rounded-lg flex items-center">
                <img alt="Quiz image placeholder" class="w-12 h-12 rounded-full mr-4" height="50" src="https://storage.googleapis.com/a1aa/image/vSRir7qVueTCUiOppfmGxvDKwdFA14SECRSnftcwSus1UkeOB.jpg" width="50"/>
                <span class="flex-grow text-white">
                    Quiz Title 1
                </span>
                <button style={{ backgroundColor: "#078C10" }}  class="text-white px-4 py-2 rounded-full">
                    Play
                </button>
                </li>
                <li class="  rounded-lg flex items-center">
                <img alt="Quiz image placeholder" class="w-12 h-12 rounded-full mr-4" height="50" src="https://storage.googleapis.com/a1aa/image/vSRir7qVueTCUiOppfmGxvDKwdFA14SECRSnftcwSus1UkeOB.jpg" width="50"/>
                <span class="flex-grow text-white">
                    Quiz Title 2
                </span>
                <button style={{ backgroundColor: "#078C10" }}  class=" text-white px-4 py-2 rounded-full">
                    Play
                </button>
                </li>
                <li class="  rounded-lg flex items-center">
                <img alt="Quiz image placeholder" class="w-12 h-12 rounded-full mr-4" height="50" src="https://storage.googleapis.com/a1aa/image/vSRir7qVueTCUiOppfmGxvDKwdFA14SECRSnftcwSus1UkeOB.jpg" width="50"/>
                <span class="flex-grow text-white">
                    Quiz Title 3
                </span>
                <button style={{ backgroundColor: "#078C10" }}  class=" text-white px-4 py-2 rounded-full">
                    Play
                </button>
                </li>
                </ul>
                </div>
            </section>
            <div class="history p-6 shadow-lg mt-6">
    <h2 class="text-xl font-bold mb-4 text-white">
     Quiz History
    </h2>
    <table class="min-w-full text-white">
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
      <tr>
       <td class="py-2 px-4 border-b border-gray-200">
        Quiz Title 1
       </td>
       <td class="py-2 px-4 border-b border-gray-200">
        85%
       </td>
       <td class="py-2 px-4 border-b border-gray-200">
        2023-01-01
       </td>
      </tr>
      <tr>
       <td class="py-2 px-4 border-b border-gray-200">
        Quiz Title 2
       </td>
       <td class="py-2 px-4 border-b border-gray-200">
        90%
       </td>
       <td class="py-2 px-4 border-b border-gray-200">
        2023-01-02
       </td>
      </tr>
      <tr>
       <td class="py-2 px-4 border-b border-gray-200">
        Quiz Title 3
       </td>
       <td class="py-2 px-4 border-b border-gray-200">
        75%
       </td>
       <td class="py-2 px-4 border-b border-gray-200">
        2023-01-03
       </td>
      </tr>
     </tbody>
    </table>
   </div>
            </main>
    </div>
  )
}
