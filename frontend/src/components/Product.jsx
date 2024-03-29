import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={`/img/products/${product.image.url}`} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div">
            <Rating
              value={product.ratingsAverage}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="h3">{product.price}</Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
