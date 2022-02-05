import React from 'react';
import { Link } from 'react-router-dom'
import { nav } from "react-bootstrap"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import AuthOptionsSideBar from './auth/AuthOptionsSideBar'
import '../css/nav.css'
function SideBar(props) {
    let stateSidebar = false
    const pushItems = () => {
        if (stateSidebar === false) {
            document.getElementById('content').style.marginLeft = "300px"
            stateSidebar = true
        }
        else {
            document.getElementById('content').style.marginLeft = "150px"
            stateSidebar = false
        }
    }
    return (
        <div className="sideclass">
            <SideNav className="sideclass" style={{
                transition: "all 0.7s ease-in-out", paddingTop: "9%", marginTop: "", padding: "1%",
                backgroundColor: 'black', boxShadow: " 12px 10px 10px black", position: "fixed", zIndex: "10"
            }}>
                <NavItem eventKey="Logo">
                    <NavIcon className="d-none d-md-block bg-dark">
                        <Link to="/">
                            <img className='logo' src='./Mlogo.png' />
                        </Link>
                    </NavIcon>
                </NavItem>
                <SideNav.Toggle onClick={pushItems} />
                <SideNav.Nav defaultSelected="Home">
                    <NavItem eventKey="Home">
                        <NavIcon>
                            <img src='./home.png' style={{ width: "35px", height: "35px" }}></img>
                        </NavIcon>
                        <NavText>
                            <Link to={"/"} className="nav-link">
                                <span className='pages'>Home</span>
                            </Link>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="ComingSoon">
                        <NavIcon>
                            <img src='./comingsoon.png' style={{ width: "32px", height: "32px" }}></img>
                        </NavIcon>
                        <NavText>
                            <Link to={"/ComingSoon"} className="nav-link">
                                <span className='pages'>Coming soon</span>
                            </Link>
                        </NavText>
                    </NavItem>
                    <AuthOptionsSideBar />
                </SideNav.Nav>
            </SideNav>
        </div>
    )
}

export default SideBar;