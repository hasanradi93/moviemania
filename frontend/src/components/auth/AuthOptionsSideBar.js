import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"
import UserContext from "../../context/UserContext"
import { Link } from 'react-router-dom'
import { nav } from "react-bootstrap"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import '../../css/nav.css'
export default function AuthOptionsSideBar() {
    const { userData, setUserData } = useContext(UserContext);
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
            <>
                <NavItem eventKey="Profile">
                    <NavIcon>
                        <img src='./profile.png' style={{ width: "32px", height: "32px" }}></img>
                    </NavIcon>
                    <NavText>
                        <Link to={"/Profile"} className="nav-link">
                            <span className='pages'>Profile</span>
                        </Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="Logout">
                    <NavIcon>
                        <img src='./logout.png' style={{ width: "32px", height: "32px" }}></img>
                    </NavIcon>
                    <NavText>
                        <Link onClick={logout} className="nav-link">
                            <span className='pages'>Logout</span>
                        </Link>
                    </NavText>
                </NavItem>
            </>
        ) : (
            <>
                <NavItem eventKey="Login">
                    <NavIcon>
                        <img src='./login.png' style={{ width: "32px", height: "32px" }}></img>
                    </NavIcon>
                    <NavText>
                        <Link to={"/Login"} className="nav-link">
                            <span className='pages'>Login</span>
                        </Link>
                    </NavText>
                </NavItem>
            </>
        )

    );
}
