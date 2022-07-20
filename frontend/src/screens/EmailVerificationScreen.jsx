import React, { useEffect } from "react";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";
import Message from "../components/Message";
import { useNavigate, useParams } from "react-router-dom";

const EmailVerificationScreen = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { error, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { emailVerification, resetAuthState } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    emailVerification(token);
  }, []);

  useEffect(() => {
    if (error || message) {
      setTimeout(() => {
        resetAuthState();
        navigate("/");
      }, 2000);
    }
  }, [error, message]);

  return error ? (
    <Message variant="danger">{error}</Message>
  ) : message ? (
    <Message variant="success">{message}</Message>
  ) : (
    <Loader />
  );

  // <React.Fragment>
  //   {loading && <Loader />}
  //   {error && <Message variant="danger">{error}</Message>}
  //   {message && <Message variant="success">{message}</Message>}
  // </React.Fragment>
};

export default EmailVerificationScreen;
