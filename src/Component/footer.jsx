import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-light py-3 fixed-bottom">
    <div className="container-fluid d-flex justify-content-between">
      {/* Footer Brand Name */}
      <div>
        <h5 className="mb-1">QuizTime</h5>
        <small className="text-muted">&copy; 2024 QuizTime. All rights reserved.</small>
      </div>

      {/* Footer Links */}
      <div>
        <ul className="list-unstyled d-flex mb-0">
          <li className="mx-3">
            <a className="text-dark">Home</a>
          </li>
          <li className="mx-3">
            <a className="text-dark">Create Quiz</a>
          </li>
          <li className="mx-3">
            <a className="text-dark">Join Quiz</a>
          </li>
          <li className="mx-3">
            <a className="text-dark">Sign Up</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
  );
}
