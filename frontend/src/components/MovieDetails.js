import React, { useState, useEffect, useRef } from "react"
import BackendDataServices from "../services/BackendDataServices"
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import FunctionTools from '../services/FunctionTools'
import '../css/movieDetails.css'
import Modal from 'react-bootstrap/Modal'
import Payment from "./Payment"




const MoviesDetails = props => {
    const [modalShow, setModalShow] = useState(false);
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
    const [countSeats, setCountSeats] = useState(0)
    const [chosenSeatArr, setChosenSeatArr] = useState([])
    const [userData, setUserData] = useState('')
    const [isLogin, setIsLogin] = useState(false)
    const movieId = useParams().id
    let daySelected = ''
    useEffect(() => {
        retrieveMovie()
        isLogincheck()
    }, [])

    //MODAL
    // function SeatModal(props) {
    //     return (
    //         <Modal
    //             {...props}
    //             size="lg"
    //             aria-labelledby="contained-modal-title-vcenter"
    //             centered
    //         >
    //             <Modal.Header closeButton>
    //                 <Modal.Title id="contained-modal-title-vcenter">
    //                     Modal heading
    //                 </Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //             <div className="seatsForm">{seatsForm ? seatsForm.map((block, b) => { return <div key={b}> {block.map((seat, i) => { return seat.status ? <span key={i}><img src="../redSeat.png" className="seat" /></span> : (seat.taken ? <span key={i} id={i}><img src="../redSeat.png" className="seat" onClick={() => removeSeat(seat.seatId, i)} /></span> : <span key={i} id={i}><img src="../greenSeat.png" className="seat" onClick={() => addSeat(seat.seatId, i)} /></span>) })}</div> }) : ''}</div>
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 <button onClick={props.onHide}>Close</button>
    //             </Modal.Footer>
    //         </Modal>
    //     );
    // }
    const buyTicket = () => {
        //e.preventDefault()
       
        for(let i=0; i<chosenSeatArr.length; i++){
            console.log(day)
            console.log(technology)
            console.log(roomId)
            console.log(time)
            console.log(chosenSeatArr[i])
            console.log(userData.id)
            BackendDataServices.buyTicket({"userId": userData.id, "movieId": movieId, "roomId": roomId, "day": day, "technology": technology, "time": time, "seat": chosenSeatArr[i]})
            .then(response => {
               console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

    const isLogincheck = async () => {
        let token = localStorage.getItem("auth-token") // grabbing JWT token from localStorage
        if (token === null) {
            // if there is no token we then set the localStorage key to auth-token and the value of token to an empty string. This avoids any errors
            localStorage.setItem("auth-token", "")
            token = ""
            setIsLogin(false)
        }
        // Here we are calling to our backend to make sure our JWT Response is valid
        const tokenRes = await BackendDataServices.checkToken({ "data": 0 }, { headers: { "x-auth-token": token } })
        // if there is token response data then we will grab that user and then setUserData to hold the token information and the user response data
        if (tokenRes.data) {
            const userRes = await BackendDataServices.getUserData({ "id": tokenRes.data.id }, { headers: { "x-auth-token": token } })
            setUserData(userRes.data)
            setIsLogin(true)
        }
    }

    const addSeat = (seat, id) => {
        if (isLogin) {
            if (chosenSeatArr.length === 0)
                chosenSeatArr.push(seat)
            else {
                let add = true
                for (let i = 0; i < chosenSeatArr.length; i++) {
                    if (chosenSeatArr[i] === seat) {
                        add = false
                        break
                    }
                }
                if (add)
                    chosenSeatArr.push(seat)
            }
            for (let y = 0; y < seatsForm.length; y++) {
                console.log(seatsForm[y])
                for (let x = 0; x < seatsForm[y].length; x++) {
                    if (seatsForm[y][x].seatId === seat)
                        seatsForm[y][x].taken = 1
                }
            }
            // document.getElementById(id).innerHTML = "<img src='../redSeat.png' class='seat'/>"
            setChosenSeatArr(chosenSeatArr)
            setCountSeats(chosenSeatArr.length)
        }
        else alert("please login first")
        console.log(chosenSeatArr)
    }

    const removeSeat = (seat, id) => {
        for (let i = 0; i < chosenSeatArr.length; i++) {
            if (chosenSeatArr[i] === seat)
                chosenSeatArr.splice(i, 1)
        }
        for (let y = 0; y < seatsForm.length; y++) {
            for (let x = 0; x < seatsForm[y].length; x++) {
                if (seatsForm[y][x].seatId === seat)
                    seatsForm[y][x].taken = 0
            }
        }
        // document.getElementById(id).innerHTML = "<img src='../redSeat.png' class='seat'/>"


        console.log(seat)
        setCountSeats(chosenSeatArr.length)
        console.log(chosenSeatArr)
        setChosenSeatArr(chosenSeatArr)
    }

    const pay = () => {
        document.getElementById('paymentForm').style.display = "block"
    }

    const retrieveMovie = () => {
        BackendDataServices.get(movieId)
            .then(response => {
                setMovie(response.data)
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
        const techData = []
        if (movie[0]) {
            for (let i = 0; i < movie[0].dateTime.length; i++) {
                if (movie[0].dateTime[i].day === dayData) {
                    for (let y = 0; y < movie[0].technology.length; y++) {
                        if (movie[0].dateTime[i].technologyId._id === movie[0].technology[y].technologyId._id) {
                            if (techData.length === 0) {
                                console.log("ddd")
                                techData.push(movie[0].dateTime[i].technologyId)
                            }
                            else {
                                let add = true
                                for (let x = 0; x < techData.length; x++) {
                                    console.log(techData[x])
                                    console.log(movie[0].technology[y].technologyId._id)
                                    if (techData[x]._id === movie[0].technology[y].technologyId._id) {
                                        add = false
                                        break
                                    }
                                }
                                if (add) {
                                    techData.push(movie[0].dateTime[i].technologyId)
                                    console.log(techData)
                                }
                            }
                        }
                    }
                }
            }
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
        document.getElementById('seatsForm').style.display = "block"
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
                                blockSeats.push({ 'status': 1, "seatId": seat._id, 'taken': 0 })
                            else
                                blockSeats.push({ 'status': 0, "seatId": seat._id, 'taken': 0 })

                        }
                        else {
                            blockSeats.push({ 'status': 0, "seatId": seat._id, 'taken': 0 })
                        }
                    })
                    blocks.push(blockSeats)
                    console.log(blocks)
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
                    <div className="containerImage">
                        <img src={movieDetails.photo} width='380px' height='auto' alt={movieDetails.title} />
                    </div>
                    <div className="movieDetails">

                        <div className="containerDetails">
                            <h1 className="card-title">{movieDetails.title}</h1>
                            <div className="card-text">
                                <strong className="strong">Release Date: </strong>{movieDetails.releasedate}<br />
                                <strong className="strong">Run Time: </strong>{movieDetails.runtime}<br />
                                <strong className="strong">Plot: </strong>{movieDetails.plot}<br />
                                <strong className="strong">Director: </strong>{movieDetails.director}<br />
                                <strong className="strong">Actors: </strong>
                                {movieDetails.actors.map((actor, i, arr) => <span key={i} className="actorMovie">{actor} {i !== (arr.length - 1) ? ',' : ''}</span>)}<br></br>
                                <strong className="strong">Genre: </strong>{movieDetails.genre.name}<br />
                                <strong className="strong">Available: </strong>
                                {FunctionTools.formatDate(movieDetails.fromDate)} to
                                {FunctionTools.formatDate(movieDetails.toDate)}<br />
                                <strong className="strong">Technology: </strong>
                                {movieDetails.technology.map((technology, i, arr) => <span key={i} className="technolgyMovie">{technology.technologyId.name} {i !== (arr.length - 1) ? ',' : ''}</span>)}<br></br>
                            </div>
                        </div>
                    </div>
                    {/* <div className="branchs"> </div> */}
                    <div className="reservation">
                        <div className="dayData">
                            <ul>
                                {days.map((dayData, i) => { return <li key={i} className={chosenDayIndex === i ? 'active' : ''} onClick={() => Technology(dayData, i)}>{FunctionTools.formatDate(dayData)}</li> })}
                            </ul>
                        </div>
                        <div className="techData">
                            <ul>
                                {technologies ? technologies.map((techData, i) => { return <li key={i} className={chosenTechIndex === i ? 'active' : ''} onClick={() => getRoomsTechs(techData.name, i)}>{techData.name}</li> }) : ''}
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
                        {/* <div> */}
                        {/* <SeatModal
                                show={modalShow} data = {seatsForm}
                                onHide={() => setModalShow(false)}
                            /></div> */}
                        <div className="seatsForm" id="seatsForm">
                            <div className="setDataSeats">{seatsForm ? seatsForm.map((block, b) => { return <div key={b}> {block.map((seat, i) => { return seat.status ? <span key={i}><img src="../redSeat.png" className="seat" /></span> : (seat.taken ? <span key={i} id={i}><img src="../redSeat.png" className="seat" onClick={() => removeSeat(seat.seatId, i)} /></span> : <span key={i} id={i}><img src="../greenSeat.png" className="seat" onClick={() => addSeat(seat.seatId, i)} /></span>) })}</div> }) : ''}</div>
                            <div className="SeatsNumber">Number of Seats: {countSeats} {countSeats ? <button onClick={pay}>Pay</button> : ''}</div>
                            <div id="paymentForm" className="paymentForm"><Payment data={buyTicket} /></div>
                        </div>
                    </div>
                </div>
                <div className="containerTrailer"><h1 className="trailer">Trailer</h1><iframe className="video" width="100%" height="520px" src="https://www.youtube.com/embed/u9Mv98Gr5pY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
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