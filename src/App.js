import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import Products from './Component/Products';
import AddProduct from './Component/AddProduct';
import Details from './Component/Details';
import Cart from './Component/Cart';
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
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
