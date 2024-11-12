import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import './css/App.css';
import MainPage from './Component/MainPage';
import CreateQuiz from './Component/CreatQuiz';
import JoinQuiz from './Component/JoinQioz';
import QuizPage from './Component/QuizPage';
import Login from './Component/Login';
import Signup from './Component/Signup';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Profile from './Component/Profile';
import Leaderbored from './Component/Leaderbored';


export default function App(){
  return (
    <div className='app'>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreatQuiz" element={<PrivateRoute><CreateQuiz /></PrivateRoute> }/>
          <Route path="/MainPage" element={<PrivateRoute><MainPage /></PrivateRoute>} />
          <Route path="/JoinQuiz" element={<PrivateRoute><JoinQuiz /></PrivateRoute>} />
          <Route path="/QuizPage" element={<PrivateRoute><QuizPage /></PrivateRoute>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderbord" element={<Leaderbored />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
