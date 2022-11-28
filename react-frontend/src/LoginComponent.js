import "./Login.css"
import React from "react"

const LoginComponent = () => {

    const [showRegister, setShow] = React.useState(false);

    const handleShow = () => {
        setShow(showRegister => !showRegister);
    }

    let toggleLoginCheck = showRegister ? "null" : "";
    return ( 
        <div className="loginCover">
            <div className={`loginPage${toggleLoginCheck}`}>
                <h1>Movie Booking System</h1>
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
                
                <p className="text">Or login using</p>
                <div className="login-btn">Login</div>
                <div className="alt-login">
                    <div className="login-btn" id="forgot">Forgot Password</div>
                    <div className="login-btn" id="register" onClick= {() => {handleShow();}}>Register New User</div>
                </div>
            </div>
            <div className="registerNewUser">
                <h1>Hello there, this is register</h1>
            </div>
        
        </div>
     );
}
 
export default LoginComponent;