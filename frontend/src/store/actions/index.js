//************** AUTH_&_USER ********************/

export {
  auth,
  signup,
  logout,
  checkAuthState,
  emailVerification,
  resetAuthState,
  updateUser,
  fetchUserData,
} from "./auth";


//************** UPDATE CART QTY ********************/
export {
  updateCartQty,
  updateCartQtyFail,
  updateCartQtyStart,
  updateCartQtySuccess,
} from "./cart";


//************** REMOVE CART ********************/
export {
  removeCart,
  removeCartFail,
  removeCartStart,
  removeCartSuccess,
} from "./cart";


//************** ADD CART ********************/
export {
  addCart,
  addCartFail,
  addCartStart,
  addCartSuccess,
} from "./cart";


//************** FETCH PRODUCTS ********************/
export {
    fetchProducts,
    fetchProductsFail,
    fetchProductsStart,
    fetchProductsSuccess,
  } from "./products";

  //************** FETCH PRODUCT BY ID ********************/

  export {
    fetchProductDetail,
    fetchProductDetailFail,
    fetchProductDetailStart,
    fetchProductDetailSuccess,
  } from "./products";