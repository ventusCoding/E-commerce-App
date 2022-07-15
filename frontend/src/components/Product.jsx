import React from "react";
import { Card } from "react-bootstrap";
import products from "../products";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </a>
      <Card.Body>
        <a style={{ textDecoration: "none" }} href={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div">
            <div className="my-3">
              {product.rating} from {product.numReviews}
            </div>
          </Card.Text>
          <Card.Text as="h3">{product.price}</Card.Text>
        </a>
      </Card.Body>
    </Card>
  );
};

export default Product;
