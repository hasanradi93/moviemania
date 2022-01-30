import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BackendDataServices from '../../services/BackendDataServices'
import UserContext from "../../context/UserContext";
import ErrorNotice from "./ErrorNotice";

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    // Grabbing setUserData state with useContext and then passing our UserContext
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const submit = async (e) => {
        try {
            e.preventDefault();
            const loginUser = { email, password };
            // making request to our backend to login the user in
            const loginRes = await BackendDataServices.loginUser(loginUser)
            setError('Login Success')
            // setting login response data's token and user data this
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            //save the Token in localstorage
            localStorage.setItem("auth-token", loginRes.data.token);
            navigate("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <div className="page">
            <h2>Log In</h2>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <form className="form" onSubmit={submit}>
                <label htmlFor="register-email">Email</label>
                <input
                    id="register-email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="register-password">Password</label>
                <input
                    id="register-password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="Log in" />
            </form>
        </div>
    );
}
