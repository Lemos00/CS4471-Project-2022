import React from "react";
import "./StaffInput.css";

// COMPONENT UTILIZED IN THE REGISTER USER FORM
const StaffInput = (props) => {
    // take things gotten from props
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    // user unfocuses from input field, display error if present --> display error if unfocused
    const [focus, setFocus] = React.useState(false);

    const handleFocus = (event) => {
        setFocus(true);
    }

    return (
        <div className="formInputs">
            <label>{label}</label>
            <input 
                {...inputProps}
                onChange={onChange}
                className="formInputs"
                onBlur={handleFocus}
                focus={focus.toString()}
                onFocus={() => 
                    {inputProps.name==="reenterPassword" && setFocus(true)}}
            />
            <span className="inputSpan">{errorMessage}</span>
        </div>
    )
}

export default StaffInput;