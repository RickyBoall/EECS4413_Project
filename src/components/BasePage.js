import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Autocomplete, TextField, styled, Button } from "@mui/material";

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiAutocomplete-inputRoot": {
    color: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
});

export default function BasePage({ cart, setCart, notLoggedIn }) {
  const [items, setItems] = useState([
    {
      id: 4,
      name: "Blackberry",
      available: true,
      price: 6.69,
    },
    {
      id: 5,
      name: "Blueberry",
      available: false,
      price: 7.69,
    },
    {
      id: 6,
      name: "Strawberry",
      available: true,
      price: 8.69,
    },
  ]);
  const [itemNames, setItemNames] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  // console.log(user)

  useEffect(() => {
    let nameArr = [];
    items.map((item) => {
      nameArr.push(item.name);
    });
    let user = JSON.parse(window.localStorage.getItem("user"));
    if (user === null || user === "") {
    } else {
      setUser(user);

      //Set admin:
      if (user["username"] === "admin") {
        setIsAdmin(true);
      }
    }
    setItemNames(nameArr);
  }, []);

  useEffect(() => {
    if (cart) {
      let total = 0;
      cart.map((item) => {
        total += item.cartQuantity;
      });
      setCartTotal(total);
    }
  }, [cart]);

  return (
    <div>
      <div className="flex px-10 py-5">
        <div className="flex">
          <img
            src="https://i.kym-cdn.com/photos/images/facebook/001/916/585/791.jpg"
            height={64}
            width={64}
            className="pr-4"
          />
          <h4 className="text-white font-semibold">Name Of Store</h4>
        </div>
        <div className="flex ml-8">
          <p className="text-white"> Current User: {user.name} </p>
        </div>
        <div className="absolute mr-8 right-0">
          {notLoggedIn ? null : (
            <Button
              onClick={() => {
                window.localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              {" "}
              Logout{" "}
            </Button>
          )}
          {/* <StyledAutocomplete sx={{ width: 300 }} options={itemNames} renderInput={(params) => <TextField {...params} label={<p style={{ "color" : "white" }}> Search... </p>} />} /> */}
        </div>
      </div>
      <div className="flex items-center px-10 h-14 bg-gray-600 w-full justify-between">
        {notLoggedIn ? null : (
          <>
            <div></div>
            <div className="">
              <Link to="/home"> Home </Link>
            </div>
            <div className="">
              <Link to="/catalog"> Store Catalog </Link>
            </div>
            <div className="">
              <Link to="/cart"> Cart ({cartTotal}) </Link>
            </div>
            <div className="">
              <Link to="/order"> Order </Link>
            </div>
            {!isAdmin ? null : (
              <div className="">
                <Link to="/admin"> Admin </Link>
              </div>
            )}
            <div></div>
          </>
        )}
      </div>
    </div>
  );
}
