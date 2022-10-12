import * as actionTypes from "./actionTypes";
import axios from "axios";

//************** CREATE PRODUCT ********************/

export const createProductFail = (error) => {
  return {
    type: actionTypes.CREATE_PRODUCT_FAIL,
    error,
  };
};
export const createProductStart = () => {
  return {
    type: actionTypes.CREATE_PRODUCT_START,
  };
};

export const createProductSuccess = () => {
  return {
    type: actionTypes.CREATE_PRODUCT_SUCCESS,
  };
};

export const createProduct = (token, data) => {
  return (dispatch) => {
    dispatch(createProductStart());

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("countInStock", data.countInStock);
    if (data.imageFile) {
      formData.append("image", data.imageFile);
    } else if (
      data.image !== null &&
      data.image !== undefined &&
      data.image !== ""
    ) {
      formData.append("image", data.image);
    }

    axios
      .post(`/api/v1/products/`, formData, config)
      .then(() => {
        dispatch(createProductSuccess());
        dispatch(fetchProducts());
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          dispatch(createProductFail(message));
        }
      );
  };
};

//************** UPDATE PRODUCT ********************/

export const updateProductFail = (error) => {
  return {
    type: actionTypes.UPDATE_PRODUCT_FAIL,
    error,
  };
};
export const updateProductStart = () => {
  return {
    type: actionTypes.UPDATE_PRODUCT_START,
  };
};

export const updateProductSuccess = () => {
  return {
    type: actionTypes.UPDATE_PRODUCT_SUCCESS,
  };
};

export const updateProduct = (token, id, data) => {
  return (dispatch) => {
    dispatch(updateProductStart());

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("countInStock", data.countInStock);
    if (data.imageFile) {
      formData.append("image", data.imageFile);
    } else if (
      data.image !== null &&
      data.image !== undefined &&
      data.image !== ""
    ) {
      formData.append("image", data.image);
    }

    axios
      .patch(`/api/v1/products/${id}`, formData, config)
      .then(() => {
        dispatch(updateProductSuccess());
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          dispatch(updateProductFail(message));
        }
      );
  };
};

//************** DELETE PRODUCT ********************/

export const deleteProductFail = (error) => {
  return {
    type: actionTypes.DELETE_PRODUCT_FAIL,
    error,
  };
};
export const deleteProductStart = () => {
  return {
    type: actionTypes.DELETE_PRODUCT_START,
  };
};

export const deleteProductSuccess = () => {
  return {
    type: actionTypes.DELETE_PRODUCT_SUCCESS,
  };
};

export const deleteProduct = (token, id) => {
  return (dispatch) => {
    dispatch(deleteProductStart());

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`/api/v1/products/${id}`, config)
      .then(() => {
        dispatch(deleteProductSuccess());
        dispatch(fetchProducts(token));
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          dispatch(deleteProductFail(message));
        }
      );
  };
};

//************** FETCH PRODUCT BY ID ********************/

export const fetchProductDetailSuccess = (product) => {
  return {
    type: actionTypes.FETCH_PRODUCT_DETAIL_SUCCESS,
    product,
  };
};

export const fetchProductDetailFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCT_DETAIL_FAIL,
    error,
  };
};
export const fetchProductDetailStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_DETAIL_START,
  };
};

export const fetchProductDetail = (id) => {
  return (dispatch) => {
    dispatch(fetchProductDetailStart());

    axios
      .get(`/api/v1/products/${id}`)
      .then(({ data: { data } }) => {
        dispatch(fetchProductDetailSuccess(data));
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          dispatch(fetchProductDetailFail(message));
        }
      );
  };
};

//************** FETCH PRODUCTS ********************/

export const fetchProductsSuccess = (products) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    products,
  };
};

export const fetchProductsFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAIL,
    error,
  };
};
export const fetchProductsStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START,
  };
};

export const fetchProducts = () => {
  return (dispatch) => {
    dispatch(fetchProductsStart());

    axios
      .get("/api/v1/products")
      .then(({ data: { data } }) => {
        dispatch(fetchProductsSuccess(data));
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          dispatch(fetchProductsFail(message));
        }
      );
  };
};
