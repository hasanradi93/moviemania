import React, { useState, useEffect, useContext } from "react"
import BackendDataServices from "../services/BackendDataServices"
import useHidePageInformation from '../hooks/useHidePageInformation'
// import UserContext from "../context/UserContext"
import "../css/profile.css";
import FunctionTools from "../services/FunctionTools";


function Profile(props) {
    useHidePageInformation(); // Custom hook
    //Profile Section
    const [userData, setUserData] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('../avatar.png')
    const [uploadProfile, setUploadProfile] = useState('')
    const [editProfileStatus, setEditProfileStatus] = useState(false)
    //Tickets Section
    const [tickets, setTickets] = useState('')
    const [blocksAndSeats, setBlocksAndSeats] = useState([])
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
            setProfilePhoto(userRes.data.profile)
            retrieveTickets(userRes.data)
        }
    }

    const retrieveTickets = (data) => {
        BackendDataServices.getUserTickets({ "userId": data.id })
            .then(response => {
                console.log("dataatickets", response.data)
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
            console.log("tickets[j]", tickets[j])
            if (tickets[j].roomId._id === roomId) {
                let seats = tickets[j].roomId.seats
                console.log("seats", seats)
                for (let i = 0; i < seats.length; i++) {
                    let rowSeats = seats[i]
                    console.log("rowSeats", rowSeats)
                    for (let x = 0; x < rowSeats.length; x++) {
                        console.log("rowSeats[x]", rowSeats[x])
                        if (rowSeats[x]._id === seatNumber) {
                            blocknName = seats[i].block
                            seatNb = rowSeats[x].number
                            console.log("Block: ", blocknName, " - ", seatNb)
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
        BackendDataServices.uploadPhoto(formData, { "_id": userData.id })
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

    const onFileChange = (photo) => {
        setUploadProfile(photo)
    }

    const cancelTicket = () => {
        if (window.confirm("Do you want to cancel this Ticket?")) {
            alert("oki")
        }
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
                        <img src='./edit.png' width="24px" height="24px"></img>
                    </div>
                    <form>
                        <input type='text' value={userData.username} className='input' readOnly></input>
                    </form>
                </div>
            </div>
            <div className="ticketsSection">
                {tickets ? tickets.map((ticket, i) => {
                    return (<div key={i} className="containerMovie" style={{ marginTop: "10px" }}><div className="containerImageDetails"><div className="containerImage"><img src={ticket.movieId.photo} width='180px' height='auto' alt={ticket.movieId.title} /></div><div style={{ border: "4px groove whitesmoke", overflow: "hidden", width: "30%", height: "565px", backgroundColor: "rgba(8, 8, 8, 0.5)" }}><div className="containerDetails"><h1 className="card-title">{ticket.movieId.title}</h1><div className="card-text"><strong className="strong"> Ticket Numer: </strong>{ticket._id}<br></br><strong className="strong"> Date: </strong>{FunctionTools.formatDate(ticket.date)}<br></br><strong className="strong"> Days: </strong>{FunctionTools.daysLeft(new Date(), ticket.date)} Left<br></br><strong className="strong"> Time: </strong>{ticket.time}<br></br><strong className="strong"> Room: </strong>{ticket.roomId.name}<br></br><strong className="strong"> Seat : </strong>{getBlockNameAndSeatNb(ticket.seatNumber, ticket.roomId)}<br></br><button onclick={cancelTicket}>Cancel</button><br></br></div></div></div></div></div>)
                }) : ""}
            </div>
        </div>
    );

}

export default Profile;