import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Card } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../store/actions/index";
import { useNavigate, useLocation } from "react-router-dom";
// import Paginate from "../components/Paginate";
// import {
//   listProducts,
//   deleteProduct,
//   createProduct,
// } from "../actions/productActions";
// import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const {
    products,
    error: productsError,
    loading: productsLoading,
    message: productsMessage,
  } = useSelector((state) => state.products);

  const { token, user } = useSelector((state) => state.auth);

  const { fetchProducts, deleteProduct } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchProducts(token);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={() => {navigate('/admin/product/createNewProduct')}}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {productsLoading ? (
        <Loader />
      ) : productsError ? (
        <Message variant="danger">{productsError}</Message>
      ) : (
        <>
          {productsMessage ? (
            <Message variant="success">{productsMessage}</Message>
          ) : null}
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>
                    <img
                      width={100}
                      variant="top"
                      src={`/img/products/${product.image.url}`}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => {
                        deleteProduct(token, product._id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
