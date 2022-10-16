import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../store/actions/index";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { logout } = bindActionCreators(actionCreators, dispatch);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <i className="fas fa-shopping-cart" /> Cart
              </Nav.Link>
              {isAuthenticated ? (
                <NavDropdown title={user.name} id="username">
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <i className="fas fa-user" />
                  Sign In
                </Nav.Link>
              )}

              {user && user.role === "admin" && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/admin/userlist");
                    }}
                  >
                    Users
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/admin/productlist");
                    }}
                  >
                    Products
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/admin/orderlist");
                    }}
                  >
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
