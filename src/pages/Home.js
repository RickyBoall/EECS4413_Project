import React from "react";
import { Link } from "react-router-dom";
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
  Carousel,
} from "antd";
import { Container } from "@mui/material";
const { Meta } = Card;

const contentStyle = {
  height: "300px",
  color: "#fff",
  lineHeight: "300px",
  textAlign: "center",
  fontSize: "40px",
  //   background: "#364d79",
  backgroundImage:
    "url(https://images.squarespace-cdn.com/content/v1/5a6a4f5ae45a7c05292b69eb/1518194667931-SQAPLQ8NSEBACNB08QXC/065-ZAS+Bergeron+Centre+York-Edit.jpg?format=1500w)",
};

const contentStyle2 = {
  height: "300px",
  color: "#fff",
  lineHeight: "300px",
  textAlign: "center",
  fontSize: "40px",
  //   background: "#364d79",

  backgroundImage:
    "url(https://sunrisemarketplace.com/wp-content/uploads/2017/09/SMP-books-banner.jpg)",
};

const contentStyle3 = {
  height: "300px",
  color: "#fff",
  lineHeight: "300px",
  textAlign: "center",
  fontSize: "40px",
  //   background: "#364d79",
  backgroundImage:
    "url(https://thumbs.dreamstime.com/b/smartphone-headphones-office-accessories-yellow-background-modern-lifestyle-business-flat-lay-banner-copy-space-176172776.jpg)",
};

export default function Home({ cart, setCart }) {
  return (
    <div className="h-full flex flex-col bg-gray-800">
      <BasePage cart={cart} setCart={(e) => setCart(e)} />
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>Welcome to EECS 4413 Store</h3>
        </div>
        <div>
          <h3 style={contentStyle2}>Buy Books!</h3>
        </div>
        <div>
          <h3 style={contentStyle3}>Buy Electronics!</h3>
        </div>
      </Carousel>

      <Container style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Card>
          <Row>
            <Col span={7} style={{ paddingRight: "50px" }}>
              <Link to="/catalog">
                <Card
                  hoverable
                  style={{
                    width: 240,
                  }}
                  cover={
                    <img
                      alt="harry"
                      style={{
                        width: "auto",
                        height: "300px",
                        overflow: "hidden",
                        alignContent: "center",
                        alignItems: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                        paddingLeft: "7px",
                        paddingRight: "7px",
                        marginTop: "8px",
                      }}
                      src="https://m.media-amazon.com/images/I/51StPSSsneL.jpg"
                    />
                  }
                >
                  <Meta
                    title="Books"
                    description="Harry potter best releases!"
                  />
                </Card>
              </Link>
            </Col>

            <Col span={7} style={{ paddingRight: "50px" }}>
              <Link to="/catalog">
                <Card
                  hoverable
                  style={{
                    width: 240,
                  }}
                  cover={
                    <img
                      alt="harry"
                      style={{
                        width: "auto",
                        height: "300px",
                        overflow: "hidden",
                        alignContent: "center",
                        alignItems: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                        paddingLeft: "7px",
                        paddingRight: "7px",
                        marginTop: "8px",
                      }}
                      src="https://videotron.com/sites/default/files/styles/original_large/public/mobility_product/iPhone%2014%20Pro%20Space%20Black_0.webp?itok=fLIWY65Bg"
                    />
                  }
                >
                  <Meta title="Phones" description="Get the new Iphone14!" />
                </Card>
              </Link>
            </Col>
            <Col span={10}>
              <Card
                style={{
                  height: "404px",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "30px" }}> Check Out Our Store!</p>
                <br />
                <p style={{ fontSize: "16px" }}>
                  {" "}
                  Click on Store catalog to see all items
                </p>
                <p style={{ fontSize: "16px" }}>
                  {" "}
                  Click Cart to view your shopping cart!
                </p>
                <p style={{ fontSize: "16px" }}>
                  {" "}
                  Click Order once you're ready to purchase!
                </p>
              </Card>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}
