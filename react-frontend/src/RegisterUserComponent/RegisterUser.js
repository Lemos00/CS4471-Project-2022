import React from "react"

const RegisterUser = ({setShowRegister}) => {
    // make input states
    const [email, setEmail] = React.useState("");
    const [pass, setPass] = React.useState("");

    const handleShow = (state) => {
        setShowRegister(state);
    }
    return ( 
        <div className="registerCover">
            <form action="" method="post">
                <h1 className="mainHeader">Hello from register</h1>
                <label for="email" className="usernameLabel">email</label>
                <input type="email" className="usernameInput" placeholder="myexample@example.com" />
                <button onClick={()=>{handleShow(false)}}>register</button>
            </form>
        </div>
     );
}
 
export default RegisterUser;