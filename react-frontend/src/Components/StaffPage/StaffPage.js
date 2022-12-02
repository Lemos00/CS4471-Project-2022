import React from "react";
import "./StaffPage.css"
import StaffInput from "../StaffInput/StaffInput.js"
import MovieCardComponent from "../MovieCardComponent/MovieCardComponent.js"
import NavBar from "../NavBar/NavBar";
import Axios from "axios";
import OperationFailedComponent from "../OperationFailedComponent/OperationFailedComponent";
import OperationSuccessfulComponent from "../OperationSuccessfulComponent/OperationSuccessfulComponent";

// MAIN COMPONENT, LOGIN PAGE MAIN
const StaffPage = ({setShowLogin, navBarUsername}) => {
    const [requestError, setRequestError] = React.useState(false);
    const [requestGood, setRequestGood] = React.useState(false);

    const handleMoviePost = (data) => {
        const request = {
            title: data.title,
            image_url: data.imageUrl,
            release_date: data.releaseDate,
            age_rating: data.ageRating,
        };
        const result = Axios.post("http://127.0.0.1:5000/movie/add", request).then(
            (response) => {
                if (response.data.status) {
                    setRequestGood(true);
                }
            }
        ).catch((error) => {setRequestError(true);});
    }

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
            pattern: "(https?://)[A-Za-z0-9./+_=?()[{- ]*",
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
        handleMoviePost(Object.fromEntries(data.entries()));
    }

    // handle value change
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <div className="staffMain">
            <NavBar setShowLogin={setShowLogin} navBarUsername={navBarUsername}/>
            <div className="staffCover">
                {/* <NavBar setShowLogin={setShowLogin}/> */}
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
                    {requestError ? <OperationFailedComponent error={"Failed to post movie"} /> : null}
                    {requestGood ? <OperationSuccessfulComponent message={"Movie successfully Created"} /> : null}
                </form>
                
                <div className="moviePreview">
                    <h3>Posting Preview</h3>
                    <MovieCardComponent title={values.title} imageUrl={values.imageUrl} releaseDate={values.releaseDate}/>
                </div>
            
            </div>
        </div>
     );
}
 
export default StaffPage;