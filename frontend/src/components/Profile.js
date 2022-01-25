import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react"
import BackendDataServices from "../services/BackendDataServices"




function Profile(props) {
    const  userId  = useParams().id
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
            {user.email}
        </div>
    );

}

export default Profile;