import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import CheckoutSteps from "../components/CheckoutSteps";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";
import { Link, useNavigate } from "react-router-dom";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const {
    loading: loadingOrder,
    error: orderError,
    order,
    success,
  } = useSelector((state) => state.order);

  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { createOrder, resetOrderState } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);

  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  );

  const placeOrderHandler = (order) => {
    createOrder(order, token);
  };

  useEffect(() => {
    if (success && order) {
      navigate(`/order/${order._id}`);
      resetOrderState();
    }
  }),
    [success, order];

  return (
    <React.Fragment>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address : </strong>
                {cart.shippingAdress.address}, {cart.shippingAdress.city}{" "}
                {cart.shippingAdress.postalCode}, {cart.shippingAdress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Methode: </strong>
              {cart.shippingAdress.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message type="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item.id}>
                      <Row>
                        <Col>
                          <Image
                            src={`/img/products/${item.image.url}`}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={"/product/" + item.id + "?redirect=placeorder"}
                          >
                            <strong>{item.name}</strong>
                          </Link>
                        </Col>
                        <Col>
                          <strong>
                            {item.qty} x {item.price} = {item.qty * item.price}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {orderError ? (
                  <Message variant="danger">{orderError}</Message>
                ) : null}
              </ListGroup.Item>

              <ListGroup.Item>
                {loadingOrder ? <Loader /> : null}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={() => {
                    placeOrderHandler({
                      orderItems: cart.cartItems,
                      shippingAdress: cart.shippingAdress,
                      paymentMethod: cart.shippingAdress.paymentMethod,
                      totalPrice: cart.totalPrice,
                      shippingPrice: cart.shippingPrice,
                      taxPrice: cart.taxPrice,
                      itemsPrice: cart.itemsPrice,
                    });
                  }}
                >
                  place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PlaceOrderScreen;
