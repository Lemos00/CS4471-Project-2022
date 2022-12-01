import React from "react";
import "./OperationFailedComponent.css"

// MAIN COMPONENT, LOGIN PAGE MAIN
const OperationFailedComponent = ({error}) => {

    // setShowLogin passed to login component, on the event of successful login
    return (
        <div className="operationFailed">
            <p className="failText">Operation Failed - {error}</p>
        </div>
     );
}
 
export default OperationFailedComponent;