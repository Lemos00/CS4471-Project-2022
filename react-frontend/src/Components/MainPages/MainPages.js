import React from "react";
import StaffPage from "../StaffPage/StaffPage";

// MAIN COMPONENT, LOGIN PAGE MAIN
const MainPages = ({setShowLogin, pageToShow}) => {
    // setShowLogin passed to login component, on the event of logoff
    return (
        <div className="mainPageCover">
            
            {pageToShow === "admin" ? <StaffPage setShowLogin={setShowLogin}/> 
                : <StaffPage setShowLogin={setShowLogin}/>}
        
        </div>
     );
}
 
export default MainPages;