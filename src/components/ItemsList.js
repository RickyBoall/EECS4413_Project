import { useState, useEffect } from "react";
import { Button, TextField, styled } from "@mui/material";

const StyledTextField = styled(TextField) ({
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& input': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    }
})

export default function ItemsList({ storeItems, cart, setCart }) {
    const [items, setItems] = useState(storeItems)
    const [quantities, setQuantities] = useState([])
    useEffect(() => {
        let tempArr = [];
        storeItems.map((item) => {
            tempArr.push(0);
        })
        setQuantities(tempArr);
    }, [])

    const addToCart = (item, index) => {
        item['cartQuantity'] = quantities[index]
        setCart([...cart, item])
    }

    const changeQuantity = (quantity, index) => {
        let tempArr = quantities;
        if (quantity === ""){
            quantity = 0;
        }
        tempArr[index] = parseInt(quantity);
        console.log(quantity)
        setQuantities([...tempArr]);
    }

    return (
        <div className="flex grid grid-cols-8 py-10  text-zinc-300">
            <div className="col-start-2 col-span-2 border-b-4 border-black">
                <p> Name </p> 
            </div>
            <div className="col-start-4 col-span-1 border-b-4 border-black">
                <p> Price </p> 
            </div>
            <div className="col-start-5 col-span-1 border-b-4 border-black">
                <p> Available </p> 
            </div>
            <div className="col-span-2 border-b-4 border-black">
                <p> Quantity </p>
            </div>
            
            {storeItems.map((item, index) => {
                return (
                    <>
                        <div className="col-start-2 col-span-2 py-4">
                            <p> {item.name} </p> 
                        </div>
                        <div className="col-start-4 col-span-1 py-4">
                            <p> {item.price} </p> 
                        </div>
                        <div className="col-start-5 col-span-1 py-4">
                            {item.available ?
                                <p> ✓ </p>
                            :
                                <p> X </p>
                            }
                        </div>
                        <div className="flex col-span-2">
                            <StyledTextField value={quantities[index]} onChange={(e) => changeQuantity(e.target.value, index)} />
                            <div className="">
                                <Button onClick={() => addToCart(item, index)} > Add to Cart</Button>
                            </div>

                        </div>
                        {/* <button onClick={() => console.log(cart)}> asdkjsa</button> */}
                    </>
                )
            })}

        </div>
    )
}