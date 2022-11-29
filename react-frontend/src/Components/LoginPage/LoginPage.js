import React from "react";
import RegisterUser from "../RegisterUserComponent/RegisterUser";
import LoginComponent from "../LoginComponent/LoginComponent";
import "./LoginPage.css"

// MAIN COMPONENT, LOGIN PAGE MAIN
const LoginPage = () => {

    const [showRegister, setShowRegister] = React.useState(false);


    return ( 
        <div className="loginCover">
            
            {showRegister ? <RegisterUser setShowRegister={setShowRegister}/> 
                : <LoginComponent setShowRegister={setShowRegister}/>}
        
        </div>
     );
}
 
export default LoginPage;