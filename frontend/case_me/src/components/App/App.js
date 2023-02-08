import React from "react";
import { Route, Routes} from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Register from "../Register/Register";
import Login from "../Login/Login";
import FormEmailRequest from "../FormEmailRequest/FormEmailRequest";
import FormPasswordRequest from "../FormPasswordRequest/FormPasswordRequest";
import InfoNewPassword from "../InfoNewPassword/InfoNewPassword";
import InfoRecoveryPassword from "../InfoRecoveryPassword/InfoRecoveryPassword";
import InfoTooltip from "../InfoTooltip/InfoTooltip";


function App() {

// const[isInfoTooltip, setIsInfoTooltip] = useState(false);

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/emailform" element={<FormEmailRequest />}/>
        <Route path="/passwordform" element={<FormPasswordRequest />}/>
        <Route path="/newpassword" element={<InfoNewPassword />}/>
        <Route path="/recoverypassword" element={<InfoRecoveryPassword/>}/>
        <Route path="/info" element={<InfoTooltip/>}/>
      </Routes>
    </div>
  );
}

export default App;
