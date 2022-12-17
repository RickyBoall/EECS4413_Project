import React from "react";
import { useState, useEffect } from "react";
import { BasePage } from "../components";
import {
  Card,
  Row,
  Col,
  List,
  Descriptions,
  Form,
  Input,
  Button,
  Divider,
  Table,
} from "antd";
import { Container } from "@mui/material";

// import "../api/apiCalls";
import { getEvents } from "../api/apiCalls";

/** Exports Admin page */
export default function AdminPage({ cart, setCart }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [events, setEvents] = useState([]);
  const [inventoryEvents, setInventoryEvents] = useState([]);
  const [totalRev, setTotalRev] = useState(0);
  /** Runs on window load */
  useEffect(() => {
    console.log(cart);

    /** Fetches data from localstorage */
    let parsed = JSON.parse(localStorage.getItem("user"));
    let username = parsed["username"];

    if (username === "admin") {
      setIsAdmin(true);
      setAllEvents();
    }
  }, []);

  const setAllEvents = async () => {
    let data = await getEvents();
    // console.log(data);

    let tempEvents = []; //used to check inventory events
    let totalRevenue = 0;
    data["_embedded"]["eventList"].map((event) => {
      //events.map basically
      event["key"] = event["id"]; //rename to key
      if (event.hasOwnProperty("id")) {
        delete event["id"];
      }

      if (event["quantityOfItems"] != null) {
        //user bought item
        tempEvents.push(event);
        totalRevenue = totalRevenue + event["totalValueOfItems"];
      } else {
        // if (event.hasOwnProperty("quantityOfItems")) {
        //   delete event["quantityOfItems"];
        // }
        // if (event.hasOwnProperty("totalValueOfItems")) {
        //   delete event["totalValueOfItems"];
        // }
      }
    });

    setInventoryEvents(tempEvents);
    setEvents(data["_embedded"]["eventList"]);

    setTotalRev(totalRevenue);

    console.log(events);
    console.log(inventoryEvents);
    console.log(totalRev);
  };

  //   const getCartItem = (item) => {
  //     (item.shoppingCart.shoppingCartItems).map(cartItem) => {

  //     }
  //   }

  if (isAdmin) {
    return (
      <div className="h-screen flex flex-col bg-gray-800">
        <BasePage cart={cart} setCart={(e) => setCart(e)} />
        {/* <button className="text-white py-10" onClick={() => console.log(cart)}> CONSOLE LOG CART </button> */}
        {/* <ItemsList storeItems={items} cart={cart} setCart={(e) => setCart(e)} /> */}

        <Container style={{ marginTop: "30px" }}>
          <div className="site-card-wrapper" style={{ marginTop: "30px" }}>
            <Card>
              <strong>Total Revenue: ${totalRev}</strong>
            </Card>
            <Table
              style={{ marginTop: "30px" }}
              columns={[
                {
                  title: "Event Description",
                  dataIndex: "description",
                  key: "key",
                },
                {
                  title: "Total Quantity (#)",
                  dataIndex: "quantityOfItems",
                  key: "key",
                },
                {
                  title: "Total Price ($)",
                  dataIndex: "totalValueOfItems",
                  key: "key",
                },
              ]}
              dataSource={inventoryEvents}
              pagination={false}
            />
            <Table
              style={{ marginTop: "30px" }}
              columns={[
                {
                  title: "Event Description",
                  dataIndex: "description",
                  key: "key",
                },
              ]}
              dataSource={events}
              pagination={false}
            />
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="h-screen flex flex-col bg-gray-800">
        <BasePage cart={cart} setCart={(e) => setCart(e)} />
        <Container style={{ marginTop: "30px" }}>
          <div className="site-card-wrapper" style={{ marginTop: "30px" }}>
            <Card>
              <h1>You have no access to admin page</h1>
            </Card>
          </div>
        </Container>
      </div>
    );
  }
}
