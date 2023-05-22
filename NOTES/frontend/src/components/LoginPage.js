import axios from "axios";
import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { GlobalStore } from "../App";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useContext(GlobalStore);

  const navigate = useNavigate();
  // onSubmit Functionality
  const submithan = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/api/user/login", {
      email,
      password,
    });
    console.log(data.token);

    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", JSON.stringify(data.token));
      setAuth(localStorage.getItem("userInfo"));
      navigate("/myNotes");
    }
  };

  return (
    <div className="m-5">
      <Form onSubmit={submithan}>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <br></br>
        <Link to="/register">Create New Account</Link>
      </Form>
    </div>
  );
};

export default LoginPage;
