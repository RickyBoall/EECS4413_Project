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
} from "antd";
import { Container } from "@mui/material";

// import "../api/apiCalls";
import { testItemCall, createOrder } from "../api/apiCalls";

export default function PreviousOrderPage({ cart, setCart }) {
  // const [items, setItems] = useState(storeItems);
  // const [quantities, setQuantities] = useState([]);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState({});
  // const originalItemsArr = storeItems;
  //   const [totalPrice, setTotalPrice] = useState(0);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    // let tempArr = [];
    // let itemsArr = [];
    // storeItems.map((item) => {
    //     if (item['cartQuantity'] === undefined) {
    //         tempArr.push(0);
    //     } else {
    //         tempArr.push(item['cartQuantity']);
    //     }
    // })
    console.log(cart);
    // console.log(tempArr);
    // setQuantities(tempArr);
    let parsed = JSON.parse(localStorage.getItem("user"));
    let orders = parsed["orders"];
    setAllOrders(orders);
  }, []);

  //   const setTotalPrices = () => {
  //     let sum = 0;

  //     cart.map((item) => {
  //       sum += Math.round(item.price * item.cartQuantity * 100) / 100;
  //     });

  //     setTotalPrice(sum);
  //   };

  //   const onFinish = async (data) => {
  //     //SEND DATA TO BACKEND FROM HERE
  //     // console.log(data);
  //     // console.log();
  //     let userID = JSON.parse(localStorage.getItem("user"))["id"];
  //     let responseData = await createOrder(data, 9);

  //     if (responseData != null) {
  //       try {
  //         // console.log(JSON.parse(responseData));
  //         alert("Order Success! Order ID:" + responseData["id"]);
  //       } catch (error) {
  //         console.log("Order failed");
  //       }
  //     }
  //   };

  //   const getCartItem = (item) => {
  //     (item.shoppingCart.shoppingCartItems).map(cartItem) => {

  //     }
  //   }

  return (
    <div className="h-screen flex flex-col bg-gray-800">
      <BasePage cart={cart} setCart={(e) => setCart(e)} />
      {/* <button className="text-white py-10" onClick={() => console.log(cart)}> CONSOLE LOG CART </button> */}
      {/* <ItemsList storeItems={items} cart={cart} setCart={(e) => setCart(e)} /> */}

      <Container style={{ marginTop: "30px" }}>
        <div className="site-card-wrapper" style={{ marginTop: "30px" }}>
          <Row gutter={24}>
            <Col span={24}>
              <Card title="Past Orders">
                <List
                  style={{ whiteSpace: "pre-wrap" }}
                  itemLayout="horizontal"
                  dataSource={allOrders}
                  renderItem={(item) => (
                    <List.Item>
                      {console.log(item)}
                      {/* <List.Item.Meta
                        title={<a href="/catalog">{item.name}</a>}
                        description="asdas <br/> \n  asds"
                      /> */}
                      <p>
                        <strong>Ordered Date:</strong> {item.date}
                      </p>
                      <Card style={{ width: "100%" }}>
                        <Col>
                          {item.shoppingCart.shoppingCartItems.map(
                            (cartItem) => {
                              return (
                                <Row>
                                  <p>
                                    {" "}
                                    <strong>
                                      Item ID: {cartItem.id}{" "}
                                    </strong>{" "}
                                  </p>

                                  <p>
                                    {" "}
                                    <strong>
                                      Quantity: {cartItem.quantity}{" "}
                                    </strong>{" "}
                                  </p>
                                  <p>
                                    {" "}
                                    <strong>
                                      Total Price: $
                                      {Math.round(
                                        cartItem.quantity * cartItem.price * 100
                                      ) / 100}
                                    </strong>
                                  </p>

                                  <Divider />
                                </Row>
                              );
                            }
                          )}
                        </Col>
                      </Card>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
