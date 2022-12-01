import React, {useState} from "react";
import "./MovieCardComponent.css";
import Modal from '../Modal/Modal';

// Props to Pass:
//     - imageUrl: url of the imageUrl
//     - title: title of the Movie
//     - body: body description of the movie
const MovieCardComponent = (props) => {

    const handleClick = event => {
        props.setShow(true);
        console.log(event);
      };

    return (
        <div className="cardContainer">
            <div className="imageContainer">
                <img src={props.imageUrl} alt="" />
            </div>
            <div className="cardContent">
                <div className="cardTitle">
                    <h3>{props.title}</h3>
                </div>
                <div className="cardReleaseDate">
                    <p>{props.releaseDate}</p>
                </div>
                <div className="cardButton">
                    <button onClick= {() => {handleClick(true);}}>
                        See Sessions
                    </button>
                </div>
            </div>
        </div>
        
    )
}

export default MovieCardComponent;