import { React, useEffect, useState } from 'react';
import { renderMatches } from 'react-router-dom';
import BackendDataServices from "../services/BackendDataServices"

 


function AllTickets() {
    const [tickets, setTickets] = useState([])
    const [error, setError] = useState(null)
    const errorStyle = {
        fontSize: '44px',
        color: 'red',
        backgroundColor: 'green',
        width: '100%',
        height: '50px'
    }
    useEffect(() => {
        BackendDataServices.getTickets()
            .then(response => {
                setTickets(response.data)
                if (response.data.length === 0)
                    setError(null)
                else
                    setError('No Tickets Today')
            })
            .catch(err => {
                console.log(err)
                setError(err.message)
            })
    }, [])

    return  <div>
        {console.log("this is tickets", tickets)}
        <h1 className={{ errorStyle }}>{error}</h1>
        {tickets ? tickets.map((ticket, i) => <li key={i}>{ticket.room.name}</li>) : <strong>{tickets.price}</strong>}


    </div>;
}

export default AllTickets;
