import React from "react";
import { useState, useEffect } from "react";
import { BasePage } from "../components";
import { Card, Row, Col, List, Descriptions, Form, Input, Button } from "antd";
import { Container } from "@mui/material";

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
    setTotalPrices();
    // console.log(tempArr);
    // setQuantities(tempArr);
  }, []);

  const setTotalPrices = () => {
    let sum = 0;

    cart.map((item) => {
      sum += item.price * item.cartQuantity;
    });

    setTotalPrice(sum);
  };

  const onFinish = (data) => {
    //SEND DATA TO BACKEND FROM HERE
    console.log(data);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-800">
      <BasePage cart={cart} setCart={(e) => setCart(e)} />
      {/* <button className="text-white py-10" onClick={() => console.log(cart)}> CONSOLE LOG CART </button> */}
      {/* <ItemsList storeItems={items} cart={cart} setCart={(e) => setCart(e)} /> */}

      <Container style={{ marginTop: "30px" }}>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Total">
                <p>
                  <strong>Price:</strong> {totalPrice}$
                </p>
              </Card>

              <Card
                style={{ marginTop: "30px" }}
                title="Billing Address"
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
                    <Input />
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
                    <Input />
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
                    <Input />
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
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="phone number"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input />
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
                          {item.cartQuantity * item.price}
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
