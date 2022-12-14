import React from "react";
import { Link } from "react-router-dom";
import { BasePage } from "../components";

export default function Home({ cart, setCart }) {

    return (
        <div className="h-screen flex flex-col bg-gray-800">
            <BasePage cart={cart} setCart={(e) => setCart(e)} />
            <div className="h-full flex items-center justify-center">
                <div className="flex flex-wrap max-w-lg">
                    <p className="text-white"> Home Content</p>
                </div>
            </div>
        </div>
    )
}