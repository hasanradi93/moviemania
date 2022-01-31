import React from 'react';
import { Link } from 'react-router-dom'
import AuthOptions from './auth/AuthOptions';
import '../App.css'
import '../css/nav.css'
function Navbar(props) {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark theNavbar">
            <div className="navbar-nav mr-auto" style={{ textAlign: "center", width: "100%", height: "70px"}}>
                <h1 className='moviemania' style={{ color: "white", textAlign: "center", width: "100%",}}>
                    MovieMania
                </h1>
                <li className="nav-item">
                    <AuthOptions />
                </li>
            </div>
        </nav>
    );
}

export default Navbar;