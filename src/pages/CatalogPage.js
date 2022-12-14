import { useState, useEffect } from "react";
import { BasePage, ItemsList } from "../components";

export default function CatalogPage({ cart, setCart }) {
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
    return (
        <div  className="h-screen flex flex-col bg-gray-800">
            <BasePage cart={cart} setCart={(e) => setCart(e)}/>
            <ItemsList storeItems={items} cart={cart} setCart={(e) => setCart(e)} />
        </div>
    )
}