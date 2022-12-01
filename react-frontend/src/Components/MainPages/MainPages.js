import React from "react";
import StaffPage from "../StaffPage/StaffPage";
import MainPage from "../MainPage/MainPage";

// MAIN COMPONENT, LOGIN PAGE MAIN
const MainPages = ({setShowLogin, pageToShow}) => {
    // setShowLogin passed to login component, on the event of logoff
    return (
        <div className="mainPageCover">
            
            {pageToShow[0] === "admin" ? <StaffPage setShowLogin={setShowLogin} navBarUsername={pageToShow[1]}/> 
                : <MainPage setShowStaff={setShowStaff}/>}
            </div>
     );
}
 
export default MainPages;