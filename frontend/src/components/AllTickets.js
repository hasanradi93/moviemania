import { React, useEffect, useState } from 'react';
import { renderMatches } from 'react-router-dom';
import BackendDataServices from "../services/BackendDataServices"
import FunctionTools from "../services/FunctionTools";
import "../css/profile.css";
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
                if (response.data.length !== 0)
                    setError(null)
                else
                    setError('No Tickets Today')
            })
            .catch(err => {
                console.log(err)
                setError(err.message)
            })
    }, [])

    return <div>
        {console.log(tickets)}
        <h1 className={{ errorStyle }}>{error}</h1>
        <div className="ticketsSection">
            {tickets ? tickets.map((ticket, i) => {
                return (<div key={i} className="containerMovie" style={{ marginTop: "30px" }}><div className="containerImageDetails"><div className="morePadding containerImage"><img src={ticket.movieId.photo} width='180px' height='280px' alt={ticket.movieId.title} /></div><div className="dataTicket"><div className="containerDetailsTicket"><h1 className="card-title">{ticket.movieId.title}</h1><div className="card-text"><strong className="strongTicket"> Username: </strong>{ticket.userId.username}<br></br><strong className="strongTicket"> Ticket Numer: </strong>{ticket._id}<br></br><strong className="strongTicket"> Date: </strong>{FunctionTools.formatDate(ticket.date)}<br></br><strong className="strongTicket"> Time: </strong>{ticket.time}<br></br><strong className="strongTicket"> Room: </strong>{ticket.roomId.name}<br></br><strong className="strongTicket"> Seat : </strong>{ticket.blockName} - {ticket.seatNumber}<br></br><strong className="strongTicket"> Technology : </strong>{ticket.technologyId.name}<br></br><strong className="strongTicket"> Status : </strong>{ticket.cancelTicket ? 'Canceled' : (FunctionTools.daysLeft(new Date(), ticket.date) > -1 ? 'Running' : 'Finished')}<br></br></div></div></div></div></div>)
            }) : ""}
        </div>
    </div>;
}

export default AllTickets;
