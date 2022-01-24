import React from 'react';
import { Link } from 'react-router-dom'
function Navbar(props) {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
                MovieMania
            </a>
            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={"/ComingSoon"} className="nav-link">
                        Coming soon
                    </Link>
                </li>
                <li className="nav-item" >
                    {props.user ? (
                        <a onClick={props.logout} className="nav-link" style={{ cursor: 'pointer' }}>
                            Logout {props.user.name}
                        </a>
                    ) : (
                        <Link to={"/login"} className="nav-link">
                            Login
                        </Link>
                    )}

                </li>
            </div>
        </nav>
    );
}

export default Navbar;