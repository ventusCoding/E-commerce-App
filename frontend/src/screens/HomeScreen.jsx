import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../store/actions/index";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";

const HomeScreen = () => {
  const keyword = useParams().keyword;
  const pageNumber = useParams().pageNumber || 1;

  const dispatch = useDispatch();

  const { products, error, loading, pages } = useSelector(
    (state) => state.products
  );

  const { fetchProducts } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const limit = 3;
    fetchProducts(limit, keyword, pageNumber);
  }, [products.length, keyword, pageNumber]);

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={pageNumber}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
