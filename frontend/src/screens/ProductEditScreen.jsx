import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../store/actions/index";
import { useNavigate, useLocation } from "react-router-dom";

const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState();
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token, user } = useSelector((state) => state.auth);

  const {
    error: errorUpdate,
    loading: loadingUpdate,
    message: messageUpdate,
  } = useSelector((state) => state.products);

  const { updateProduct } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (user && user.role === "admin") {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(`/api/v1/products/${id}`, config)
        .then(({ data: { data } }) => {
          setName(data.name);
          setPrice(data.price);
          setImage(data.image);
          setBrand(data.brand);
          setCategory(data.category);
          setCountInStock(data.countInStock);
          setDescription(data.description);

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

    const data = {
      _id: id,
      name,
      price,
      brand,
      category,
      description,
      countInStock,
      image,
      imageFile,
    };
    updateProduct(token, id, data);
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {messageUpdate && <Message variant="success">{messageUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : image.isExternal
                    ? image.url
                    : `/img/products/${image.url}`
                }
              />
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                multiple={false}
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
              <Form.Label>
                Count In Stock
                <div style={{ color: "red", display: "inline" }}>*</div>
              </Form.Label>
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
                Category
                <div style={{ color: "red", display: "inline" }}>*</div>
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
                Description
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

            <Button
              style={{ marginTop: "20px" }}
              type="submit"
              variant="primary"
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
