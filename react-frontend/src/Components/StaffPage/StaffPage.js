import React from "react";
import "./StaffPage.css"

// MAIN COMPONENT, LOGIN PAGE MAIN
const StaffPage = () => {

    // const [showRegister, setShowRegister] = React.useState(false);

    // define values for form
    const [values, setValues] = React.useState({
        movieId: "",
        title: "",
        imageUrl: "",
        releaseDate: "",
        ageRating: "",
    });

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
            <form action="" className="staffForm">
                <h1>Hello there</h1>
            </form>
        
        </div>
     );
}
 
export default StaffPage;