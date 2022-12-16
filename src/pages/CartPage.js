import React from "react";
import { BasePage, CartList } from "../components";

export default function CartPage({ cart, setCart }) {

    return (
        <div className="h-screen flex flex-col bg-gray-800">
            <BasePage cart={cart} setCart={(e) => setCart(e)}/>
            {/* <button className="text-white py-10" onClick={() => console.log(cart)}> CONSOLE LOG CART </button> */}
            {/* <ItemsList storeItems={items} cart={cart} setCart={(e) => setCart(e)} /> */}
            <CartList cart={cart} setCart={(e) => setCart(e)} />
        </div>
    )
}