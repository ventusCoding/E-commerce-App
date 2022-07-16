import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../store/actions/index";

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const { products, error, loading } = useSelector((state) => state.products);

  const { fetchProducts } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    fetchProducts();
    // setProducts(state.products.products);
  }, [products.length]);

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>Loading ...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
