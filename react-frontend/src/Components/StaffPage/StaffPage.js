import React from "react";
import "./StaffPage.css"
import StaffInput from "../StaffInput/StaffInput.js"
import MovieCardComponent from "../MovieCardComponent/MovieCardComponent.js"

// MAIN COMPONENT, LOGIN PAGE MAIN
const StaffPage = () => {

    // const [showRegister, setShowRegister] = React.useState(false);

    // define values for form
    const [values, setValues] = React.useState({
        title: "",
        imageUrl: "",
        releaseDate: "",
        ageRating: "",
    });

    const inputs = [
        {
            id: 1,
            name: "title",
            type: "text",
            placeholder: "Movie Title",
            label: "Movie Title",
            errorMessage: "Movie Title should be at least 1 chars long",
            pattern: "[a-zA-Z0-9 ]+",
            required: true,
        },
        {
            id: 2,
            name: "imageUrl",
            type: "text",
            placeholder: "Image URL",
            label: "Image URL",
            errorMessage: "Movie URL should be valid link",
            pattern: "(https?://)[A-Za-z0-9./+_=?()[{-]*",
            required: true,
        },
        {
            id: 3,
            name: "releaseDate",
            type: "date",
            label: "Release Date",
            required: true,
        },
        {
            id: 4,
            name: "ageRating",
            type: "text",
            placeholder: "Age Rating",
            label: "Age Rating",
            errorMessage: "Age Rating should be realistic :)",
            pattern: "^[A-Za-z0-9]{1,3}",
            required: true,
        },
    ]

    // ========== METHODS =========
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(Object.fromEntries(data.entries()));
    }

    // handle value change
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <div className="staffCover">
            <form action="" onSubmit={handleSubmit} className="staffForm">
                <h1 className="staffTitle">Create a Movie</h1>
                {inputs.map((input) => {
                   return <StaffInput
                        key = {input.id}
                        {...input}
                        value={values[input.name]} 
                        onChange={onChange}
                    /> 
                })}
                <button className="movieSubmitButton">Submit</button>
            </form>
            
            <div className="moviePreview">
                <h3>Posting Preview</h3>
                <MovieCardComponent title={values.title} imageUrl={values.imageUrl} releaseDate={values.releaseDate}/>
            </div>
        
        </div>
     );
}
 
export default StaffPage;