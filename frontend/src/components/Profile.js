import { useParams, Link } from 'react-router-dom'
import React, { useState, useEffect, useContext } from "react"
import BackendDataServices from "../services/BackendDataServices"
import useHidePageInformation from '../hooks/useHidePageInformation'
import UserContext from "../context/UserContext"
import "../css/profile.css";


function Profile(props) {
    useHidePageInformation(); // Custom hook

    // const userId = useParams().id
    // console.log(userId)
    const [userInfo, setUser] = useState('')
    const [profileImg, setProfileFile] = useState('')
    const [profileImgSelected, setProfileFileSeleted] = useState('../avatar.png')
    const [editProfileStatus, setEditProfileStatus] = useState(false)
    const { userData } = useContext(UserContext);
    useEffect(() => {
        if (userData.user) {
            console.log(userData.user)
            setUser(userData.user.username)
            setProfileFileSeleted(userData.user.profile)
        }
        // retrieveUser()
    }, [])

    // const retrieveUser = () => {
    //     BackendDataServices.getUserDataById(userId)
    //         .then(response => {
    //             console.log("dataa", response.data)
    //             setUser(response.data)
    //             setProfileFileSeleted(response.data.profile)
    //             console.log(user)
    //         })
    //         .catch(e => {
    //             console.log(e)
    //         })
    // }



    const onFileChange = (photo) => {
        setProfileFile(photo)
    }

    const uploadPhoto = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('profileImg', profileImg)
        BackendDataServices.uploadPhoto(formData)
            .then(response => {
                console.log(response.data)
                setProfileFileSeleted(response.data)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    // function openEditPhoto() {
    //     document.getElementById('imgEditPhoto').innerHTML = `<img src='../cancel.png' onclick=closeEditPhoto()  width="24px" height="24px"></img>`
    //     document.getElementById('formEditPhoto').style.display = "block"
    // }

    // function closeEditPhoto() {
    //     document.getElementById('imgEditPhoto').innerHTML = `<img src='../edit.png' onclick=openEditPhoto()  width="24px" height="24px"></img>`
    //     document.getElementById('formEditPhoto').style.display = "none"
    // }

    const changeEditPhotoStatus = () => {
        setEditProfileStatus(!editProfileStatus)
        console.log(editProfileStatus)
    }


    return (

        <div>
            <div className='profileData'>
                <div id='imgEditPhoto'>
                    {editProfileStatus ? <img src='../cancel.png' onClick={changeEditPhotoStatus} width="24px" height="24px"></img> : <img src='../edit.png' onClick={changeEditPhotoStatus} width="24px" height="24px"></img>}
                </div>
                <div>
                    <img src={profileImgSelected} alt="Profile Pic" width='300px' heigth='300px' ></img>
                    {editProfileStatus ?
                        <form onSubmit={uploadPhoto} id='formEditPhoto'>
                            <input type="file" onChange={(e) => onFileChange(e.target.files[0])} />
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </form> : ""
                    }

                </div>
            </div>
            <div className='profileData'>
                <div>

                    <img src='./edit.png' width="24px" height="24px"></img>

                </div>
                <form>
                    <input type='text' value={userInfo.username} className='input' readOnly></input>
                </form>
            </div>
        </div>

    );

}

export default Profile;