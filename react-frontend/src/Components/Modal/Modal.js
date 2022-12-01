import React from 'react'
import "./Modal.css"

const Modal = props => {
    console.log(props);
    if (!props) {
        return null;
    }

    const handleClick = event => {
        props.setShow(false);
        console.log(event);
      };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Movie Name</h4>
                </div>
                <div className="modal-body">
                    Movie Desc
                </div>
                <div className="modal-body2">
                    Number of tickets: 
                    <select name="cars" id="cars" onClick='change()'>
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
                    Total: 
                </div>
                <div className="modal-body4">
                    <label id="lblName"></label>
                </div>
                <div className="modal-footer">
                    <button onClick={() => {handleClick(true);}} className="payButton">Pay</button>
                    <button onClick={() => {handleClick(true);}} className="closeButton">Close</button>
                </div>
                
            </div>
                <script>
                    function change(){
                        document.getElementById('lblName').innerHTML = cars.getElementById
                    }
                </script>
        </div>
    )
}
export default Modal