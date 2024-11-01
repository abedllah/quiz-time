import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import SignUp from './Component/SignUp';
import './css/App.css';
import MainPage from './Component/MainPage';
import CreateQuiz from './Component/CreatQuiz';
import JoinQuiz from './Component/JoinQioz';
import QuizPage from './Component/QuizPage';


export default function App(){
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreatQuiz" element={<CreateQuiz />} />
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/JoinQuiz" element={<JoinQuiz />} />
          <Route path="/QuizPage" element={<QuizPage />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
