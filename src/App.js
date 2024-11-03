import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import './css/App.css';
import MainPage from './Component/MainPage';
import CreateQuiz from './Component/CreatQuiz';
import JoinQuiz from './Component/JoinQioz';
import QuizPage from './Component/QuizPage';
import Login from './Component/Login';
import Signup from './Component/signup';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';


export default function App(){
  return (
    <div className='app'>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreatQuiz" element={<PrivateRoute><CreateQuiz /></PrivateRoute> }/>
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/JoinQuiz" element={<JoinQuiz />} />
          <Route path="/QuizPage" element={<QuizPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
