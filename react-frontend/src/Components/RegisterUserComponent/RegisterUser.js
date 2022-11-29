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

    // inputs to map
    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            label: "Username",
        },
        {
            id: 2,
            name: "password",
            type: "text",
            placeholder: "Password",
            label: "Password",
        },
        {
            id: 3,
            name: "reenterPassword",
            type: "text",
            placeholder: "re-enter Password",
            label: "re-enter Password",
        },
    ]

    console.log(values);
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
        </div>
     );
}
 
export default RegisterUser;