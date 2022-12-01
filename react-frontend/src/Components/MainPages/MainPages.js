import React from "react";
import StaffPage from "../StaffPage/StaffPage";

// MAIN COMPONENT, LOGIN PAGE MAIN
const MainPages = ({setShowLogin, pageToShow}) => {
    // setShowLogin passed to login component, on the event of logoff
    return (
        <div className="mainPageCover">
            
            {pageToShow[0] === "admin" ? <StaffPage setShowLogin={setShowLogin} navBarUsername={pageToShow[1]}/> 
                : <StaffPage setShowLogin={setShowLogin} navBarUsername={pageToShow[1]}/>}
        
        </div>
     );
}
 
export default MainPages;