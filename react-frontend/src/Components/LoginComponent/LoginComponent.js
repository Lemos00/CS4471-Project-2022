import "./Login.css"
import Axios from "axios";
import React from "react"

const LoginComponent = ({setShowRegister, setShowLogin}) => {

    const handleShow = (state) => {
        setShowRegister(state);
    }

    const handleLogin = (successful) => {
        const username = getUsername();
        const password = getPassword();
        
        const request = {username: username, password: password};
        
        const result = Axios.post("http://127.0.0.1:5000/user/login", request).then(
            (response) => {
                if (response.data.status) {
                    // login is successful, check for admin
                    setShowLogin(successful);
                    console.log(response.data);
                }
        });
    }

    const getUsername = () => {
        const username = document.getElementById("username");
        console.log(username.value);
        return username.value;
    }

    const getPassword = () => {
        const password = document.getElementById("password");
        console.log(password.value);
        return password.value;
    }

    return ( 
        <div className="loginCover">
            <form action="" method="post">
                <div className="loginPage">
                    <h1>Book-A-Movie</h1>
                    <input className="loginInput" id="username" type="text" placeholder="username" />
                    <input className="loginInput" id ="password" type="password" placeholder="password" />
                    
                    <p className="text">Or login using</p>
                    <div className="login-btn" onClick= {() => {handleLogin(false);}}>Login</div>
                    <div className="alt-login">
                        <div className="login-btn" id="register" onClick= {() => {handleShow(true); }}>Register New User</div>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default LoginComponent;