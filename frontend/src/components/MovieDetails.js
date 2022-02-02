import React, { useState, useEffect, useRef } from "react"
import BackendDataServices from "../services/BackendDataServices"
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import FunctionTools from '../services/FunctionTools'
import '../css/movieDetails.css'



const MoviesDetails = props => {
    const [tickets, setTickets] = useState([])
    const [movie, setMovie] = useState([])
    const [day, setDay] = useState('')
    const [roomId, setRoom] = useState(null)
    const [time, setTime] = useState(null)
    const [chosenDayIndex, setChosenDayIndex] = useState(null)
    const [chosenRoomIndex, setChosenRoomIndex] = useState(null)
    const [chosenTimeIndex, setChosenTimeIndex] = useState(null)
    const [chosenTechIndex, setChosenTechIndex] = useState(null)
    const [days, setDays] = useState([])
    const [rooms, setRooms] = useState([])
    const [times, setTimes] = useState([])
    const [dataSelected, setDataSelected] = useState([])
    const [seatsForm, setSeatsForm] = useState(null)
    const [technology, setTechnology] = useState([])
    const [technologies, setTechnologies] = useState([])
    const movieId = useParams().id
    let daySelected = ''
    useEffect(() => {
        retrieveMovie()
    }, [])

    const countSeats = () => { }

    const retrieveMovie = () => {
        BackendDataServices.get(movieId)
            .then(response => {
                setMovie(response.data)
                console.log(response.data)
                //get days from the movie
                let arrDays = response.data[0].dateTime.map((dateTime) => dateTime.day)
                //get grouped days
                let groupedDays = Array.from(new Set(arrDays.map(JSON.stringify))).map(JSON.parse);
                // daySelected = groupedDays[0]
                setDays(groupedDays)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const Technology = (dayData, index) => {
        console.log(dayData)
        if (movie[0]) {
            const techData = movie[0].dateTime.filter((dateTime) => {
             if (dateTime.day === dayData)
                    return dateTime
            })
            console.log(techData)
            setDay(dayData)
            setChosenDayIndex(index)
            setTechnologies(techData)
        }
        
    }
    

    const getRoomsTechs = (techData, index) => {
        if (movie[0]) {
            const roomsData = movie[0].dateTime.filter((dateTime) => {
                if (dateTime.day === day && dateTime.technologyId.name === techData)
                        return dateTime
            })
            console.log(roomsData)
            setChosenTechIndex(index)
            setRooms(roomsData)
            setTechnology(techData)
        }
    }

    const getTimeRooms = (roomData, index) => {
        if (movie[0]) {
            const timesData = movie[0].dateTime.filter((dateTime) => {
                if ((dateTime.room._id === roomData) && (dateTime.day === day))
                    return dateTime.times
            })
            setTimes(timesData[0].times)
            setChosenRoomIndex(index)
            setRoom(roomData)
            setDataSelected(timesData[0])
        }
    }

    const setSeatsBox = (timeData, index) => {
        setTime(timeData)
        setChosenTimeIndex(index)
        let data = { "movieId": movieId, "roomId": roomId, "date": day, "time": timeData }
        console.log(data)
        BackendDataServices.getTakenSeats(data)
            .then(response => {
                setTickets(response.data)
                let blocks = []
                const allSeatsForm = dataSelected.room.seats.map((block, i, arrD) => {
                    console.log("block", block)
                    let blockSeats = []
                    block.rowSeats.map((seat) => {
                        if (response.data) {
                            let reserved = false
                            response.data.map((ticket) => {
                                if (ticket.seatNumber === seat._id) {
                                    reserved = true
                                }
                            })
                            if (reserved)
                                blockSeats.push(1)
                            else
                                blockSeats.push(0)

                        }
                        else {
                            blockSeats.push(0)
                        }
                    })
                    blocks.push(blockSeats)
                })
                console.log(blocks)
                setSeatsForm(blocks)

            })
            .catch(e => {
                console.log(e)
            })
    }

    let setMoviesData = ``
    if (movie[0]) {
        let movieDetails = movie[0]
        // let arrRoom = movieDetails.dateTime.map((dateTime) => dateTime.room)

        setMoviesData =
            <div className="containerMovie">
                <div className="containerImageDetails">
                    <div className="conatinerImage">
                        <img src={movieDetails.photo} height='500px' alt={movieDetails.title} />
                    </div>

                    <div className="conatinerDetails">
                        <h1 className="card-title">{movieDetails.title}</h1>
                        <div className="card-text">
                            <strong>Release Date: </strong>{movieDetails.releasedate}<br />
                            <strong>Run Time: </strong>{movieDetails.runtime}<br />
                            <strong>Plot: </strong>{movieDetails.plot}<br />
                            <strong>Director: </strong>{movieDetails.director}<br />
                            <strong>Actors: </strong>
                            {movieDetails.actors.map((actor, i, arr) => <span key={i} className="actorMovie">{actor} {i !== (arr.length - 1) ? ',' : ''}</span>)}<br></br>
                            <strong>Genre: </strong>{movieDetails.genre.name}<br />
                            <strong>Available: </strong>
                            {FunctionTools.formatDate(movieDetails.fromDate)} to
                            {FunctionTools.formatDate(movieDetails.toDate)}<br />
                            <strong>Technology: </strong>
                            {movieDetails.technology.map((technology, i, arr) => <span key={i} className="technolgyMovie">{technology.technologyId.name} {i !== (arr.length - 1) ? ',' : ''}</span>)}<br></br>
                        </div>
                    </div>
                </div>
                <div className="branchs"> </div>
                <div className="reservation">
                    <div className="dayData">
                        <ul>
                            {days.map((dayData, i) => { return <li key={i} className={chosenDayIndex === i ? 'active' : ''} onClick={() => Technology(dayData, i)}>{FunctionTools.formatDate(dayData)}</li> })}
                        </ul>
                    </div>
                    <div className="techData">
                        <ul>
                            {technologies ? technologies.map((techData, i) => { return <li key={i} className={chosenTechIndex === i ? 'active' : ''} onClick={() => getRoomsTechs(techData.technologyId.name, i)}>{techData.technologyId.name}</li> }) : ''}
                        </ul>
                    </div>
                    <div className="roomData">
                        <ul>
                            {rooms ? rooms.map((roomData, i) => { return <li key={i} className={chosenRoomIndex === i ? 'active' : ''} onClick={() => getTimeRooms(roomData.room._id, i)}>{roomData.room.name}</li> }) : ''}
                        </ul>
                    </div>
                    <div className="timeData">
                        <ul>
                            {times ? times.map((timeData, i) => { return <li key={i} className={chosenTimeIndex === i ? 'active' : ''} onClick={() => setSeatsBox(timeData, i)}>{timeData}</li> }) : ''}
                        </ul>
                    </div>
                    <div className="seatsForm">{seatsForm ? seatsForm.map((block, b) => { return <div key={b}> {block.map((seat, i) => { return seat ? <span key={i}><img src="./red.png" /><input className="seat" type='checkbox' onChange={countSeats()} checked /></span> : <span key={i}><img src="./green.png" /><input className="seat" type='checkbox' onChange={countSeats()} /></span> })}</div> }) : ''}</div>
                </div>
                <div className="paymentForm"></div>
                <div className="containerTrailer"><iframe width="100%" height="600px" src="https://www.youtube.com/embed/u9Mv98Gr5pY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            </div>
            
    }

    return (
        <div>
            <div className="row">
                {setMoviesData}
            </div>
        </div>
    )
}

export default MoviesDetails