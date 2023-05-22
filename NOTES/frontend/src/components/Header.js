import React, { useContext } from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { GlobalStore } from "../App";

import {
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ profileN, auth }) => {
  const { setAuth } = useContext(GlobalStore);
  const navigate = useNavigate();
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        {!auth ? (
          <>
            <Navbar.Brand>
              <Link to="/">Notes</Link>
            </Navbar.Brand>
            <div className="d-flex ">
              <Navbar.Brand>
                <Link to="/login">Login</Link>
              </Navbar.Brand>
              <Navbar.Brand>
                <Link to="/register">SignUp</Link>
              </Navbar.Brand>
            </div>
          </>
        ) : (
          <>
            <div className="container">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Navbar.Brand>
                  <Link to="/">Notes</Link>
                </Navbar.Brand>
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="/myNotes">
                  <Link to="/myNotes">MyNotes</Link>
                </Nav.Link>
                <Nav.Link href="#">
                  {auth ? <h6>{JSON.parse(auth).name}</h6> : <h6>Profile</h6>}
                </Nav.Link>
                <div className="d-flex ">
                  <Nav.Link>
                    <Link
                      onClick={() => {
                        localStorage.clear();
                        setAuth(null);
                        navigate("/");
                      }}
                      to="/"
                    >
                      Logout
                    </Link>
                  </Nav.Link>
                </div>
              </Nav>
            </div>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
