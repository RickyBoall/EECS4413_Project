import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home, CatalogPage, Page2} from './pages';
// import Home from './pages/Home';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter basename="/">
      <Routes>
      <Route path="/catalog" element={<CatalogPage cart={cart} setCart={(e) => setCart(e)} />} />
      <Route path="/cart" element={<Page2 cart={cart} setCart={(e) => setCart(e)} />} />
        <Route path="*" element={<Home cart={cart} setCart={(e) => setCart(e)}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
