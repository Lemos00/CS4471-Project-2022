import React from "react"

const RegisterUser = ({setShowRegister}) => {

    const handleShow = (state) => {
        setShowRegister(state);
    }
    return ( 
        <div className="registerCover">
            <h1 className="mainHeader">Hello from register</h1>
            <button onClick={()=>{handleShow(false)}}>TESTING</button>
        </div>
     );
}
 
export default RegisterUser;