import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submithan = async (e) => {
    e.preventDefault();
    let data1;
    if (password !== cpassword) {
      setError("Password is not Match");
    } else {
      try {
        const { data } = await axios.post("/api/user/register", {
          name,
          email,
          password,
        });

        console.log(data);
        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("token", JSON.stringify(data.token));
          navigate("/login");
        }
      } catch (error) {
        console.log(error.response.data);
        setError(error.response.data);
      }
    }
  };
  return (
    <div className="container ">
      <h1>{error}</h1>
      <Form onSubmit={submithan}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Conform Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={cpassword}
            onChange={(e) => {
              setCpassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Upload Pic</Form.Label>
          <Form.Control type="file" multiple />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
