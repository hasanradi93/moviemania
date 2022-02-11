import React, { useState, useEffect, useContext } from "react"
import BackendDataServices from "../services/BackendDataServices"
import useHidePageInformation from '../hooks/useHidePageInformation'
import "../css/profile.css";
import FunctionTools from "../services/FunctionTools";


function Profile(props) {
    useHidePageInformation(); // Custom hook
    //Profile Section
    const [userData, setUserData] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('../avatar.png')
    const [uploadProfile, setUploadProfile] = useState('')
    const [editProfileStatus, setEditProfileStatus] = useState(false)
    const [editUserNameStatus, setEditUserNameStatus] = useState(false)
    const [userName, setUserName] = useState('')
    //Tickets Section
    const [tickets, setTickets] = useState('')
    // const { userData } = useContext(UserContext);
    useEffect(() => {
        retrieveUser()
    }, [])

    const retrieveUser = async () => {
        let token = localStorage.getItem("auth-token"); // grabbing JWT token from localStorage
        if (token === null) {
            // if there is no token we then set the localStorage key to auth-token and the value of token to an empty string. This avoids any errors
            localStorage.setItem("auth-token", "");
            token = "";
        }
        // Here we are calling to our backend to make sure our JWT Response is valid
        const tokenRes = await BackendDataServices.checkToken({ "data": 0 }, { headers: { "x-auth-token": token } })
        // if there is token response data then we will grab that user and then setUserData to hold the token information and the user response data
        if (tokenRes.data) {
            const userRes = await BackendDataServices.getUserData({ "id": tokenRes.data.id }, { headers: { "x-auth-token": token } })
            setUserData(userRes.data)
            setUserName(userRes.data.username)
            setProfilePhoto(userRes.data.profile)
            retrieveTickets(userRes.data)
        }
    }

    const retrieveTickets = (data) => {
        BackendDataServices.getUserTickets({ "userId": data.id })
            .then(response => {
                setTickets(response.data)
            })
            .catch(e => {
                console.log(e.message)
            })
    }

    const getBlockNameAndSeatNb = (seatNumber, roomId) => {
        let blocknName = ''
        let seatNb = 0
        for (let j = 0; j < tickets.length; j++) {
            if (tickets[j].roomId._id === roomId) {
                let seats = tickets[j].roomId.seats
                for (let i = 0; i < seats.length; i++) {
                    let blockSeats = seats[i]
                    for (let x = 0; x < blockSeats.rowSeats.length; x++) {
                        if (blockSeats.rowSeats[x]._id === seatNumber) {
                            blocknName = blockSeats.block
                            seatNb = blockSeats.rowSeats[x].number
                            return "Block: " + blocknName + " - " + seatNb
                            break
                        }
                    }
                }
            }
        }
    }

    const uploadPhoto = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('profileImg', uploadProfile)
        formData.append('userId', userData.id)
        BackendDataServices.uploadPhoto(formData)
            .then(response => {
                setProfilePhoto(uploadProfile)
                setEditProfileStatus(!editProfileStatus)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const changeEditPhotoStatus = () => {
        setEditProfileStatus(!editProfileStatus)
    }

    const changeEditUsernameStatus = () => {
        setEditUserNameStatus(!editUserNameStatus)
    }

    const onFileChange = (photo) => {
        setUploadProfile(photo)
    }

    const cancelTicket = (ticketId) => {
        if (window.confirm("Do you want to cancel this Ticket?")) {
            BackendDataServices.cancelTicket({ "id": ticketId })
                .then(response => {
                    alert("Ticket canceled successfully")
                })
                .catch(error => {
                    console.log(error.message)
                })
        }
    }

    const setUserNameValue = (e) => {
        setUserName(e)
    }

    const updateUserName = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('userName', userName)
        formData.append('userId', userData.id)
        BackendDataServices.updateUsername({ "userName": userName, "userId": userData.id })
            .then(response => {
                setUserName(userName)
                setEditUserNameStatus(!editUserNameStatus)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <div>
            <div className="profileSection">
                <h1>Profile</h1>
                <div className='profileData'>
                    <div id='imgEditPhoto'>
                        {editProfileStatus ? <img src='../cancel.png' onClick={changeEditPhotoStatus} width="24px" height="24px"></img> : <img src='../edit.png' onClick={changeEditPhotoStatus} width="24px" height="24px"></img>}
                    </div>
                    <div>
                        <img src={profilePhoto} alt="Profile Pic" width='300px' heigth='300px' ></img>
                        {editProfileStatus ?
                            <form onSubmit={uploadPhoto} id='formEditPhoto'>
                                <input type="file" onChange={(e) => onFileChange(e.target.files[0])} />
                                <button className="btn btn-primary" type="submit">Upload</button>
                            </form> : ""
                        }
                    </div>
                </div>
                <div className='profileData'>
                    <div id='imgEditPhoto'>
                        {editUserNameStatus ? <img src='../cancel.png' onClick={changeEditUsernameStatus} width="24px" height="24px"></img> : <img src='../edit.png' onClick={changeEditUsernameStatus} width="24px" height="24px"></img>}
                    </div>
                    {editUserNameStatus ?
                        <form onSubmit={updateUserName}>
                            <input type='text' value={userName} onChange={(e) => setUserNameValue(e.target.value)}></input><br></br><br></br>
                            <button className="btn btn-primary" type="submit">Update UserName</button>
                        </form> : <h2>{userName}</h2>
                    }
                </div>
            </div>
            <div className="ticketsSection">
                {tickets ? tickets.map((ticket, i) => {
                    return (<div key={i} className="containerMovie" style={{ marginTop: "10px" }}><div className="containerImageDetails"><div className="containerImage"><img src={ticket.movieId.photo} width='180px' height='auto' alt={ticket.movieId.title} /></div><div className="dataTicket" style={{ border: "4px groove whitesmoke", overflow: "hidden", width: "30%", backgroundColor: "rgba(8, 8, 8, 0.5)" }}><div className="containerDetailsTicket"><h1 className="card-title">{ticket.movieId.title}</h1><div className="card-text"><strong className="strongTicket"> Ticket Numer: </strong>{ticket._id}<br></br><strong className="strongTicket"> Date: </strong>{FunctionTools.formatDate(ticket.date)}<br></br><strong className="strongTicket"> Days: </strong>{FunctionTools.daysLeft(new Date(), ticket.date)} Left<br></br><strong className="strongTicket"> Time: </strong>{ticket.time}<br></br><strong className="strongTicket"> Room: </strong>{ticket.roomId.name}<br></br><strong className="strongTicket"> Seat : </strong>{getBlockNameAndSeatNb(ticket.seatNumber, ticket.roomId._id)}<br></br>{FunctionTools.daysLeft(new Date(), ticket.date) > 1 ? <button className="btnTicketCancel" onClick={() => cancelTicket(ticket._id)}>Cancel Ticket</button> : ''}<br></br></div></div></div></div></div>)
                }) : ""}
            </div>
        </div>
    );

}

export default Profile;