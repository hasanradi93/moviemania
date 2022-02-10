import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom"
import UserContext from "../../context/UserContext"
import { nav } from "react-bootstrap"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import '../../css/nav.css'
export default function AuthOptionsSideBar() {
    const { userData, setUserData } = useContext(UserContext)
    const navigate = useNavigate();
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("auth-token", "")
        navigate("/")
    };
    return (

        (userData.user) ? (
            (userData.user.role === 2) ? (<>
                <NavItem eventKey="All Movies">
                    <NavIcon>
                        <img src={window.location.origin + '/allMovies.png'} style={{ width: "32px", height: "35px" }}></img>
                    </NavIcon>
                    <NavText>
                        <Link to={"AdminPanel/Movies"} className="nav-link">
                            All Movies
                        </Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="All Tickets">
                    <NavIcon>
                        <img src={window.location.origin + '/allTickets.png'} style={{ width: "32px", height: "35px" }}></img>
                    </NavIcon>
                    <NavText>
                        <Link to={"AdminPanel/Tickets"} className="nav-link">
                            All Tickets
                        </Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="All Users">
                    <NavIcon>
                        <img src={window.location.origin + '/allUsers.png'} style={{ width: "32px", height: "35px" }}></img>
                    </NavIcon>
                    <NavText>
                        <Link to={"AdminPanel/AllUsers"} className="nav-link">
                            All Users
                        </Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="Logout">
                    <NavIcon>
                        <img alt='' src={window.location.origin + '/logout.png'} style={{ width: "32px", height: "35px" }}></img>
                    </NavIcon>
                    <NavText onClick={logout}>
                        <Link to={""} className="nav-link">
                            <span className='pages'>Logout</span>
                        </Link>
                    </NavText>
                </NavItem>
            </>) : (<>
                <NavItem eventKey="Profile">
                    <NavIcon>
                        <img alt='' src={window.location.origin + '/login.png'} style={{ width: "42px", height: "42px" }}></img>
                    </NavIcon>
                    <NavText>
                        <Link to={"/Profile"} className="nav-link">
                            <span className='pages'>Profile</span>
                        </Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="Logout">
                    <NavIcon>
                        <img alt='' src={window.location.origin + '/logout.png'} style={{ width: "32px", height: "35px", marginLeft: "5px" }}></img>
                    </NavIcon>
                    <NavText onClick={logout}>
                        <Link to={""} className="nav-link">
                            <span className='pages'>Logout</span>
                        </Link>
                    </NavText>
                </NavItem>
            </>)
        ) : (
            <>
                <NavItem eventKey="Login">
                    <NavIcon>
                        <img alt='' src={window.location.origin + '/login.png'
                        } style={{ width: "42px", height: "42px" }}></img >
                    </NavIcon >
                    <NavText>
                        <Link to={"/Login"} className="nav-link">
                            <span className='pages'>Login</span>
                        </Link>
                    </NavText>
                </NavItem >
            </>
        )


    )
}
