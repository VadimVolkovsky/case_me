import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Register from "../Register/Register";
import Login from "../Login/Login";
import FormEmailRequest from "../FormEmailRequest/FormEmailRequest";
import FormPasswordRequest from "../FormPasswordRequest/FormPasswordRequest";
import PasswordUpdate from "../PasswordUpdate/PasswordUpdate";
import PasswordRecovery from "../PasswordRecovery/PasswordRecovery";
import PopupTooltip from "../PopupTooltip/PopupTooltip";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import UserAgreement from "../UserAgreement/UserAgreement";
import UserProfile from "../UserProfile/UserProfile";
import * as auth from "../../utils/auth";

function App() {
  // Переменные состояния
  // const[isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    username: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleLogin(email, password) {
    console.log('email, password', email, password)
    return auth.authorize(email, password)
      .then((data) => {
        console.log('data', data);
        console.log('data.access', data.access);
        console.log('data.refresh', data.refresh);
        /* if(!data.jwt) throw new Error('Missing jwt'); */
        localStorage.setItem('jwt', data.jwt);
        setLoggedIn(true);
        setUserData({
          email: data.email,
          username: data.nickname
        });
        console.log('setLoggedIn', loggedIn);
        navigate('/userprofile');
        if(!data) throw new Error('NE DATA');
      })
      .catch(err => {
        console.log(err)
      })
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    console.log('jwt', jwt)

    if(!jwt) return;

    auth.getContent(jwt)
      .then((data) => {
        setLoggedIn(true);
        setUserData({
          email: data.user.email,
          username: data.user.nickname
        });
    /*navigate('/userprofile');*/
      });
  };

  return (
    <div className="App">
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login onLogin={handleLogin}/>} />
        <Route path="/" element={<Main />} />
        <Route path="/emailform" element={<FormEmailRequest />} />
        <Route path="/passwordform" element={<FormPasswordRequest />} />
        <Route path="/passwordupdate" element={<PasswordUpdate />} />
        <Route path="/passwordrecovery" element={<PasswordRecovery />} />
        <Route path="/info" element={<PopupTooltip />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/useragreement" element={<UserAgreement />} />
        <Route path="/userprofile" element={<UserProfile loggedIn={loggedIn} userData={userData} />}
        />
      </Routes>
    </div>
  );
}

export default App;
