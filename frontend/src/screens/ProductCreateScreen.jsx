import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../store/actions/index";
import { useNavigate, useLocation } from "react-router-dom";

const ProductCreateScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const { token, user } = useSelector((state) => state.auth);

  const { error, loading, message, success } = useSelector(
    (state) => state.products
  );

  const { createProduct } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/login");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      name,
      price,
      brand,
      category,
      description,
      countInStock,
    };

    createProduct(token, data);
  };

  useEffect(() => {
    if (success === true) {
      navigate("/admin/productlist");
    }
  }, [success]);

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Product</h1>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="success">{message}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>
              Name <div style={{ color: "red", display: "inline" }}>*</div>
            </Form.Label>

            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>
              Price <div style={{ color: "red", display: "inline" }}>*</div>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image.url}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <img
              style={{ margin: "10px 0" }}
              width={150}
              src={`/img/products/${image.url}`}
              alt={'No image'}
            />
            {/* <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />} */}
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>
              Brand <div style={{ color: "red", display: "inline" }}>*</div>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>
              Category <div style={{ color: "red", display: "inline" }}>*</div>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>
              Description{" "}
              <div style={{ color: "red", display: "inline" }}>*</div>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button style={{ marginTop: "20px" }} type="submit" variant="primary">
            Create Product
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductCreateScreen;
