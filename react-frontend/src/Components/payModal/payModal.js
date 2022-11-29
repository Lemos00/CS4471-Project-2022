import React from 'react'
import "./payModal.css"

const payModal = payProps => {
    if (!payProps.show){
        return null
    }

    return(
        <div className="payModal">
            <div className="payModal-content">
                <div className="payModal-header">
                    <h4 className="payModal-title">Payment Information</h4>
                </div>
                <div className="payModal-body">
                    Please input credit card details:
                </div>
                <div className="payModal-body2">
                    credit card input stuff
                </div>
                <div className="payModal-footer">
                    <button onClick={payProps.onClose} className="button3">Pay</button>
                    <button onClick={payProps.onClose} className="button4">Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default payModal