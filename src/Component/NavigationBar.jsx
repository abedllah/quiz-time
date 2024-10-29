import React from 'react';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <Link className="navbar-brand" to="/">
        QuizTime
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto"> 
          <li className="nav-item active mx-2"> 
            <Link className="nav-link" to="/">
              HOME <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/products">
              create quize
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/add">
              join quiz
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/cart">
              sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
