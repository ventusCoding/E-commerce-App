import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";

const PaymentScreen = () => {
  const { shippingAdress } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const { saveShippingPayment } = bindActionCreators(actionCreators, dispatch);

  const [paymentMethod, setPaymentMethod] = useState(shippingAdress.paymentMethode || "PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingPayment( paymentMethod );
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              style={{
                marginTop: 20,
              }}
              type="radio"
              label="Stripe"
              id="Stripe"
              checked={paymentMethod === "Stripe"}
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button
          style={{
            marginTop: 20,
          }}
          type="submit"
          variant="primary"
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
