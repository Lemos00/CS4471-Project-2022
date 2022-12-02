import React from 'react'
import Modal from '../Modal/Modal.js'
import MovieCardComponent from '../MovieCardComponent/MovieCardComponent.js'
import Axios from "axios";

const MainPage = props => {
    
    const [movieList, setMovieList] = React.useState([]);

    // React.useEffect(() => {
    //     const result = Axios.get("http://127.0.0.1:5000/movie/list").then(
    //         (response) => {
    //             if (response.status < 400) {
    //                 setMovieList(response.data);
    //                 console.log(movieList);
    //             }
    //          }
    //     )
    // }, [])



    const handleList = () => {
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
                <div className="movieGrid">
                    {movieList ? movieList.map((movie) => {
                        console.log("movie: " + movie);
                        return <MovieCardComponent key={movie.id} title={movie.title} imageUrl={movie.image_url}
                        releaseDate={movie.release_date}/>
                    }) : null}
                </div>
            <button onClick={handleList}>SEE LIST OF MOVIES</button>

            {movieList ? <p>hello</p> : null}
             
        </div>
    )
}
export default MainPage