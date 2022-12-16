import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  CatalogPage,
  CartPage,
  LoginPage,
  OrderPage,
  PreviousOrderPage,
} from "./pages";
// import OrderPage from './pages/OrderPage'; //for some reason couldnt put it above
// import Home from './pages/Home';

function App() {
  const [cart, setCart] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let user = window.localStorage.getItem("user");
    // console.log(user);
    if (user === null || user === "") {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter basename="/">
      <Routes>
        {loggedIn ? (
          <>
            <Route
              path="*"
              element={<Home cart={cart} setCart={(e) => setCart(e)} />}
            />
            <Route
              path="/catalog"
              element={<CatalogPage cart={cart} setCart={(e) => setCart(e)} />}
            />
            <Route
              path="/cart"
              element={<CartPage cart={cart} setCart={(e) => setCart(e)} />}
            />
            <Route
              path="/order"
              element={<OrderPage cart={cart} setCart={(e) => setCart(e)} />}
            />
            <Route
              path="/allorders"
              element={
                <PreviousOrderPage cart={cart} setCart={(e) => setCart(e)} />
              }
            />
          </>
        ) : (
          <Route path="*" element={<LoginPage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
