import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react"
import BackendDataServices from "../services/BackendDataServices"




function UserTicket(props) {
    const  userId  = useParams().id
    console.log(userId)
    const [user, setUser] = useState('')

    useEffect(() => {
        retrieveUser()
    }, [])

    const retrieveUser = () => {
        BackendDataServices.getUserTicketById(userId)
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
            User Ticket
        </div>

        
    );

}

export default UserTicket;