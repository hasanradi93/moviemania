import React, { useState, useEffect, useRef } from "react"
import BackendDataServices from "../services/BackendDataServices"
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import FunctionTools from '../services/FunctionTools'
import '../css/movieDetails.css'
import Modal from 'react-bootstrap/Modal'
import Payment from "./Payment"
import '../css/screencss.css'




const MoviesDetails = props => {
    const [modalShow, setModalShow] = useState(false);
    const [tickets, setTickets] = useState([])
    const [movie, setMovie] = useState([])
    const [day, setDay] = useState('')
    const [roomId, setRoom] = useState(null)
    const [time, setTime] = useState(null)
    const [blockName, setBlockName] = useState([])
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
    const [price, setPrice] = useState(0)
    const [technologies, setTechnologies] = useState([])
    const [countSeats, setCountSeats] = useState(0)
    const [chosenSeatArr, setChosenSeatArr] = useState([])
    const [blocksName, setBlocksName] = useState([])
    const [seatsNumber, setSeatsNumber] = useState([])
    const [userData, setUserData] = useState('')
    const [isLogin, setIsLogin] = useState(false)
    const [isPaid, setPaid] = useState(false)
    const movieId = useParams().id
    let daySelected = ''
    useEffect(() => {
        retrieveMovie()
        isLogincheck()
    }, [])

    const buyTicket = () => {
        for (let i = 0; i < chosenSeatArr.length; i++) {
            console.log(day)
            console.log(technology)
            console.log(roomId)
            console.log(time)
            console.log(chosenSeatArr[i])
            console.log(userData.id)
            BackendDataServices.buyTicket({ "userId": userData.id, "movieId": movieId, "roomId": roomId, "day": day, "technology": technology, "time": time, "seatNumber": chosenSeatArr[i].seatNumber, "blockName": chosenSeatArr[i].blockName, "price": price })
                .then(response => {
                    console.log(response.data)
                    setPaid(true)
                })
                .catch(e => {
                    console.log(e)
                })
        }
        let intervalTimer = setInterval(() => {
            setCountSeats(0)
            setChosenSeatArr([])
            let interval = setInterval(() => {
                setPaid(false)
                clearInterval(interval)
            }, 5000)
            clearInterval(intervalTimer)
        }, 5000)
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

    const addSeat = (seatNb, blockName, id) => {
        if (isLogin) {
            if (chosenSeatArr.length === 0)
                chosenSeatArr.push({ 'seatNumber': seatNb, 'blockName': blockName })
            else {
                let add = true
                for (let i = 0; i < chosenSeatArr.length; i++) {
                    if (chosenSeatArr[i].seatNumber === seatNb && chosenSeatArr[i].blockName === blockName) {
                        add = false
                        break
                    }
                }
                if (add)
                    chosenSeatArr.push({ 'seatNumber': seatNb, 'blockName': blockName })
            }
            for (let y = 0; y < seatsForm.length; y++) {
                console.log(seatsForm[y])
                for (let x = 0; x < seatsForm[y].length; x++) {
                    if (seatsForm[y][x].seatNb === seatNb && seatsForm[y][x].blockName === blockName)
                        seatsForm[y][x].taken = 1
                }
            }
            setChosenSeatArr(chosenSeatArr)
            setCountSeats(chosenSeatArr.length)
        }
        else alert("please login first")
        console.log(chosenSeatArr)
    }

    const removeSeat = (seatNb, blockName, id) => {
        for (let i = 0; i < chosenSeatArr.length; i++) {
            if (chosenSeatArr[i].seatNumber === seatNb && chosenSeatArr[i].blockName === blockName)
                chosenSeatArr.splice(i, 1)
        }
        for (let y = 0; y < seatsForm.length; y++) {
            for (let x = 0; x < seatsForm[y].length; x++) {
                if (seatsForm[y][x].seatNb === seatNb && seatsForm[y][x].blockName === blockName)
                    seatsForm[y][x].taken = 0
            }
        }
        console.log(seatNb)
        setCountSeats(chosenSeatArr.length)
        console.log(chosenSeatArr)
        setChosenSeatArr(chosenSeatArr)
    }

    const pay = () => {
        document.getElementById('paymentForm').style.display = "block"
    }

    const retrieveMovie = () => {
        BackendDataServices.getMovieData(movieId)
            .then(response => {
                setMovie(response.data)
                //get days from the movie
                let arrDays = response.data[0].dateTime.map((dateTime) => dateTime.day)
                //get grouped days
                let groupDays = Array.from(new Set(arrDays.map(JSON.stringify))).map(JSON.parse);
                let groupedDays = []
                let nowDate = new Date();
                for (let i = 0; i < groupDays.length; i++) {
                    let dayT = groupDays[i].split('T')[0]
                    if (new Date(dayT) > nowDate)
                        groupedDays.push(groupDays[i])
                    if (checkToday(new Date(dayT)))
                        groupedDays.push(groupDays[i])
                }
                daySelected = groupedDays[0]
                setDays(groupedDays)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const checkToday = (someDate) => {
        const today = new Date()
        return someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    }

    const Technology = (dayData, index) => {
        const techData = []
        setRooms([])
        setTimes([])
        let priceTicket = 0
        if (movie[0]) {
            for (let i = 0; i < movie[0].dateTime.length; i++) {
                if (movie[0].dateTime[i].day === dayData) {
                    for (let y = 0; y < movie[0].technology.length; y++) {
                        if (movie[0].dateTime[i].technologyId._id === movie[0].technology[y].technologyId._id) {
                            priceTicket = movie[0].technology[y].price
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
            console.log(priceTicket)
            setPrice(priceTicket)
        }
    }

    const closeSeat = () => {
        document.getElementById('seatsForm').style.display = "none"
    }

    const getRoomsTechs = (techData, index) => {
        setTimes([])
        if (movie[0]) {
            let techId = 0
            const roomsData = movie[0].dateTime.filter((dateTime) => {
                if (dateTime.day === day && dateTime.technologyId.name === techData) {
                    techId = dateTime.technologyId._id
                    return dateTime
                }
            })
            console.log(roomsData)
            setChosenTechIndex(index)
            setRooms(roomsData)
            console.log("techData", techData, "techId", techId)
            setTechnology(techId)
        }
    }

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

    const getTimeRooms = (roomData, index) => {

        console.log("timmeeee", formatAMPM())
        if (movie[0]) {
            const timesData = movie[0].dateTime.filter((dateTime) => {
                if ((dateTime.room._id === roomData) && (dateTime.day === day))
                    return dateTime.times
            })
            let alltimes = timesData[0].times
            let dayT = day.split('T')[0]
            if (checkToday(new Date(dayT))) {
                let theTimes = []
                for (let i = 0; i < alltimes.length; i++) {
                    let sTime = alltimes[i].split(':')[0]
                    console.log("all times", sTime)
                    //check am or pm
                    if (checkAmPM()) {
                        if (Number(sTime) > Number(formatAMPM())) {
                            theTimes.push(alltimes[i])
                            console.log("yess", alltimes[i])
                        }
                    }
                    else
                        theTimes.push(alltimes[i])
                }
                setTimes(theTimes)
            }
            else
                setTimes(alltimes)
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
                console.log("response.dataresponse.dataresponse.dataresponse.data", response.data)
                let blocks = []
                let blocksName = []
                let seatsNumberArr = []
                const allSeatsForm = dataSelected.room.seats.map((block, i, arrD) => {
                    console.log("block", block)
                    let blockName = block.block
                    blocksName.push(blockName)
                    let blockSeats = []
                    seatsNumberArr = []
                    let cSeats = 0
                    block.rowSeats.map((seat) => {
                        cSeats++
                        seatsNumberArr.push(cSeats)
                        if (response.data) {
                            let reserved = false
                            response.data.map((ticket) => {
                                console.log(ticket.seatNumber, "T===T", seat.number)
                                if (ticket.seatNumber === seat.number && ticket.blockName === blockName) {
                                    reserved = true
                                }
                            })
                            if (reserved)
                                blockSeats.push({ 'status': 1, "seatNb": seat.number, 'blockName': blockName, 'taken': 0 })
                            else
                                blockSeats.push({ 'status': 0, "seatNb": seat.number, 'blockName': blockName, 'taken': 0 })

                        }
                        else {
                            blockSeats.push({ 'status': 0, "seatNb": seat.number, 'blockName': blockName, 'taken': 0 })
                        }
                    })
                    blocks.push(blockSeats)
                    console.log(blocks)
                })
                console.log(blocks)
                setSeatsForm(blocks)
                setBlocksName(blocksName)
                setSeatsNumber(seatsNumberArr)

            })
            .catch(e => {
                console.log(e)
            })
    }

    const totalTickets = (p, c) => { return p * c }

    let setMoviesData = ``
    if (movie[0]) {
        let movieDetails = movie[0]
        // let arrRoom = movieDetails.dateTime.map((dateTime) => dateTime.room)
        setMoviesData =
            <div className="containerMovie">
                <div className="containerImageDetails">
                    <div className="containerImage">
                        <img src={movieDetails.photo} style={{ width: "400px", height: "600px" }} alt={movieDetails.title} />
                    </div>
                    <div className="movieDetails">

                        <div className="containerDetails">
                            <h1 className="card-title">{movieDetails.title}</h1>
                            <div className="card-text">
                                <strong className="strong">Release Date: </strong>{FunctionTools.formatDate(movieDetails.releasedate)}<br />
                                <strong className="strong">Run Time: </strong>{movieDetails.runtime} min<br />
                                <strong className="strong">Plot: </strong>{movieDetails.plot}<br />
                                <strong className="strong">Director: </strong>{movieDetails.director}<br />
                                <strong className="strong">Starring: </strong>
                                {movieDetails.actors.map((actor, i, arr) => <span key={i} className="actorMovie">{actor} {i !== (arr.length - 1) ? '-' : ''}</span>)}<br></br>
                                <strong className="strong">Genre: </strong>{movieDetails.genre.name}<br />
                                <strong className="strong">Available: </strong>
                                From {FunctionTools.formatDate(movieDetails.fromDate)}  to -
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
                        <div className="seatsForm" id="seatsForm">
                            <div><span style={{ marginTop: "-90px", float: "right", cursor: "pointer" }} onClick={closeSeat}><img alt='' style={{ width: "32px", height: "32px" }} src="../close.png"></img></span></div>

                            <div className="setDataSeats">{seatsNumber ? seatsNumber.map((sn, i) => { return <span key={i} style={{ width: '52px', display: 'inline-block' }}>{sn}</span> }) : ''}<span id="nseats"></span>{seatsForm ? seatsForm.map((block, b) => { return <div key={b}><span>{blocksName[b]}</span> {block.map((seat, i) => { return seat.status ? <span key={i}><img src="../redSeat.png" className="seat" alt='' /></span> : (seat.taken ? <span key={i} id={i}><img src="../redSeat.png" alt='' className="seat" onClick={() => removeSeat(seat.seatNb, seat.blockName, i)} /></span> : <span key={i} id={i}><img src="../greenSeat.png" className="seat" onClick={() => addSeat(seat.seatNb, seat.blockName, i)} alt='' /></span>) })}</div> }) : ''}</div>
                            <div className="box  left-skew "><div className="box right-skew"><h1 className='screenWord' >Screen</h1></div></div>
                            <div className="SeatsNumber" style={{ fontSize: "20px", marginLeft: "-18%" }}><span className="wordColor" >Number of Seats:</span> {countSeats}</div>
                            <div className="SeatsNumber">{countSeats ? <span style={{ fontSize: "20px", float: "right", marginRight: "33%", marginTop: "-3.3%" }}><span className="wordColor">Price of {countSeats} {(countSeats === 1) ? 'Ticket' : 'Tickets'} :   </span><span>{totalTickets(price, countSeats)} $</span></span> : ''}</div><br></br>
                            <div className="SeatsNumber">{countSeats ? <button className="payBtn" onClick={pay}>Pay</button> : ''}</div>
                            <div id="paymentForm" className="paymentForm"><Payment data={buyTicket} finished={isPaid} /></div>
                        </div>
                    </div>
                </div>
                <div className="containerTrailer"><h1 className="trailer">Trailer</h1><iframe className="video" width="100%" height="520px" src={movie[0].videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
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