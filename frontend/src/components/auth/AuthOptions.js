import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
    console.log("UserContext", UserContext)

    const { userData, setUserData } = useContext(UserContext);
    console.log("userData", userData)
    // useNavigate interacts with the url is it also considered an array
    const navigate = useNavigate();

    // Here we are pushing two routes in the navigate  variable from above
    const register = () => navigate("/register");
    const login = () => navigate("/login");
    const profile = () => navigate("/profile");
    // Upon logout we are setting the token and user to undefined and then setting localStorage back to an empty string
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("auth-token", "")
    };

    let username = null
    if (userData)
        username = userData.user

    return (
        <nav className="auth-options">
            {(username) ? (
                <>
                    <button onClick={profile}>Profile</button>
                    <button onClick={logout}>Log out</button>
                </>
            ) : (
                <>
                    <button onClick={register}>Register</button>
                    <button onClick={login}>Log in</button>
                </>
            )}
        </nav>
    );
}
