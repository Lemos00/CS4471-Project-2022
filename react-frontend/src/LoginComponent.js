import "./Login.css"

const LoginComponent = () => {

    // const [popupStyle, showPopup] = useState("hide");

    // const popup = () => {
    //     alert()
    // }
    return ( 
        <div className="loginCover">
            <h1>Movie Booking System</h1>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            
            <p className="text">Or login using</p>
            <div className="login-btn">Login</div>
            <div className="alt-login">
                <div className="login-btn" id="forgot">Forgot My Password</div>
            </div>
        
        </div>
     );
}
 
export default LoginComponent;