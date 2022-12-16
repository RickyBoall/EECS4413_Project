import { useState, useEffect } from "react";
import { BasePage, ItemsList } from "../components";

export default function CatalogPage({ cart, setCart }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getItems = async () => {
            fetch('http://springboot-env.eba-xqpdar45.us-east-1.elasticbeanstalk.com/items')
                .then(res => res.json())
                .then(data => {
                // a = data;
                // console.log(data);
                    const itemList = data._embedded.itemList;
                    console.log(itemList);
                    setItems([...itemList]);
                    setLoading(false);
                // console.log(itemList);
                })
                
            // const itemList = a._embedded.itemList;
            // console.log(a);
        }
        getItems();
    }, [])

    return (
        <div  className="h-screen flex flex-col bg-gray-800">
            <BasePage cart={cart} setCart={(e) => setCart(e)}/>
            {loading ?
                <p> LOADING... </p>
            :
                <ItemsList storeItems={items} cart={cart} setCart={(e) => setCart(e)} />
            }
        </div>
    )
}