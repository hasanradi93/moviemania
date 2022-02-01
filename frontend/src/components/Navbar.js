import React from 'react';
import { Link } from 'react-router-dom'
import '../App.css'
import '../css/nav.css'
import AuthOptionsNavBar from './auth/AuthOptionsNavBar';
function Navbar(props) {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark theNavbar" style={{borderBottom: "5px groove red", boxShadow: "10px 10px 10px black"}}>
            <div className="navbar-nav mr-auto" style={{ textAlign: "center", width: "100%", height: "70px" }}>
                <h1 className='moviemania' style={{ color: "white", textAlign: "center", width: "100%", }}>
                    MovieMania
                </h1>
                <li className="nav-item">
                    <AuthOptionsNavBar />
                </li>
            </div>
        </nav>
    );
}

export default Navbar;