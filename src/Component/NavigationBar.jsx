import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../css/Nav.css'
export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="NavBar text-white shadow-lg fixed top-0 left-0 right-0">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <a to="/" className="flex  items-center py-4 px-2">
              <span className="font-semibold  text-lg"><img className=' w-60' src={'logo.png'} alt="logo" /></span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/MainPage" className="py-4 px-2  font-semibold hover:text-green-500 transition duration-300">HOME</Link>
            <Link to="/CreatQuiz" className="py-4 px-2  font-semibold hover:text-green-500 transition duration-300">Create Quiz</Link>
            <Link to="/JoinQuiz" className="py-4 px-2  font-semibold hover:text-green-500 transition duration-300">Join Quiz</Link>
            <Link to="/Login" className="py-4 px-2  font-semibold hover:text-green-500 transition duration-300">Login</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
              <svg className="w-6 h-6  hover:text-green-500"
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <ul className="">
          <li><Link to="/" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">HOME</Link></li>
          <li><Link to="/MainPage" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">MainPage</Link></li>
          <li><Link to="/CreatQuiz" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Create Quiz</Link></li>
          <li><Link to="/add" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Join Quiz</Link></li>
          <li><Link to="/SignUp" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Sign Up</Link></li>
        </ul>
      </div>
    </nav>
  );
}