import React from "react";
import { Route, Routes} from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Register from "../Register/Register";
import Login from "../Login/Login";
import FormEmailRequest from "../FormEmailRequest/FormEmailRequest";



function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/emailform" element={<FormEmailRequest />}/>
      </Routes>
    </div>
  );
}

export default App;
