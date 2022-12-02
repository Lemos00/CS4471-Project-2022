import React from 'react'
import "./Modal.css"
import OperationSuccessfulComponent from '../OperationSuccessfulComponent/OperationSuccessfulComponent';

const Modal = (props) => {
    const [success, setSuccess] = React.useState(false);
    if (!props) {
        return null;
    } 

    const handleClose = () => {
        props.setShow(false);
    }
    const handleClick = event => {
        // props.setShow(false);
        setSuccess(true);
      };

    const handleCost = event => {
        document.getElementById("lblName").innerHTML = "Total: $" + (document.getElementById("tickets").selectedIndex + 1)*8.5
    };

    
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title">{props.movieData.title}</h1>
                    <img src={props.movieData.imageUrl} alt="" />
                </div>
                <hr></hr>
                <div className="modal-body">
                Release date: {props.movieData.releaseDate}
                </div>
                <hr></hr>
                <div className="modal-body2">
                    <label>Please select the amount of tickets you would like to purchase (maximum 15 per purchase). Each ticket is $8.50. Taxes are included. </label> 
                    <hr></hr>
                    <select name="tickets" id="tickets" onChange={() => {handleCost(true);}}>
                        <option value="option1">1</option>
                        <option value="option2">2</option>
                        <option value="option3">3</option>
                        <option value="option4">4</option>
                        <option value="option5">5</option>
                        <option value="option6">6</option>
                        <option value="option7">7</option>
                        <option value="option8">8</option>
                        <option value="option9">9</option>
                        <option value="option10">10</option>
                        <option value="option11">11</option>
                        <option value="option12">12</option>
                        <option value="option13">13</option>
                        <option value="option14">14</option>
                        <option value="option15">15</option>
                    </select>
                </div>
                <div className="modal-body3">
                    <hr></hr>

                </div>
                <div className="modal-body4">
                    <label id="lblName">Total: $8.50 </label> 
                </div>
                <div className="modal-footer">
                    <div className="btn">
                        <button id="pay" onClick={() => {handleClick(true);}} >Pay</button>
                        <button id="close" onClick={() => {handleClose(true);}} >Close</button>
                    </div>
                </div>
                {success ? <OperationSuccessfulComponent message={"successfully Emailed your tickets"}/> : null}
            </div>
        </div>
        
    )
    
}
export default Modal