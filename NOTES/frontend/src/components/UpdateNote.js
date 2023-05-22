import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStore } from "../App";

function UpdateNote({ updateV }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [category, setCategory] = useState(null);

  console.log(`this is mu ${updateV}`);

  const updateHan = async (updateV) => {
    console.log(`value is ${updateV}`);
    const data = await axios.put(
      `/api/notes/${updateV}`,
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
      <form>
        <label>Tittle</label>

        <br></br>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <br></br>
        <label>Category</label>

        <br></br>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        ></input>
        <br></br>
        <label>content</label>
        <br></br>
        <textarea
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="button" onClick={(e) => updateHan(updateV)}>
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateNote;
