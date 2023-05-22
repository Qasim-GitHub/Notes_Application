import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import logo from "./logo.png";

const Home = ({ auth }) => {
  console.log(`hy ${auth}`);
  console.log(logo);
  return (
    <div>
      {auth ? (
        <div className="container">
          <div
            className="d-flex flex-column align-items-center  "
            style={{ marginTop: "200px" }}
          >
            <h1 className="mt-3">Create Own Notes</h1>
            <Link to="/myNotes/createNewNote">
              <Button className="mt-3">
                <FiEdit className="mr-2" />
                Create Note
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="container  ">
            <div
              className="d-flex  justify-content-center mt-5"
              style={{ height: "60%" }}
            >
              <img src={logo} style={{ height: "60px", marginTop: "-4px" }} />
              <h1>NotesC</h1>
            </div>
            <div
              className="d-flex flex-row justify-content-center align-items-center  mt-5 rounded "
              style={{
                height: "250px",
                width: "300px",
                marginLeft: "37%",
                backgroundColor: "black",
              }}
            >
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/register">
                <Button className="ml-2">register</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
