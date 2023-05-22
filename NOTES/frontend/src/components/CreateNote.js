import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStore } from "../App";

function CreateNote() {
  const navigate = useNavigate();
  const setNotes = useContext(GlobalStore);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [category, setCategory] = useState(null);

  const submitHan = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "/api/notes/create",
      {
        title,
        content,
        category,
      },

      {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    console.log(data);
    if (data) {
      navigate("/myNotes");
    }
  };

  return (
    <div>
      <Form className="container mt-5" onSubmit={submitHan}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Tittle</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default CreateNote;
