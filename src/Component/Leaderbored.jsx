import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';

export default function Leaderbored() {

    const [userData, setUserData] = useState([]);
    const [users, setUsers] = useState([]);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user-data/${user_id}`);
                setUserData(response.data.user);
                setUsers(response.data.users[0]);
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

  return(
  <div className="flex h-screen w-full">
  <aside className="sideNave w-1/4 p-4 flex flex-col justify-between">
      <div>
      <img className=' w-60 mb-3 pl-0 relative right-6' src={'logo.png'} alt="logo" />
          <nav>
              <ul>
                  <li className="mb-4">
                      <a href="#" className="flex items-center p-2 rounded">
                          <i className="fas fa-home mr-2"></i> Home
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
          </div> {/*  */}
          <img 
              src={userData.length > 0 && userData[0].user_pic != null ? `http://localhost:5000/${userData[0].user_pic}` : 'avatar.jpg' }
              alt="User profile picture" 
              className="rounded-full w-12 h-12" 
          />
      </header>
      <section className="mb-8">
      <div className=''>
          <h3 className="text-xl font-bold mb-4">Quiz Leaderboard</h3>
          <ul className='leaderbord h-auto'>
              {users.map((user, index) => (
                  <li key={index} className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                      <img src={user.user_pic !=null ? `http://localhost:5000/${user.user_pic}` : "avatar.jpg"} alt="Top Scorer" className="rounded-full w-8 h-8 mr-2"/>
                      <span>#{String(index + 1).padStart(2, '0')} {user.username}</span>
                  </div>
                  <span>{1536 - index * index *79} points</span>
                  </li>
              ))}
          </ul>
      </div>
      </section>
  </main>
</div>
  );
}