import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import BackendDataServices from '../../services/BackendDataServices'
import UserContext from "../../context/UserContext";
import ErrorNotice from "./ErrorNotice";
import "../../css/auth.css";
import "../../css/authlogin.css";
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
            if (email && password) {
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
                let intervalNav = setInterval(() => {
                    navigate("/")
                    clearInterval(intervalNav)
                }, 3000)
            }
            else
                setError("Not all fields have been intered!")
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };
    return(
        <div className="shape row justify-content-center">
             
            <img className="LogoLandscape" alt="logo" src={window.location.origin + '/moviemaniaTitlepng.png'}></img>
            
            
            <form className="form lab" onSubmit={submit}>
                 {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
                <label htmlFor="email">Enter Your E-mail:</label>
                    <input className="input" type="email" id="register-email" name="email" onChange={(e) => setEmail(e.target.value)}></input>
                <label htmlFor="password">Enter Your Password:</label>
                    <input className="input" type="password" id="register-password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                        <label>Remember me
                             <input type="checkbox" checked="unChecked"></input>
                        </label>
                           
                        
                <div>
	            	<button type="submit" class="btnSubmit">Submit</button>
	            </div>
                <Link className="createAccount" to={"/Register"}>Dont Have an Account? Please Register</Link><br></br>

            </form>
</div> 
 
               
    );
}