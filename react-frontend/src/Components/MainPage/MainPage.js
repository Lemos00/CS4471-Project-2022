import React, {useState} from 'react'
import Modal from '../Modal/Modal.js'
import MovieCardComponent from '../MovieCardComponent/MovieCardComponent.js'

const MainPage = props => {
    const [show, setShow] = useState(false)
    return(
        <div className="mainCover">
            <MovieCardComponent title="hello" imageUrl="https://www.sonypictures.com/sites/default/files/styles/max_560x840/public/title-key-art/morbius_onesheet_1400x2100_he.jpg?itok=-jQVkWIe"
                releaseDate="11-09-02" setShow={setShow}/>
            <MovieCardComponent title="hello" imageUrl="https://upload.wikimedia.org/wikipedia/en/d/df/BarbieDancingPrincesses.jpg"
                releaseDate="11-09-02" setShow={setShow}/>
             {show ? <Modal setShow = {setShow}/> : null}
             
        </div>
    )
}
export default MainPage