import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import Products from './Component/Products';
import AddProduct from './Component/AddProduct';
import Details from './Component/Details';
import SignUp from './Component/SignUp';
import Footer from './Component/Footer';
import './style.css';


export default function App(){
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/detaile/:id" element={<Details />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
        <Footer />
    </div>
  );
}
