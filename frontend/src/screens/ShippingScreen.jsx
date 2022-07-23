import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";
import { useNavigate } from "react-router-dom";

const ShippingScreen = () => {
  const { shippingAdress } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { saveShippingAddress } = bindActionCreators(actionCreators, dispatch);

  const [address, setAddress] = useState(shippingAdress.address || "");
  const [city, setCity] = useState(shippingAdress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAdress.postalCode || "");
  const [country, setCountry] = useState(shippingAdress.country || "");

  useEffect(() => {}, [shippingAdress]);

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          style={{
            marginTop: 20,
          }}
          controlId="city"
        >
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          style={{
            marginTop: 20,
          }}
          controlId="postalCode"
        >
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          style={{
            marginTop: 20,
          }}
          controlId="country"
        >
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button
          style={{
            marginTop: 20,
          }}
          variant="primary"
          type="submit"
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
