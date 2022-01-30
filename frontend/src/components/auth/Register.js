import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BackendDataServices from '../../services/BackendDataServices'

import UserContext from "../../context/UserContext";
import ErrorNotice from './ErrorNotice';

export default function Register() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [error, setError] = useState();

    // Grabbing setUserData state with useContext and then passing our UserContext
    const { setUserData } = useContext(UserContext)
    const navigate = useNavigate()

    // Submit function is creating a new user and then logging in that user immediately then we are storing their data into state and setting local storage with their token
    const submit = async (e) => {
        e.preventDefault();
        try {

            const newUser = { firstName, lastName, email, password, passwordCheck }; // creating our new user
            await BackendDataServices.registerUser(newUser); // posting new user to backend
            setError('Register success')
            // making request to our backend to login the user in
            const loginRes = await BackendDataServices.loginUser({
                email,
                password,
            });
            // setting login response data's token and user data this
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            navigate("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    };

    return (
        <div className="page">
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form className="form" onSubmit={submit}>
                <label htmlFor="register-firstName">First Name</label>
                <input
                    id="register-firstName"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="register-lastName">Last Name</label>
                <input
                    id="register-lastName"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                />

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
                <input
                    type="password"
                    placeholder="Verify Password"
                    onChange={(e) => setPasswordCheck(e.target.value)}
                />

                <input type="submit" value="Register" />
            </form>
        </div>
    );
}
