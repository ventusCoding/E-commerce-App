import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserEditScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [error, setError] = useState(null);
  const [errorUpdate, setErrorUpdate] = useState(null);

  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const { token,user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.role === "admin") {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(`/api/v1/users/${id}`, config)
        .then(({ data: { data } }) => {
          setName(data.name);
          setEmail(data.email);
          setIsAdmin(data.role === "admin");

          setLoading(false);
        })
        .catch((error) => {
          setError(error.response.data.message);

          setLoading(false);
        });
    } else {
      navigate("/login");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    setLoadingUpdate(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .patch(
        `/api/v1/users/updateUserByAdmin/${id}`,
        {
          name,
          email,
          role: isAdmin ? "admin" : "user",
        },
        config
      )
      .then(({ data: { data } }) => {
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.role === "admin");

        setMessage("User updated successfully");

        setLoadingUpdate(false);
      })
      .catch((error) => {
        setErrorUpdate(error.response.data.message);

        setLoadingUpdate(false);
      });
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {message && <Message variant="success">{message}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
