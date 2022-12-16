import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { BasePage, ItemsList } from "../components";

export default function CatalogPage({ cart, setCart }) {

    const [items, setItems] = useState([
        // {
        //     "id": 4,
        //     "name": "Blackberry",
        //     "available": true,
        //     "price": 6.69 
        // },
        // {
        //     "id": 5,
        //     "name": "Blueberry",
        //     "available": false,
        //     "price": 7.69 
        // },
        // {
        //     "id": 6,
        //     "name": "Strawberry",
        //     "available": true,
        //     "price": 8.69 
        // },
    ])

    useEffect(() => {
        fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/items')
            .then(res => res.json())
            .then(data => {
            // a = data;
            // console.log(data);
            const itemList = data._embedded.itemList;
            // console.log(itemList);
            setItems(itemList);
            // console.log(itemList);
            })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/items')
            .then(res => res.json())
            .then(data => {
            // a = data;
            // console.log(data);
            const itemList = data._embedded.itemList;
            console.log(itemList);
            setItems(itemList);
            // console.log(itemList);
            })
            
        // const itemList = a._embedded.itemList;
        // console.log(a);
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
        fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/items/brand/'+brand)
            .then(res => res.json())
            .then(data => {
            // a = data;
            // console.log(data);
            var itemList = [];
            console.log(data._embedded == null)
            if (data._embedded != null) {
                itemList = data._embedded.itemList;
                console.log(itemList);
            } 
            setItems(itemList);
        })
            // console.log(itemList == null);
            // console.log(itemList);
            
        // const itemList = a._embedded.itemList;
        // console.log(a);
    }
    

    return (
        <div  className="h-screen flex flex-col bg-gray-800">
            <BasePage cart={cart} setCart={(e) => setCart(e)}/>
            <Button onClick={ handleSubmit }> All </Button>
            <label style={{color:"red"}} htmlFor="type">Type:</label>
            <form onSubmit={handleSubmitType}>
                <input 
                    type="text"
                    id="type"
                />
            </form>
            <label style={{color:"red"}} htmlFor="brand">Brand:</label>
            <form onSubmit={handleSubmitBrand}>
            <input 
                type="text"
                id="brand"
            />
            </form>
            <ItemsList storeItems={items} cart={cart} setCart={(e) => setCart(e)} />
        </div>
    )
}