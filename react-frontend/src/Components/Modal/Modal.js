import React from 'react'
import "./Modal.css"

const Modal = props => {
    if (!props.show){
        return null
    }

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
                    <button onClick={props.onPay} className="button1">Pay</button>
                    <button onClick={props.onClose} className="button2">Close</button>
                </div>
            </div>
        </div>
    )
}
export default Modal