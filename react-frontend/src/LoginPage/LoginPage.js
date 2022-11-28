import React from "react";
// import "../RegisterUserComponent/RegisterUser";
import RegisterUser from "../RegisterUserComponent/RegisterUser";
import LoginComponent from "../LoginComponent/LoginComponent";

const LoginPage = () => {

    const [showRegister, setShowRegister] = React.useState(false);

    const handleShow = () => {
        setShowRegister(showRegister => !showRegister);
    }
    let toggleLoginCheck = showRegister ? "null" : "";


    return ( 
        <div className="loginCover">
            
            <LoginComponent setShow={setShowRegister}/>
            {/* User Component -> Renders on click
            {
                showRegister ? <RegisterUser /> : null
            } */}
            <RegisterUser setShow={setShowRegister}/>
        
        </div>
     );
}
 
export default LoginPage;