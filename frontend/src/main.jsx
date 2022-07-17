import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./bootstrap.min.css";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import productsReducer from "./store/reducers/productsReducer";
import cartReducer from "./store/reducers/cartReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
