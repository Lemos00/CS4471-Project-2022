import React from "react";
import "./NavBar.css"

const NavBar = ({setShowLogin}) => {

    const handleLogout = (state) => {
        setShowLogin(state);
    }
    return (
        <div className="NavBarCover">
            <nav className="nav">
                <div className="siteTitle">Book-a-Movie</div>
                <ul className="itemsList">
                    {/* <li className="listItem">
                        <img className="navImage" src="https://cdn1.iconfinder.com/data/icons/random-115/24/person-512.png" alt="" />
                    </li> */}
                    <li className="listItem">Username</li>
                    <li className="listItem" onClick = {() => {handleLogout(true)}}>Logout</li>
                </ul>
            </nav>
        </div>
     );
}
 
export default NavBar;