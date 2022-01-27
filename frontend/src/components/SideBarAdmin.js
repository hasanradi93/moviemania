import React from 'react';
import { Link } from 'react-router-dom'
import { nav } from "react-bootstrap"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
function SideBarAdmin(props) {
    return (
        <SideNav>
            <NavItem eventKey="Home">
                <NavIcon className="d-none d-md-block bg-dark">
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    <Link to="/">
                        MovieMania
                    </Link>
                </NavIcon>
            </NavItem>
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="Home">
                <NavItem eventKey="Tickets">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        <Link to={"TheTickets/"} className="nav-link">
                            Tickets
                        </Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="Movies">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        <Link to={"Movies/"} className="nav-link">
                            Movies
                        </Link>
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    )
}

export default SideBarAdmin;