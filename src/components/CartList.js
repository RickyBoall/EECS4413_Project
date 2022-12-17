import { useState, useEffect } from "react";
import { Button, TextField, styled, Modal, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel } from "@mui/material";
import { List, Avatar, Card } from 'antd';


export default function CartList({ cart, setCart }) {
    const [userCart, setUserCart] = useState(cart);

    const removeFromCart = async (index) => {
        let tempCart = [];
        let removedItem = {};
        userCart.map((item, cartIndex) => {
            if (index != cartIndex) {
                tempCart.push(item);
            } else {
                removedItem = item
            }
        })
        // console.log(removedItem)

        let localCart = JSON.parse(window.localStorage.getItem('user')).shoppingCart;
        let cartId = localCart.id;
        let userId = JSON.parse(window.localStorage.getItem('user')).id;
        // console.log(cartId)
        localCart.shoppingCartItems.map((cartItem) => {
            if(cartItem.itemId === removedItem.id) {
                fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/shopping-cart-items/' +  cartItem.id, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(res => res.json())
                    .then(data2 => {
                        fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/users/' + userId).then(res => res.json())
                        .then(user => {
                            console.log(user);
                            localStorage.setItem('user', JSON.stringify(user));
                        })
                }).catch(e => {
                    fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/users/' + userId).then(res => res.json())
                        .then(user => {
                            console.log(user);
                            localStorage.setItem('user', JSON.stringify(user));
                        })
                })
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
        <div className="flex items-center justify-center py-12">
            <Card  title="Cart" style={{ minWidth: '30vw'}}>
                <List
                    dataSource={cart}
                    renderItem={(item, index) => (
                        <List.Item key={index}>
                        <List.Item.Meta
                            avatar={<Avatar src={"https://cdn-icons-png.flaticon.com/512/1718/1718406.png"} />}
                            title={<p> {item.name} </p>}
                            description={<p>Qty: {item.cartQuantity} <em className="absolute right-0 mr-32"> ${item.price} </em> </p>}
                        />
                            <Button onClick={() => removeFromCart(index)} > X </Button>
                        </List.Item>
                    )}
                    />
            </Card>
        </div>
    )
}