import React from 'react';
import { Link } from 'react-router-dom'
function Navbar(props) {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark theNavbar">
            <div className="navbar-nav mr-auto" style={{textAlign: "center", width : "100%"}}>
                    <h1 style={{color: "white", textAlign: "center", width: "100%", fontFamily: "bebasneue"}}>
                    MovieMania
                    </h1>
                <li className="nav-item">
                    <Link to={"/Profile"} className="nav-link">
                        profile
                    </Link>
                </li>
            </div>
        </nav>
    );
}

export default Navbar;