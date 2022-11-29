import React from "react"
import FormInput from "../FormInput/FormInput"
import "./RegisterUser.css"

const RegisterUser = ({setShowRegister}) => {
    // make input states
    const [username, setUsername] = React.useState("");
    const [pass, setPass] = React.useState("");

    const handleShow = (state) => {
        setShowRegister(state);
    }
    return ( 
        <div className="registerCover">
            <form action="" method="post">
                <h1 className="mainHeader">Resgiter New User</h1>
                <FormInput placeholder="Username" setUsername={setUsername}/>
                <FormInput placeholder="New Password"/>
                <FormInput placeholder="Re-type new Password"/>
            </form>
        </div>
     );
}
 
export default RegisterUser;