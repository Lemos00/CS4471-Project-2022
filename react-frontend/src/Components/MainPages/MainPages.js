import React from "react";
import StaffPage from "../StaffPage/StaffPage";

// MAIN COMPONENT, LOGIN PAGE MAIN
const MainPages = (setShowLogin) => {

    const [showStaff, setShowStaff] = React.useState(false);

    // setShowLogin passed to login component, on the event of logoff
    return (
        <div className="mainPageCover">
            
            {showStaff ? <StaffPage setShowStaff={setShowStaff}/> 
                : <StaffPage setShowStaff={setShowStaff}/>}
        
        </div>
     );
}
 
export default MainPages;