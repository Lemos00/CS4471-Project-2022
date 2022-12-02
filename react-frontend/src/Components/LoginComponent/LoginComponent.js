import "./Login.css"
import Axios from "axios";
import React from "react"
import OperationFailedComponent from "../OperationFailedComponent/OperationFailedComponent";

const LoginComponent = ({setShowRegister, setShowLogin, setPageToShow}) => {

    const [requestError, setRequestError] = React.useState(false);

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
                    if (response.data.admin_status > 0) {
                        setPageToShow(["admin", username]);
                    } else {
                        setPageToShow(["normal", username]);
                    }
                }
        }).catch((error) => {setRequestError(true);});
    }

    const getUsername = () => {
        const username = document.getElementById("username");
        return username.value;
    }

    const getPassword = () => {
        const password = document.getElementById("password");
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
                    {requestError ? <OperationFailedComponent error={"Username or password invalid"} /> : null}
                </div>
            </form>
        </div>
     );
}
 
export default LoginComponent;