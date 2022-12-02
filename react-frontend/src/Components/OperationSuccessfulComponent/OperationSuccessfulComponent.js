import React from "react";
import "./OperationSuccessfulComponent.css"

// MAIN COMPONENT, LOGIN PAGE MAIN
const OperationSuccessfulComponent = ({message}) => {

    // setShowLogin passed to login component, on the event of successful login
    return (
        <div className="operationSucess">
            <p className="sucessText">Operation Sucessful - {message}</p>
        </div>
     );
}
 
export default OperationSuccessfulComponent;