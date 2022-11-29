import React from 'react'
import "./Modal.css"

const Modal = props => {
    return(
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Movie Name</h4>
                </div>
                <div className="modal-body">
                    Movie Desc
                </div>
                <div className="modal-body2">
                    Seat Chart/Num tickets
                </div>
                <div className="modal-footer">
                    <button className="button1">Pay</button>
                    <button className="button2">Close</button>
                </div>
            </div>
        </div>
    )
}
export default Modal