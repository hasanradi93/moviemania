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
            document.getElementById('content').style.marginLeft = "250px"
            stateSidebar = true
        }
        else {
            document.getElementById('content').style.marginLeft = "100px"
            stateSidebar = false
        }
    }
    return (
        <div className="sideclass">
            <SideNav className="sideclass" style={{ transition: "all 0.7s ease-in-out", marginTop: "90px", backgroundColor: "rgba(0, 0, 0, 0.3)", boxShadow: " 12px 10px 10px black" }}>
                <NavItem eventKey="Logo">
                    <NavIcon className="d-none d-md-block bg-dark">
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        <Link to="/">
                            MovieMania
                        </Link>
                    </NavIcon>
                </NavItem>
                <SideNav.Toggle onClick={pushItems} />
                <SideNav.Nav defaultSelected="Home">
                    <NavItem eventKey="Home">
                        <NavIcon>
                            <img src='./home.png' style={{ width: "32px", height: "32px" }}></img>
                        </NavIcon>
                        <NavText>
                            <Link to={"/"} className="nav-link">
                                Home
                            </Link>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="ComingSoon">
                        <NavIcon>
                            <img src='./comingsoon.png' style={{ width: "32px", height: "32px" }}></img>
                        </NavIcon>
                        <NavText>
                            <Link to={"/ComingSoon"} className="nav-link">
                                Coming soon
                            </Link>
                        </NavText>
                    </NavItem>
                    {props.user ? (
                        <NavItem eventKey="Profile">
                            <NavIcon>
                            </NavIcon>
                            <NavText>
                                <Link to={"/Profile"} className="nav-link">
                                    Profile
                                </Link>
                            </NavText>
                        </NavItem>
                    ) : null}
                    <AuthOptionsSideBar />
                </SideNav.Nav>
            </SideNav>
        </div>
    )
}

export default SideBar;