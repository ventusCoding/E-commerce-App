import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";

const OrderScreen = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const [loadingDeliver, setLoadingDeliver] = useState(false);

  const {
    loading,
    error,
    order,
    success,
    orderPayState: {
      loading: loadingPay,
      success: successPay,
      error: errorPay,
      orderPay,
    },
  } = useSelector((state) => state.order);

  const navigate = useNavigate();
  const { id } = useParams();

  const { token, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { getOrder, updateOrderToPay } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const markAsDelivered = () => {
    setLoadingDeliver(true);

    axios
      .patch(
        `/api/v1/orders/${order._id}/deliver`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoadingDeliver(false);
        getOrder(id, token);
        navigate(`/order/${order._id}`);
      })
      .catch((err) => {
        setLoadingDeliver(false);
      });
  };

  useEffect(() => {
    getOrder(id, token);
    console.log(order);

    const addPayPalScript = async () => {
      const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      getOrder(id, token);
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [successPay, id]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    updateOrderToPay(id, paymentResult, token);
  };

  return loading || Object.keys(order).length === 0 ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <React.Fragment>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address : </strong>
                {order.shippingAdress.address}, {order.shippingAdress.city}{" "}
                {order.shippingAdress.postalCode},{" "}
                {order.shippingAdress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Methode: </strong>
                {order.shippingAdress.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message type="info">Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
                    <ListGroup.Item
                      key={item.id + item.name + item.price + item.qty}
                    >
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      currency="USD"
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {user &&
                user.role === "admin" &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={markAsDelivered}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default OrderScreen;
