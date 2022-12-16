import { useState, useEffect } from "react";
import { Button, TextField, styled, Modal, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel } from "@mui/material";


export default function CartList({ cart, setCart }) {
    const [userCart, setUserCart] = useState(cart);

    const removeFromCart = (index) => {
        let tempCart = [];
        userCart.map((item, cartIndex) => {
            if (index != cartIndex) {
                tempCart.push(item);
            }
        })
        setCart(tempCart);
        setUserCart(tempCart);
    }

    const test = async() => {
        let data = {
            quantity: 5
        };
        fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/shopping-cart-items/7/2/', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
            // a = data;
            // console.log(data);
                // const itemList = data;
                // console.log(data);
                // setItems([...itemList]);
                // setLoading(false);
            // console.log(itemList);
        })
                
            // const itemList = a._embedded.itemList;
            // console.log(a);
    }
    
    return (
        <div className="flex grid grid-cols-4">
            {/* <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <div className="flex bg-gray-400/80 items-center justify-center w-[50vw] h-[30vh] mx-auto my-48">
                <p> PUT ITEM INFO HERE: {selectedItem.name} </p>
                </div>
            </Modal> */}
            {/* <button onClick={() => test()}> oasndkjsan </button> */}
            <div className="flex grid grid-cols-8 py-10 text-zinc-300 col-start-2 col-span-2">
                <div className="col-start-2 col-span-1 border-b-4 border-black">
                    <p> Name </p> 
                </div>
                <div className="col-start-3 col-span-1 border-b-4 border-black">
                    <p> Type </p> 
                </div>
                <div className="col-start-4 col-span-1 border-b-4 border-black">
                    <p> Price </p> 
                </div>
                <div className="col-start-5 col-span-1 border-b-4 border-black">
                    <p> Quantity </p> 
                </div>
                <div className="col-start-6 col-span-1 border-b-4 border-black">
                    <p> Remove </p> 
                </div>
                
                {cart.map((item, index) => {
                    // console.log(item)
                    return (
                        <>
                            <div className="col-start-2 col-span-1 py-4">
                                {/* <button onClick={() => {setSelectedItem(item); setModalOpen(true)}}> {item.name} </button>  */}
                                <p> {item.name} </p>
                            </div>
                            <div className="col-start-3 col-span-1 py-4">
                                <p> {item.type} </p> 
                            </div>
                            <div className="col-start-4 col-span-1 py-4">
                                <p> {item.price} </p> 
                            </div>
                            <div className="col-start-5 col-span-1 py-4">
                                <p> {item.cartQuantity} </p>
                            </div>
                            <div className="flex col-span-2">
                                {/* <StyledTextField style={{ 'paddingTop': '5px' }} value={quantities[index]} onChange={(e) => changeQuantity(e.target.value, index)} />
                                <div className="">
                            </div> */}
                                <Button onClick={() => removeFromCart(index)} > X </Button>

                            </div>
                        </>
                    )
                })}

            </div>
        </div>
    )
}