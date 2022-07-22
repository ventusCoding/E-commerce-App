import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "./store/actions/index";
import ProfileScreen from "./screens/ProfileScreen";

const App = () => {
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const { checkAuthState } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    checkAuthState();
  }, [isAuthenticated]);

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/emailVerification/:token" element={<EmailVerificationScreen/>} />
            <Route path="/profile" element={<ProfileScreen/>} />
            {/* Optional params Methode 1 */
            /* <Route path="/cart" element={<CartScreen />}>
              <Route path=":id" element={<CartScreen />} />
            </Route> */}
            {/* Optional params Methode 2
            <Route path="/cart/*" element={<CartScreen />}/>
             */}
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
