import { useParams ,Link } from 'react-router-dom'
import React, { useState, useEffect , useContext } from "react"
import BackendDataServices from "../services/BackendDataServices"
import useHidePageInformation from '../hooks/useHidePageInformation'
import UserContext from "../context/UserContext"
import "../css/profile.css";


function Profile(props) {
    //  useHidePageInformation(); // Custom hook

    const userId = useParams().id
    console.log(userId)
    const [user, setUser] = useState('')
//    const { userData } = useContext(UserContext);

    useEffect(() => {
        retrieveUser()
    }, [])

    const retrieveUser = () => {
        BackendDataServices.getUserDataById(userId)
            .then(response => {
                console.log("dataa", response.data)
                setUser(response.data)
                console.log(user)

            })
            .catch(e => {
                console.log(e)
            })
    }


    return (

        <div>
            <div className='profileData'> 
            <div>
               
                <img src='./edit.png'></img>
                
            </div>
            <div>
            <img src={user.profile} alt="Profile Pic" width='300px' heigth='300px' ></img>
            </div>
            </div>
            <div className='profileData'>
            <div>
               
                <img src='./edit.png'></img>
            
            </div>
                <form>
                    <input type='text' value={user.username} className='input' readOnly></input>         
                </form>
            </div>
       </div>

    );

}

export default Profile;