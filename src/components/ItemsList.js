import { useState, useEffect } from "react";
import { Button, TextField, styled, Modal, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel } from "@mui/material";

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
    // console.log(storeItems)
    const [items, setItems] = useState(storeItems);
    const [quantities, setQuantities] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const originalItemsArr = storeItems;

    useEffect(() => {
        let tempArr = [];
        let itemsArr = [];
        storeItems.map((item) => {
            if (item['cartQuantity'] === undefined) {
                tempArr.push(0);
            } else {
                tempArr.push(item['cartQuantity']);
            }
        })
        // console.log(tempArr);
        setQuantities(tempArr);
    }, [])

    const addToCart = (item, index) => {
        let cartArr = [];
        let inArr = false;
        let error = false;
        if (quantities[index] > item.quantity) {
            alert('Error: Current quantity selected is above the amount available. Please check your cart and try again.');
            return
        }
        cart.map((cartItem) => {
            if(cartItem.name === item.name) {
                if (cartItem['cartQuantity'] + quantities[index] > item.quantity) {
                    alert('Error: Current quantity selected is above the amount available. Please check your cart and try again.');
                    error = true
                    return
                }
                cartItem['cartQuantity'] += quantities[index];
                cartArr.push(cartItem);
                inArr = true;
            } else {
                cartArr.push(cartItem);
            }
        })
        if (error === false) {
            if (inArr === false) {
                item['cartQuantity'] = quantities[index];
                setCart([...cartArr, item]);
            } else {
                setCart([...cartArr]);
            }
        }
    }

    const changeQuantity = (quantity, index) => {
        let tempArr = quantities;
        if (quantity === ""){
            quantity = 0;
        }
        tempArr[index] = parseInt(quantity);
        // console.log(quantity)
        setQuantities([...tempArr]);
    }

    const compareStrings = (a, b) => {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }

    const sortItemTypes = () => {
        let newArr = items;
        newArr.sort(function(a, b) {
            return compareStrings(a.type, b.type);
        })
        setItems([...newArr])
    }

    return (
        <div className="flex grid grid-cols-8">
            <div className="flex col-span-1 justify-end py-10">
                <div className="justify-center py-3">
                    <FormControl>
                        <FormLabel> <p className="text-white border-b-4 border-black">Filters</p> </FormLabel>
                        <RadioGroup>
                            <FormControlLabel value="all" control={<Radio onClick={() => setItems([...originalItemsArr])} />} label={<p className="text-white"> All </p>} />
                            <FormControlLabel value="types" control={<Radio onClick={() => sortItemTypes()} />} label={<p className="text-white"> Types </p>} />
                            {/* <FormControlLabel value="Brand?" /> */}
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className="flex col-span-7">
                <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                    <div className="flex bg-gray-400/80 items-center justify-center w-[50vw] h-[30vh] mx-auto my-48">
                    <p> PUT ITEM INFO HERE: {selectedItem.name} </p>
                    </div>
                </Modal>
                <div className="flex grid grid-cols-8 py-10 text-zinc-300">
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
                        <p> Quantity Available </p> 
                    </div>
                    <div className="col-span-2 border-b-4 border-black">
                        <p className="ml-3"> Quantity </p>
                    </div>
                    {items.map((item, index) => {
                        // console.log(item)
                        return (
                            <>
                                <div className="col-start-2 col-span-1 py-4">
                                    <button onClick={() => {setSelectedItem(item); setModalOpen(true)}}> {item.name} </button> 
                                </div>
                                <div className="col-start-3 col-span-1 py-4">
                                    <p> {item.type} </p> 
                                </div>
                                <div className="col-start-4 col-span-1 py-4">
                                    <p> {item.price} </p> 
                                </div>
                                <div className="col-start-5 col-span-1 py-4">
                                    <p> {item.quantity} </p>
                                </div>
                                <div className="flex col-span-2">
                                    <StyledTextField style={{ 'paddingTop': '5px' }} value={quantities[index]} onChange={(e) => changeQuantity(e.target.value, index)} />
                                    <div className="">
                                        <Button onClick={() => addToCart(item, index)} > Add to Cart</Button>
                                    </div>

                                </div>
                            </>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}