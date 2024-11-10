import React from 'react';
import NavigationBar from './NavigationBar';

export default function Home() {
  return (
    <div style={{ marginTop: '150px', backgroundImage: 'bgi.jpeg'}}>
      <NavigationBar />
      <div className="container-fluid mt-5 text-white">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 text-center">
            <h1 className="display-3">Welcome to QuizTime!</h1>
            <p className="lead">
              Challenge Your Knowledge Anytime, Anywhere!
            </p>
            <p className="lead">
              <a className='text-white' href="/MainPage"><button className='rounded-full mt-4 pl-5 pt-1 pb-1 pr-5 bg-green-700 font-bold'>Take a Quiz</button></a>
            </p>
          </div>
          <div className="col-md-6 mt-4">
            <img
              src={'bgi.jpeg'}
              alt=""
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
