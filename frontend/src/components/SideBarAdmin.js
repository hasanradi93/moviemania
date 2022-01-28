import React from 'react';
import { Link } from 'react-router-dom'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import '../css/nav.css'
function SideBarAdmin(props) {
    let stateSidebar = false
    const pushItemsAdmin = () => {
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
        <SideNav style={{ transition: "all 0.7s ease-in-out" }}>
            <NavItem eventKey="Home">
                <NavIcon className="d-none d-md-block bg-dark">
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    <Link to="/">
                        MovieMania
                    </Link>
                </NavIcon>
            </NavItem>
            <SideNav.Toggle onClick={pushItemsAdmin} />
            <SideNav.Nav defaultSelected="Tickets">
                <NavItem eventKey="Tickets">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        <Link to={"Tickets"} className="nav-link">
                            Tickets
                        </Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="Movies">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        <Link to={"Movies"} className="nav-link">
                            Movies
                        </Link>
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    )
}

export default SideBarAdmin;