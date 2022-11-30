import React from "react";
import "./NavBar.css"

// MAIN COMPONENT, LOGIN PAGE MAIN
const NavBar = ({setShowLogin}) => {

    const handleLogout = (state) => {
        setShowLogin(state);
    }
    return (
        <div className="NavBarCover">
            <nav className="nav">
                <div className="siteTitle">Site name</div>
                <ul className="itemsList">
                    <li className="listItem">Image here</li>
                    <li className="listItem">Username</li>
                    <li className="listItem" onClick = {() => {handleLogout(true)}}>Logout</li>
                </ul>
            </nav>
        </div>
     );
}
 
export default NavBar;