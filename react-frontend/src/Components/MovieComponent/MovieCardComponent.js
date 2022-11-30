import React from "react";
import "./MovieCardComponent.css";

// Props to Pass:
//     - imageUrl: url of the imageUrl
//     - title: title of the Movie
//     - body: body description of the movie
const MovieCardComponent = (props) => {
    console.log(props)
    return (
        <div className="cardContainer">
            <div className="imageContainer">
                <img src={props.imageUrl} alt="" />
            </div>
            <div className="cardContent">
                <div className="cardTitle">
                    <h3>{props.title}</h3>
                </div>
                <div className="cardBody">
                    <p>{props.body}</p>
                </div>
                <div className="cardButton">
                    <button>
                        See Sessions
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MovieCardComponent;