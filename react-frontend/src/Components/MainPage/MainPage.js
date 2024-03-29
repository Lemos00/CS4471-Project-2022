import React from 'react'
import Modal from '../Modal/Modal.js'
import MovieCardComponent from '../MovieCardComponent/MovieCardComponent.js'
import Axios from "axios";
import NavBar from '../NavBar/NavBar.js';
import "./MainPage.css";

const MainPage = (props) => {
    
    const [movieList, setMovieList] = React.useState([]);
    const [originalMovieList, setOriginalMovieList] = React.useState([]);
    const [showMoviesbutton, setShowMoviesButton] = React.useState(true);
    const [displayModal, setDisplayModal] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleList = () => {
        setShowMoviesButton(false);
        const result = Axios.get("http://127.0.0.1:5000/movie/list").then(
            (response) => {
                if (response.status < 400) {
                    setOriginalMovieList(response.data)
                    setMovieList(response.data);
                }else {
                    setMovieList = [];
                }
             }
        )
    }
    const handleSearchQuery = (query) => {
        setSearchQuery(query);
        if(query != ''){
            const refinedMovieList = movieList.filter((movie) => {
                return movie.title.toLowerCase().includes(query.toLowerCase());
              });
            setMovieList(refinedMovieList)           
        }
        else{
            setMovieList(originalMovieList)
        }

    }
    return(
        <div className="mainCover">
            <NavBar setShowLogin={props.setShowLogin} navBarUsername={props.navBarUsername} setSearchQuery={handleSearchQuery} />
            {showMoviesbutton ?
            <div className="buttonWrapper">
                <button className="showMoviesButton" onClick={handleList}>SEE LIST OF MOVIES</button>
            </div>
            : null}
            <div className="movieGrid">
                {movieList ? movieList.map((movie) => {
                    return <MovieCardComponent className="movieChild" key={movie.id} title={movie.title} imageUrl={movie.image_url}
                    releaseDate={movie.release_date} setDisplayModal={setDisplayModal}/>
                }) : null}

                {displayModal ? <Modal movieData={displayModal} setShow={setDisplayModal}/> : null}
            </div>      
        </div>
    )
}
export default MainPage