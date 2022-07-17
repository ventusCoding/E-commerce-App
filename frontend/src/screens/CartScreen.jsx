import React from "react";
import { Button, Col, Form, ListGroup, Row, Image } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../store/actions/index";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const CartScreen = () => {
  const dispatch = useDispatch();

  const { cartItems, error, loading } = useSelector((state) => state.cart);

  const { removeCart, updateCartQty } = bindActionCreators(
    actionCreators,
    dispatch
  );

  return (
    <Row>
      <Col style={{ width: "100%" }} md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={`/img/products/${
                        item.image
                      }`}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={3}>
                    <Form.Select
                      value={item.qty}
                      onChange={(e) => {
                        updateCartQty(item, e.target.value);
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeCart(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={2}></Col>

      <Col md={2}></Col>
    </Row>
  );
};

export default CartScreen;
