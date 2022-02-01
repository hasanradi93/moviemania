import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"
import UserContext from "../../context/UserContext"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import { Link } from 'react-router-dom'
export default function AuthOptionsSideBar() {
    const { userData, setUserData } = useContext(UserContext);

    return (
        <nav className="auth-options">
            {(!userData.user) ? (
                <>
                    <NavItem eventKey="Login">
                        <NavIcon>
                            <img src='./login.png' style={{ width: "40px", height: "40px" }}></img>
                        </NavIcon>
                        <NavText>
                            <Link to={"/Login"} className="nav-link">
                                Login
                            </Link>
                        </NavText>
                    </NavItem>
                </>
            ) : ''}
        </nav>
    );
}
