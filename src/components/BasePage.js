import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Autocomplete, TextField, styled, Button } from "@mui/material";

const StyledAutocomplete = styled(Autocomplete) ({
    "& .MuiAutocomplete-inputRoot": {
        color: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      }
})

export default function BasePage({ cart, setCart }) {
    const [items, setItems] = useState([
        {
            "id": 4,
            "name": "Blackberry",
            "available": true,
            "price": 6.69 
        },
        {
            "id": 5,
            "name": "Blueberry",
            "available": false,
            "price": 7.69 
        },
        {
            "id": 6,
            "name": "Strawberry",
            "available": true,
            "price": 8.69 
        },
    ])
    const [itemNames, setItemNames] = useState([])

    useEffect(() => {
        let nameArr = [];
        items.map((item) => {
            nameArr.push(item.name)
        })
        setItemNames(nameArr)
    }, [])
    return (
        <div>
            <div className="flex px-10 py-5">
                <div className="flex">
                    <img src="https://i.kym-cdn.com/photos/images/facebook/001/916/585/791.jpg" height={64} width={64} className="pr-4" /> 
                    <h4 className="text-white font-semibold">Name Of Store</h4>
                </div>
                <div className="flex ml-8">
                    <StyledAutocomplete sx={{ width: 300 }} options={itemNames} renderInput={(params) => <TextField {...params} label={<p style={{ "color" : "white" }}> Search... </p>} />} />
                </div>
            </div>
            <div className="flex items-center px-10 h-14 bg-gray-600 w-full justify-between">
                <div></div>
                <div className="">
                    <Link to="/home"> Home </Link>
                </div>
                <div className="">
                    <Link to="/catalog"> Store Catalog </Link>
                </div>
                <div className="">
                    <Link to="/cart"> Cart ({cart.length}) </Link>
                </div>
                <div></div>
            </div>
        </div>
    )
}