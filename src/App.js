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
  AdminPage,
  SignUpPage
} from "./pages";
// import OrderPage from './pages/OrderPage'; //for some reason couldnt put it above
// import Home from './pages/Home';

function App() {
  const [cart, setCart] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let tempCart = [];
    let user = JSON.parse(window.localStorage.getItem("user"));
    const getItems = async () => {
      fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/items')
          .then(res => res.json())
          .then(data => {
          // a = data;
          console.log(data);
              const items = data._embedded.itemList;
              // console.log(itemList);
              
              // console.log(user.shoppingCart);
              user.shoppingCart.shoppingCartItems.map((item) => {
                items.map((allItem) => {
                  console.log(item.itemId, allItem.id)
                  if(allItem.id === item.itemId) {
                    allItem['cartQuantity'] = item.quantity
                    tempCart.push(allItem)
                  }
                })
              })
              setCart(tempCart)
              // setItems([...itemList]);
              // setLoading(false);
          // console.log(itemList);
          })
          
      // const itemList = a._embedded.itemList;
      // console.log(a);
    }
    getItems();
    
    // console.log(tempCart);
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
            <Route
              path="/admin"
              element={<AdminPage cart={cart} setCart={(e) => setCart(e)} />}
            />
          </>
        ) : (
          <>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
