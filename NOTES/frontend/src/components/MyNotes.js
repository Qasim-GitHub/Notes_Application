import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

import notesData from "../data/notes";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { GlobalStore } from "../App";

function MyNotes() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const { setUpdateV } = useContext(GlobalStore);

  const deletehan = async (id) => {
    const deldata = await axios.delete(`/api/notes/${id}`, {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    setNotes([...notes]);
  };

  const update = async (id, title, category, content) => {
    navigate("/myNotes/UpdateNote");
    // console.log(id);
    setUpdateV(id);
  };

  const featchNotes = async () => {
    const { data } = await axios.get("/api/notes", {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    setNotes(data);
  };

  useEffect(() => {
    featchNotes();
  }, [notes]);

  return (
    <>
      <div className="container">
        <div className="d-flex flex-column align-items-center  ">
          <h1 className="mt-3">My Notes</h1>
          <Link to="createNewNote">
            <Button className="mt-3">
              <FiEdit className="mr-2" />
              Create Note
            </Button>
          </Link>
        </div>
        <br />
        <br />
        {notes.map((data) => {
          return (
            <Card className="mb-4">
              <Card.Header
                style={{
                  backgroundColor: "red",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                {data.title}
              </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>{data.content}</p>
                  <Button
                    className="btn-primary "
                    onClick={() =>
                      update(data._id, data.title, data.category, data.content)
                    }
                  >
                    <AiFillEdit /> Edit
                  </Button>
                  <Button
                    className="btn-danger ml-2 "
                    onClick={() => deletehan(data._id)}
                  >
                    <MdDelete /> Delete
                  </Button>
                </blockquote>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default MyNotes;
