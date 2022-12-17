import { useState, useEffect } from "react";
import { Button, TextField, styled, Modal, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel } from "@mui/material";
import { Card, List, Rate } from 'antd';
import 'antd/dist/reset.css';
import ViewReviews from "./ViewReviews";

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
    const [modalOpenReviews, setModalOpenReviews] = useState(false);
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
        let inCartItem = {};
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
                inCartItem = cartItem;
                inArr = true;
            } else {
                cartArr.push(cartItem);
            }
        })
        if (error === false) {
            if (inArr === false) {
                item['cartQuantity'] = quantities[index];
                setCart([...cartArr, item]);
                saveToCart(item);

            } else {
                // console.log(inCartItem);
                updateCart(inCartItem);
                setCart([...cartArr]);
            }
        }
    }

    const clearCart = async () => {
        let localCart = JSON.parse(window.localStorage.getItem('user')).shoppingCart;
        let cartId = localCart.id;
        console.log(cartId)
        fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/shopping-carts/' + cartId, {
                    method: "POST"
                })
                    .then(res => res.json())
                    .then(data2 => { 
                    })
    }

    const updateCart = async (item) => {
        console.log(JSON.parse(window.localStorage.getItem('user')).shoppingCart.id);
        console.log(item)
        let localCart = JSON.parse(window.localStorage.getItem('user')).shoppingCart;
        let cartId = localCart.id;
        let userId = JSON.parse(window.localStorage.getItem('user')).id;
        let data = {
            quantity: item.cartQuantity
        };

        localCart.shoppingCartItems.map((cartItem) => {
            if(cartItem.itemId === item.id) {
                fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/shopping-cart-items/' + cartItem.id, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(data2 => {
                        // console.log(data2);
                        fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/users/' + userId).then(res => res.json())
                        .then(user => {
                            console.log(user);
                            localStorage.setItem('user', JSON.stringify(user));
                        })
                })
            }
        })
    }

    const saveToCart = async (item) => {
        console.log(JSON.parse(window.localStorage.getItem('user')).shoppingCart.id);
        console.log(item)
        let localCart = JSON.parse(window.localStorage.getItem('user')).shoppingCart;
        let cartId = localCart.id;
        let userId = JSON.parse(window.localStorage.getItem('user')).id;
        let data = {
            quantity: item.cartQuantity
        };
        fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/shopping-cart-items/' + cartId + "/" + item.id, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data2 => {
            // a = data;
            // console.log(data);
                // const itemList = data;
                console.log(data2);
                fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/users/' + userId).then(res => res.json())
                .then(user => {
                    console.log(user);
                    localStorage.setItem('user', JSON.stringify(user));
                })
                // setItems([...itemList]);
                // setLoading(false);
            // console.log(itemList);
        })
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

    const handleSubmitType = async (e) => {
        e.preventDefault();
        // console.log(e.typee);
        var type = document.getElementById("type").value;
        // console.log(nameValue);
        fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/items/type/'+type)
            .then(res => res.json())
            .then(data => {
            // a = data;
            // console.log(data);
            var itemList = [];
            // console.log(data._embedded == null)
            if (data._embedded != null) {
                itemList = data._embedded.itemList;
                console.log(itemList);
            } 
            // console.log(itemList == null);
            // console.log(itemList);
            setItems(itemList);
            // // console.log(itemList);
            // })
            // console.log("hi");
        })
            
        // const itemList = a._embedded.itemList;
        // console.log(a);
    }

    const handleSubmitBrand = async (e) => {
        e.preventDefault();
        var brand = document.getElementById("brand").value;
        let tempItems = items;
        let filterItems = [];
        tempItems.map((item) => {
            if(item.brand === brand){
                filterItems.push(item);
            }
        })
        setItems(filterItems);
        // fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/items/brand/'+brand)
        //     .then(res => res.json())
        //     .then(data => {
        //     // a = data;
        //     // console.log(data);
        //     var itemList = [];
        //     console.log(data._embedded == null)
        //     if (data._embedded != null) {
        //         itemList = data._embedded.itemList;
        //         console.log(itemList);
        //     } 
        //     setItems(itemList);
        // })
            // console.log(itemList == null);
            // console.log(itemList);
            
        // const itemList = a._embedded.itemList;
        // console.log(a);
    }

    const calculateRating = (item) => {
        let rating = 0;
        item.reviews.map((review) => {
            rating += review.rating
        })
        rating = rating / item.reviews.length
        return rating
    }

    return (
        <div className="flex grid grid-cols-8">
            <div className="flex col-span-1 justify-end py-10 -mx-10">
                <div className="justify-center py-3">
                    <FormControl>
                        <FormLabel> <p className="text-white border-b-4 border-black">Filters</p> </FormLabel>
                        <RadioGroup>
                            <FormControlLabel value="all" control={<Radio onClick={() => setItems([...originalItemsArr])} />} label={<p className="text-white"> All </p>} />
                            <FormControlLabel value="types" control={<Radio onClick={() => sortItemTypes()} />} label={<p className="text-white"> Types </p>} />
                            {/* <FormControlLabel value="Brand?" /> */}
                        </RadioGroup>
                    </FormControl>
                    <br/>
                    {/* <label style={{color:"red"}} htmlFor="type">Type:</label>
                    <form onSubmit={handleSubmitType}>
                        <input type="text" id="type" />
                    </form> */}
                    <label style={{color:"white"}} htmlFor="brand">Brand:</label>
                    <form onSubmit={handleSubmitBrand}>
                        <input type="text" id="brand" />
                    </form>
                </div>
                {/* <button onClick={() => clearCart()}> clear cart </button> */}
            </div>
            <div className="flex col-span-7">
                <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                    <div className="flex bg-gray-400/95 items-center justify-center w-[50vw] h-[30vh] mx-auto my-48">
                        <p className="text-3xl"> {selectedItem.name} </p>
                    </div>
                </Modal>
                <Modal open={modalOpenReviews} onClose={() => setModalOpenReviews(false)}>
                    <ViewReviews item={selectedItem} />
                </Modal>
                <div className="flex grid grid-cols-8 py-10 text-zinc-300">
                    <div className="flex col-start-2 col-span-7 overflow-hidden">
                        <List
                            grid={{ gutter: 16, column: 3 }}
                            dataSource={items}
                            renderItem={(item, index) => {
                                // console.log(item) 
                                return (
                                    <List.Item>
                                        <Card title={<><p className="font-bold -mb-1"> <button onClick={() => {setSelectedItem(item); setModalOpen(true)}}> {item.name} </button></p>  <em className="absolute right-0 mr-4 -mt-2"> ({item.brand}) </em> </>} bordered={false} style={{ width: 300, Left: '2px' }}>
                                        <div className="flex grid grid-cols-4">
                                            <div className="flex col-span-1">
                                                <div className="flex grid grid-cols-1">
                                                    <img src="https://cdn-icons-png.flaticon.com/512/1718/1718406.png" style={{ minHeight: "92px", minWidth: "92px" }}/>
                                                    {/* <p> {item.type} </p> */}
                                                </div>
                                            </div>
                                            <div className="flex col-start-3">
                                                <div className="flex grid grid-cols-1">
                                                    <p> Qty: {item.quantity} </p>
                                                    <p className="flex -mb-1"> <button onClick={() => {setSelectedItem(item);setModalOpenReviews(true)}}> Reviews({item.reviews.length}) </button> </p>
                                                    <Rate style={{ "display": 'flex', "paddingBottom": '10px' }} disabled value={calculateRating(item)} />
                                                </div>
                                            </div>
                                            <div className="flex col-start-4">
                                                <p> ${item.price} </p>
                                            </div>
                                        </div>
                                        <div className="flex col-span-2">
                                            <TextField value={quantities[index]} onChange={(e) => changeQuantity(e.target.value, index)} />
                                            <div className="">
                                                <Button onClick={() => addToCart(item, index)} > Add to Cart</Button>
                                            </div>

                                        </div>
                                        </Card>
                                    </List.Item>
                                )

                            }}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}