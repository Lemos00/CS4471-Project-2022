import React from "react"
import FormInput from "../FormInput/FormInput"
import "./RegisterUser.css"

const RegisterUser = ({setShowRegister}) => {
    // make input states
    const [values, setValues] = React.useState({
        username: "",
        password: "",
        reenterPassword: "",
    });

    // handle login display after user register
    const handleShow = (state) => {
        setShowRegister(state);
    }

    // handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(Object.fromEntries(data.entries()));
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    // inputs related to each Field input element / component
    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            label: "Username",
            errorMessage: "Username cannot contain any special characters, should be 3-20 chars long!",
            pattern: "^[A-Za-z0-9]{3,20}",
            required: true,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password",
            errorMessage: "Password should be 3-20 characters long - Cannot contain special chars",
            pattern: "^[A-Za-z0-9]{3,20}",
            required: true,
        },
        {
            id: 3,
            name: "reenterPassword",
            type: "password",
            placeholder: "re-enter Password",
            label: "re-enter Password",
            errorMessage: "Passwords should match.",
            pattern: values.password,
            required: true,
        },
    ]

    // console.log(values);
    return ( 
        <div className="registerCover">
            <form action="" method="get" onSubmit={handleSubmit} className="registerForm">
                <h1 className="loginTitle">Register</h1>

                {inputs.map((input) => {
                   return <FormInput
                        key = {input.id}
                        {...input}
                        value={values[input.name]} 
                        onChange={onChange}
                    /> 
                })}
                <button className="registerSubmitButton">Submit</button>
            </form>
            <button className="goBackButton" onClick={() => {handleShow(false);}}>Home Page</button>
        </div>
     );
}
 
export default RegisterUser;