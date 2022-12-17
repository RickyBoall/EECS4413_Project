import React from "react";
import { Link } from "react-router-dom";
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

export default function OrderPage({ cart, setCart }) {
  // const [items, setItems] = useState(storeItems);
  // const [quantities, setQuantities] = useState([]);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState({});
  // const originalItemsArr = storeItems;
  const [totalPrice, setTotalPrice] = useState(0);

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
    // console.log(JSON.parse(localStorage.getItem("user"))["id"]);
    setTotalPrices();
    // console.log(tempArr);
    // setQuantities(tempArr);
  }, []);

  const setTotalPrices = () => {
    let sum = 0;

    cart.map((item) => {
      sum += Math.round(item.price * item.cartQuantity * 100) / 100;
    });

    setTotalPrice(sum);
  };

  const onFinish = async (data) => {
    //SEND DATA TO BACKEND FROM HERE
    // console.log(data);
    // console.log();
    let userID = JSON.parse(localStorage.getItem("user"))["id"];
    let responseData = await createOrder(data, userID);

    if (responseData != null) {
      try {
        // console.log(JSON.parse(responseData));
        alert("Order Success! Order ID:" + responseData["id"]);
        window.location.reload();
      } catch (error) {
        console.log("Order failed");
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-800">
      <BasePage cart={cart} setCart={(e) => setCart(e)} />
      {/* <button className="text-white py-10" onClick={() => console.log(cart)}> CONSOLE LOG CART </button> */}
      {/* <ItemsList storeItems={items} cart={cart} setCart={(e) => setCart(e)} /> */}

      <Container style={{ marginTop: "30px", paddingBottom: "40px" }}>
        <Link to="/allorders">
          <Button style={{ color: "white" }}>View Past Orders</Button>
        </Link>

        <div className="site-card-wrapper" style={{ marginTop: "30px" }}>
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Total">
                <p>
                  <strong>Price:</strong> {totalPrice}$
                </p>
              </Card>

              <Card
                style={{ marginTop: "30px" }}
                title="Billing Information"
                bordered={false}
              >
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  //onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Street"
                    name="street"
                    rules={[
                      {
                        required: true,
                        message: "Please input your street!",
                      },
                    ]}
                  >
                    <Input placeholder="40 Pond Street" />
                  </Form.Item>

                  <Form.Item
                    label="Province"
                    name="province"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Province!",
                      },
                    ]}
                  >
                    <Input placeholder="Ontario" />
                  </Form.Item>

                  <Form.Item
                    label="Country"
                    name="country"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Country!",
                      },
                    ]}
                  >
                    <Input placeholder="Canada" />
                  </Form.Item>

                  <Form.Item
                    label="Postal Zipcode"
                    name="zip"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Postal Zipcode!",
                      },
                    ]}
                  >
                    <Input placeholder="M3J1P3" />
                  </Form.Item>

                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input placeholder="4169998888" />
                  </Form.Item>

                  <Divider />

                  {/* CC Info: */}
                  <Form.Item
                    label="Credit Card"
                    name="creditCard"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Credit Card!",
                      },
                    ]}
                  >
                    <Input placeholder="input credit card #" />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="danger" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col span={12}>
              <Card title="Order Details" bordered={false}>
                <List
                  style={{ whiteSpace: "pre-wrap" }}
                  itemLayout="horizontal"
                  dataSource={cart}
                  renderItem={(item) => (
                    <List.Item>
                      {/* <List.Item.Meta
                        title={<a href="/catalog">{item.name}</a>}
                        description="asdas <br/> \n  asds"
                      /> */}
                      <Descriptions title={item.name}>
                        <Descriptions.Item label="Quantity">
                          {item.cartQuantity}
                        </Descriptions.Item>
                        <Descriptions.Item label="Price">
                          {Math.round(item.cartQuantity * item.price * 100) /
                            100}
                        </Descriptions.Item>
                      </Descriptions>
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
