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
import { useNavigate } from "react-router-dom";

const ProductScreen = () => {
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    product,
    error: productError,
    loading: productLoading,
  } = useSelector((state) => state.products);

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

  return (
    <React.Fragment>
      {productLoading ? (
        <Loader />
      ) : productError ? (
        <Message variant="danger">{productError}</Message>
      ) : (
        <React.Fragment>
          <Link className="btn btn-light my-3" to={"/"}>
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image
                src={`/img/products/${
                  product.image
                }`}
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
                    value={product.rating}
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
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductScreen;
