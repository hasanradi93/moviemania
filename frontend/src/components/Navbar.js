import React from 'react';
import { Link } from 'react-router-dom'
function Navbar(props) {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
                MovieMania
            </Link>
            <div className="navbar-nav mr-auto">
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