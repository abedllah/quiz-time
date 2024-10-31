import React from 'react';
import NavigationBar from './NavigationBar';

export default function Home() {
  return (
    <div style={{ marginTop: '150px' }}>
      <NavigationBar />
      <div className="container-fluid mt-5 text-white">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 text-center">
            <h1 className="display-3">Welcome to QuizTime!</h1>
            <p className="lead">
              Challenge Your Knowledge Anytime, Anywhere!
            </p>
            <p className="lead">
              <button>Take a Quiz</button>
            </p>
          </div>
          <div className="col-md-6 mt-4">
            <img
              src="https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI"
              alt="E-commerce"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
