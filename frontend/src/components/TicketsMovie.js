import { React, useEffect, useState } from 'react';
import BackendDataServices from "../services/BackendDataServices"
import FunctionTools from "../services/FunctionTools";
import "../css/profile.css";
import { useParams } from 'react-router-dom'

function TicketsMovie() {
    const [tickets, setTickets] = useState([])
    const [error, setError] = useState(null)
    const movieId = useParams().id
    const errorStyle = {
        fontSize: '44px',
        color: 'red',
        backgroundColor: 'green',
        width: '100%',
        height: '50px'
    }
    useEffect(() => {
        BackendDataServices.getMovieTickets(movieId)
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

    function formatAMPM() {
        let date = new Date();
        var hours = date.getHours();
        // var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        // minutes = minutes < 10 ? '0'+minutes : minutes;
        //var strTime = hours + ':' + minutes + ' ' + ampm;
        var strTime = hours
        return strTime;
    }

    function checkAmPM() {
        let date = new Date();
        var hours = date.getHours();
        var ampm = hours >= 12 ? 1 : 0;
        return ampm;
    }

    const checkTheTime = (timeTicket) => {
        let sTime = timeTicket.split(':')[0]
        if (checkAmPM()) {
            if (Number(sTime) > Number(formatAMPM()))
                return true
            else
                return false
        }
        else
            return false
    }

    const checktheDay = (day) => {
        const nbDays = Number(FunctionTools.daysLeft(new Date(), day)) + 1
        console.log("adsdasd", nbDays, "day", day)
        return nbDays
    }

    return <div>
        {console.log(tickets)}
        <h1 className={{ errorStyle }}>{error}</h1>
        <div className="ticketsSection">
            {tickets ? tickets.map((ticket, i) => {
                return (<div key={i} className="prTickets" style={{ marginTop: "30px" }}><div className="containerImageDetails"><div className="containerImage"><img src={ticket.movieId.photo} width='180px' height='280px' alt={ticket.movieId.title} /></div><div className="dataTicket"><div className="containerDetailsTicket"><h1 className="card-title">{ticket.movieId.title}</h1><div className="card-text"><strong className="strongTicket"> Username: </strong>{ticket.userId.username}<br></br><strong className="strongTicket"> Ticket Numer: </strong>{ticket._id}<br></br><strong className="strongTicket"> Date: </strong>{FunctionTools.formatDate(ticket.date)}<br></br><strong className="strongTicket"> Time: </strong>{ticket.time}<br></br><strong className="strongTicket"> Room: </strong>{ticket.roomId.name}<br></br><strong className="strongTicket"> Seat : </strong>{ticket.blockName} - {ticket.seatNumber}<br></br><strong className="strongTicket"> Technology : </strong>{ticket.technologyId.name}<br></br></div></div></div><div><span className="btnTicketCancel" style={{ paddingTop: '4px' }}><strong className="statusTicket" style={{ color: 'wheat !important' }}> Status : </strong>{ticket.cancelTicket ? 'Canceled' : (checktheDay(ticket.date) < 0 ? 'Finished' : ((checktheDay(ticket.date) > 0 ? 'Running' : (checkTheTime(ticket.time) ? 'Running' : 'Finished'))))}<br></br></span></div></div></div>)
            }) : ""}
        </div>
    </div>;
}

export default TicketsMovie;
