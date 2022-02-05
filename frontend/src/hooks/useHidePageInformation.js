// If user is not logged in they will be redirected to the login page. This act as a validation to hide webpages from users who have not signed up.
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function useHidePageInformation() {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("auth-token"); // grabbing JWT token from localStorage
        if (token === null) {
            navigate("/login");
        }
    }, []);
}
