import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import MyNotes from "./components/MyNotes";
import CreateNote from "./components/CreateNote";
import Register from "./components/Register";
import LoginPage from "./components/LoginPage";
import UpdateNote from "./components/UpdateNote";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { createContext } from "react";

export const GlobalStore = createContext();
const App = () => {
  const [updateV, setUpdateV] = useState("");
  const [auth, setAuth] = useState("");
  const [profileN, setProfileN] = useState("");

  console.log(`good ${auth}`);
  console.log(`My profile name ${profileN}`);
  console.log(updateV);

  useEffect(() => {
    const auth1 = localStorage.getItem("userInfo");
    setAuth(auth1);
  }, []);
  return (
    <div>
      <GlobalStore.Provider
        value={{
          setUpdateV: setUpdateV,
          updateV: updateV,
          setAuth: setAuth,
          // setProfileN: setProfileN,
          // profileN: profileN,
        }}
      >
        <BrowserRouter>
          <Header profileN={profileN} auth={auth} />
          <Routes>
            <Route path="/" element={<Home auth={auth} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myNotes" element={<MyNotes />} />
            <Route path="/myNotes/createNewNote" element={<CreateNote />} />
            <Route
              path="/myNotes/UpdateNote"
              element={<UpdateNote updateV={updateV} />}
            />
          </Routes>
        </BrowserRouter>
      </GlobalStore.Provider>
    </div>
  );
};

export default App;
