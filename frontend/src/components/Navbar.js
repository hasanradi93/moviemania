import React from 'react';
import '../App.css'
import '../css/nav.css'
function Navbar(props) {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark theNavbar" style={{ borderBottom: "10px groove #870F06", boxShadow: "10px 10px 10px black", zIndex: "20"}}>
            <div className="navbar-nav mr-auto" style={{ textAlign: "center", width: "100%", height: "70px" }}>
                <h1 className='moviemania' style={{ color: "white", textAlign: "center", width: "100%", }}>
                    MovieMania
                </h1>
                {/* <img className='moviemania' style={{ color: "white", textAlign: "center", margin: "auto" }} src='../moviemaniaTitle.png'></img> */}
            </div>
        </nav>
    );
}

export default Navbar;