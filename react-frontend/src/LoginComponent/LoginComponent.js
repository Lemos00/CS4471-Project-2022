import "./Login.css"
import React from "react"

const LoginComponent = ({setShowRegister}) => {

    const handleShow = (state) => {
        setShowRegister(state);
    }


    return ( 
        <div className="loginCover">
            <div className="loginPage">
                <h1>Movie Booking System</h1>
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
                
                <p className="text">Or login using</p>
                <div className="login-btn">Login</div>
                <div className="alt-login">
                    <div className="login-btn" id="forgot">Forgot Password</div>
                    <div className="login-btn" id="register" onClick= {() => {handleShow(true);}}>Register New User</div>
                </div>
            </div>
        </div>
     );
}
 
export default LoginComponent;