import React from "react";
import "./FormInput.css";


const FormInput = (props) => {
    return (
        <div className="formInputs">
            <input type="text" placeholder={props.placeholder} onChange={e => props.setUsername(e.target.value)}/>
        </div>
    )
}

export default FormInput;