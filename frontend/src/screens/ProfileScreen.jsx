import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ProfileScreen = () => {
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={() => {}}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              onChange={(e) => {}}
            ></Form.Control>
          </Form.Group>

          <Form.Group style={{ marginTop: 20 }} controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => {}}
            ></Form.Control>
          </Form.Group>

          <Form.Group style={{ marginTop: 20 }} controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"

              onChange={(e) => {}}
            ></Form.Control>
          </Form.Group>

          <Form.Group style={{ marginTop: 20 }} controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"

              onChange={(e) => {}}
            ></Form.Control>
          </Form.Group>

          <Button style={{ marginTop: 20 }} type="submit" variant="primary">
            Update
          </Button>
        </Form>

      </Col>
      <Col md={9}>
        <h2>My Orders</h2>

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
           
          </tbody>
        </Table>

      </Col>
    </Row>
  );
};

export default ProfileScreen;
