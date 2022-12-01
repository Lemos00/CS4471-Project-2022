import "./Login.css"
import React from "react"

const LoginComponent = ({setShowRegister, setShowLogin}) => {

    const handleShow = (state) => {
        setShowRegister(state);
    }

    const handleLogin = (successful) => {
        setShowLogin(successful);
        console.log(successful);
    }


    return ( 
        <div className="loginCover">
            <form action="" method="post">
                <div className="loginPage">
                    <h1>Book-A-Movie</h1>
                    <input className="loginInput" type="text" placeholder="username" />
                    <input className="loginInput" type="password" placeholder="password" />
                    
                    <p className="text">Or login using</p>
                    <div className="login-btn" onClick= {() => {handleLogin(false);}}>Login</div>
                    <div className="alt-login">
                        <div className="login-btn" id="forgot">Forgot Password</div>
                        <div className="login-btn" id="register" onClick= {() => {handleShow(true);}}>Register New User</div>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default LoginComponent;