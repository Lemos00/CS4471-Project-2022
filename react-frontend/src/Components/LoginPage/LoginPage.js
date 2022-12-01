import React from "react";
import RegisterUser from "../RegisterUserComponent/RegisterUser";
import LoginComponent from "../LoginComponent/LoginComponent";
import "./LoginPage.css"

// MAIN COMPONENT, LOGIN PAGE MAIN
const LoginPage = ({setShowLogin, setPageToShow}) => {

    const [showRegister, setShowRegister] = React.useState(false);

    // setShowLogin passed to login component, on the event of successful login
    return (
        <div className="loginCover">
            
            {showRegister ? <RegisterUser setShowRegister={setShowRegister}/> 
                : <LoginComponent setShowRegister={setShowRegister} setShowLogin={setShowLogin} setPageToShow={setPageToShow}/>}
        
        </div>
     );
}
 
export default LoginPage;