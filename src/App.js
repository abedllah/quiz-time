import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';

import SignUp from './Component/SignUp';
import './css/App.css';
import MainPage from './Component/MainPage';


export default function App(){
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
