import React from "react";
import "./FormInput.css";


const FormInput = (props) => {

    // take things gotten from props
    const { label, onChange, id, ...inputProps } = props;

    return (
        <div className="formInputs">
            <label>{label}</label>
            <input {...inputProps} onChange={onChange} className="formInputs"/>
        </div>
    )
}

export default FormInput;