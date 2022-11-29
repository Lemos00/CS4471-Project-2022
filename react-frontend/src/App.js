import React, {useState} from "react"
import Modal from './Components/Modal/Modal'
import payModal from './Components/payModal/payModal'

export default function App(){
  const [show, setShow] = useState(false)

  return(
    <div className="App">
      <h4>movie picture</h4>
      <button onClick={() => setShow(true)}>Movie Name</button>
      <Modal onClose={() => setShow(false)} show={show}/> 
      <Modal onPay={() => setShow(false)} show={show}/> 
      
    </div>
  );
}