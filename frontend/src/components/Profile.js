import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react"
import BackendDataServices from "../services/BackendDataServices"
import useHidePageInformation from '../hooks/useHidePageInformation';



function Profile(props) {
    useHidePageInformation(); // Custom hook

    const userId = useParams().id
    console.log(userId)
    const [user, setUser] = useState('')

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
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <img src={user.profile} alt="Profile Pic" width='200px' heigth='200px' ></img>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type='text' value={user.username}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type='email' value={user.email}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>


    );

}

export default Profile;