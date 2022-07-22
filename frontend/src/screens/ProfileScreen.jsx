import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";
import { useForm } from "react-hook-form";

const ProfileScreen = () => {
  const {
    loading: authLoading,
    error: authError,
    userId,
    user,
    message: authMessage,
    token,
  } = useSelector((state) => state.auth);

  const orderState = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const { updateUser, fetchUserData } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const { register: updateUserRegister, handleSubmit: updateUserHandleSubmit } =
    useForm();

  useEffect(() => {
    fetchUserData(userId, token);
  }, [userId]);

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {authMessage && <Message variant="success">{authMessage}</Message>}
        {authError && <Message variant="danger">{authError}</Message>}
        {authLoading ? (
          <Loader />
        ) : (
          <Form
            onSubmit={updateUserHandleSubmit((data) => updateUser(data, token))}
          >
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                {...updateUserRegister("name")}
                placeholder="Enter name"
                defaultValue={user && user.name}
              ></Form.Control>
            </Form.Group>

            <Form.Group style={{ marginTop: 20 }} controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                {...updateUserRegister("email")}
                defaultValue={user && user.email}
                placeholder="Enter email"
              ></Form.Control>
            </Form.Group>

            <Form.Group style={{ marginTop: 20 }} controlId="password">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                {...updateUserRegister("passwordCurrent")}
                placeholder="Current password"
              ></Form.Control>
            </Form.Group>

            <Form.Group style={{ marginTop: 20 }} controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...updateUserRegister("password")}
                placeholder="Enter password"
              ></Form.Control>
            </Form.Group>

            <Form.Group style={{ marginTop: 20 }} controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                {...updateUserRegister("passwordConfirm")}
                placeholder="Confirm password"
              ></Form.Control>
            </Form.Group>

            <Button style={{ marginTop: 20 }} type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {/* {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : ( */}
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))} */}
          </tbody>
        </Table>
        {/* )} */}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
