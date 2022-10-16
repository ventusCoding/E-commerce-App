import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../store/actions/index";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ProductScreen = () => {
  const [quantity, setQuantity] = useState(1);

  const [loadingProductReview, setLoadingProductReview] = useState(false);
  const [errorProductReview, setErrorProductReview] = useState("");
  const [successProductReview, setSuccessProductReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const {
    product,
    error: productError,
    loading: productLoading,
  } = useSelector((state) => state.products);

  const { user, token } = useSelector((state) => state.auth);

  console.log(product);

  const { fetchProductDetail } = bindActionCreators(actionCreators, dispatch);

  const {
    cartItems,
    error: cartError,
    loading: cartLoading,
  } = useSelector((state) => state.cart);

  const { addCart, removeCart } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    fetchProductDetail(id);
  }, [product._id]);

  const addToCartHandler = () => {
    addCart(id, quantity);
    // navigate(`/cart/${id}?qty=${quantity}`);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();

    setLoadingProductReview(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const productId = product._id;

    console.log("productId" + productId);

    axios
      .post(
        `/api/v1/reviews/`,
        { rating, review: comment, product: productId },
        config
      )
      .then(({ data: { data } }) => {
        setRating(0);
        setComment("");
        setSuccessProductReview(true);
        setLoadingProductReview(false);
        setErrorProductReview("");
        fetchProductDetail(id);
      })
      .catch((error) => {
        console.log(error);
        setErrorProductReview(error.response.data.message);
        setLoadingProductReview(false);
        setSuccessProductReview(false);
      });
  };

  return (
    <React.Fragment>
      {productLoading || Object.keys(product).length === 0 ? (
        <Loader />
      ) : productError ? (
        <Message variant="danger">{productError}</Message>
      ) : (
        <React.Fragment>
          <Link
            className="btn btn-light my-3"
            to={location.search ? `/${location.search.split("=")[1]}` : "/"}
          >
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image
                src={`/img/products/${product.image.url}`}
                alt={product.name}
                fluid
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.ratingsAverage}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price: {product.price}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price :</Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status :</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity :</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      style={{
                        width: "100%",
                      }}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0 || cartLoading}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.user.name}</strong>
                    <Rating value={review.rating} text="stars" />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.review}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant="success">
                      Review submitted successfully
                    </Message>
                  )}
                  {/* {loadingProductReview && <Loader />} */}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {user ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      {loadingProductReview ? (
                        <Loader />
                      ) : (
                        <Button
                          disabled={loadingProductReview}
                          type="submit"
                          variant="primary"
                        >
                          Submit
                        </Button>
                      )}
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductScreen;
