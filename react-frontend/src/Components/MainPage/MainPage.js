import React from 'react'
import Modal from '../Modal/Modal.js'
import MovieCardComponent from '../MovieCardComponent/MovieCardComponent.js'
import Axios from "axios";
import NavBar from '../NavBar/NavBar.js';
import "./MainPage.css";

const MainPage = (props) => {
    
    const [movieList, setMovieList] = React.useState([]);
    const [showMoviesbutton, setShowMoviesButton] = React.useState(true);

    const handleList = () => {
        setShowMoviesButton(false);
        const result = Axios.get("http://127.0.0.1:5000/movie/list").then(
            (response) => {
                if (response.status < 400) {
                    setMovieList(response.data);
                }else {
                    setMovieList = [];
                }
             }
        )
        console.log(movieList);
    }

    return(
        <div className="mainCover">
            <NavBar setShowLogin={props.setShowLogin} navBarUsername={props.navBarUsername}/>
            {showMoviesbutton ?
            <div className="buttonWrapper">
                <button className="showMoviesButton" onClick={handleList}>SEE LIST OF MOVIES</button>
            </div>
            : null}
            <div className="movieGrid">
                {movieList ? movieList.map((movie) => {
                    return <MovieCardComponent className="movieChild" key={movie.id} title={movie.title} imageUrl={movie.image_url}
                    releaseDate={movie.release_date}/>
                }) : null}
            </div>      
        </div>
    )
}
export default MainPage