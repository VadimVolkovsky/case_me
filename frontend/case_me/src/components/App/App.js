import React from "react";
import { Route, Routes} from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
