import { React, useEffect, useState } from 'react';
import { renderMatches } from 'react-router-dom';
import BackendDataServices from "../services/BackendDataServices"
import FunctionTools from "../services/FunctionTools";
import "../css/profile.css";
function AllTickets() {
    const [users, setUsers] = useState([])
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
        BackendDataServices.getUsersAndCountTickets()
            .then(response => {
                console.log(response.data)
                setUsers(response.data.users)
                setTickets(response.data.tickets)
                if (response.data.length !== 0)
                    setError(null)
                else
                    setError('No Users')
            })
            .catch(err => {
                console.log(err)
                setError(err.message)
            })
    }, [])

    return <div>
        {console.log(tickets)}
        <h1 className={{ errorStyle }}>{error}</h1>
        <div className="usersSection">
            <table>
                <thead><th>Username</th><th>Email</th><th>Tickets</th></thead>
                <tbody>
                    {users ? users.map((user, i) => {
                        return <tr key={i}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{tickets[i]}</td>
                        </tr>
                    }) : ''}
                </tbody>

            </table>
        </div>
    </div>;
}

export default AllTickets;
