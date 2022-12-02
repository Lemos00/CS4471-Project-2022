import React from "react"
import FormInput from "../FormInput/FormInput"
import "./RegisterUser.css"
import Axios from "axios";
import OperationFailedComponent from "../OperationFailedComponent/OperationFailedComponent";
import OperationSuccessfulComponent from "../OperationSuccessfulComponent/OperationSuccessfulComponent";

const RegisterUser = ({setShowRegister}) => {
    // make input states
    const [values, setValues] = React.useState({
        username: "",
        email: "",
        FirstName: "",
        LastName: "",
        password: "",
        reenterPassword: "",
    });

    const [requestError, setRequestError] = React.useState(false);
    const [requestGood, setRequestGood] = React.useState(false);

    // handle login display after user register
    const handleShow = (state) => {
        setShowRegister(state);
    }

    // handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const entries = Object.fromEntries(data.entries());

        const request = {
            "username": entries.username,
            "password": entries.password,
            "email": entries.email,
            "first_name": entries.FirstName,
            "last_name": entries.LastName,
            "admin_status": 0
        }
        const result = Axios.post("http://127.0.0.1:5000/user/register", request).then(
            (response) => {
                if (response.data.status) {
                    console.log("SUCCESSFUL CREATION");
                    setRequestGood(true);
                } else {
                    console.log("DID NOT CREATE");
                    setRequestError(true);
                }
            }
        ).catch((error) => {setRequestError(true);});
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
            name: "email",
            type: "text",
            placeholder: "Email@example.com",
            label: "Email",
            errorMessage: "email should be valid",
            pattern: "^[A-Za-z0-9@.]{3,20}",
            required: true,
        },
        {
            id: 3,
            name: "FirstName",
            type: "text",
            placeholder: "First Name",
            label: "First Name",
            errorMessage: "Name should be 1-20 characters long - Cannot contain special chars",
            pattern: "^[A-Za-z0-9]{1,20}",
            required: true,
        },
        {
            id: 4,
            name: "LastName",
            type: "text",
            placeholder: "Last Name",
            label: "Last Name",
            errorMessage: "Last name should be 1-20 characters long - Cannot contain special chars",
            pattern: "^[A-Za-z0-9 ]{3,20}",
            required: true,
        },
        {
            id: 5,
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password",
            errorMessage: "Password should be 3-20 characters long - Cannot contain special chars",
            pattern: "^[A-Za-z0-9]{3,20}",
            required: true,
        },
        {
            id: 6,
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
                {requestError ? <OperationFailedComponent error={"Could not Register User"} /> : null}
                {requestGood ? <OperationSuccessfulComponent message={"User successfully Created"} /> : null}
            </form>
            <button className="goBackButton" onClick={() => {handleShow(false);}}>Home Page</button>
        </div>
     );
}
 
export default RegisterUser;