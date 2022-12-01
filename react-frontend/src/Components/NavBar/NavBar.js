import React from "react";
import "./NavBar.css"

const NavBar = ({setShowLogin, navBarUsername}) => {

    const handleLogout = (state) => {
        setShowLogin(state);
    }
    return (
        <div className="NavBarCover">
            <nav className="nav">
                <div className="siteTitle">Book-a-Movie</div>
                <ul className="itemsList">
                    <li className="listItem">{navBarUsername}</li>
                    <li className="listItem" onClick = {() => {handleLogout(true)}}>Logout</li>
                </ul>
            </nav>
        </div>
     );
}
 
export default NavBar;