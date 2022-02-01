import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"
import UserContext from "../../context/UserContext"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import { Link } from 'react-router-dom'
export default function AuthOptionsNavBar() {
    const { userData, setUserData } = useContext(UserContext);
    // console.log("userData0", userData)
    // useNavigate interacts with the url is it also considered an array
    const navigate = useNavigate();

    const profile = () => navigate("/profile")
    // Upon logout we are setting the token and user to undefined and then setting localStorage back to an empty string
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("auth-token", "")
        navigate("/")
    };

    return (
        <nav className="auth-options">
            {(userData.user) ? (
                <>
                    <button onClick={profile}>Profile</button>
                    <button onClick={logout}>Log out</button>
                </>
            ) : ''}
        </nav>
    );
}
