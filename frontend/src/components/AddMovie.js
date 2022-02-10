import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackendDataServices from '../services/BackendDataServices';
import '../css/movieAdmin.css'
class AddMovie extends Component {
    times = [{ value: "01:00 PM", status: 0 }, { value: "01:30 PM", status: 0 }, { value: "02:00 PM", status: 0 }, { value: "02:30 PM", status: 0 }, { value: "03:00 PM", status: 0 }, { value: "03:30 PM", status: 0 },
    { value: "04:00 PM", status: 0 }, { value: "04:30 PM", status: 0 }, { value: "05:00 PM", status: 0 }, { value: "05:30 PM", status: 0 }, { value: "06:00 PM", status: 0 }, { value: "06:30 PM", status: 0 }, { value: "07:00 PM", status: 0 },
    { value: "07:30 PM", status: 0 }, { value: "08:00 PM", status: 0 }, { value: "08:30 PM", status: 0 }, { value: "09:00 PM", status: 0 }, { value: "09:30 PM", status: 0 }, { value: "10:00 PM", status: 0 }, { value: "10:30 PM", status: 0 }]
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            plot: "",
            director: "",
            releasedate: "",
            runtime: 0,
            rating: 0,
            fromdate: "",
            todate: "",
            actors: [],
            availability: 0,
            genres: [],
            genreId: 0,
            technologies: [],
            technologiesChoosed: [],
            technologyId: 0,
            price: 0,
            rooms: [],
            dateTime: [],
            roomId: 0,
            roomDate: '',
            technologyIdDT: 0,
            countTimes: 0,
            timesArr: this.times,
            photo: '',
            videoUrl: ''
        }
    }

    componentDidMount() {
        this.getGenres()
        this.getTechnologies()
        this.getRooms()
    }

    getGenres = () => {
        BackendDataServices.getGenres()
            .then(response => {
                this.setState({ genres: response.data })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    getTechnologies = () => {
        BackendDataServices.getTechnologies()
            .then(response => {
                this.setState({ technologies: response.data })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    getRooms = () => {
        BackendDataServices.getRooms()
            .then(response => {
                this.setState({ rooms: response.data })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    saveTechPrice = () => {
        if (this.state.price && this.state.technologyId) {
            if (this.state.dateTime.length === 0) {
                this.state.technologiesChoosed.push({ "technologyId": this.state.technologyId, "price": this.state.price })
                this.setState({ price: 0 })
            }

            else {
                let exist = false
                for (let i = 0; i < this.state.technologiesChoosed.length; i++) {
                    if (this.state.technologiesChoosed[i].technologyId === this.state.technologyId) {
                        exist = true
                        break
                    }
                }
                if (!exist) {
                    this.state.technologiesChoosed.push({ "technologyId": this.state.technologyId, "price": this.state.price })
                    this.setState({ price: 0 })
                }
                else
                    alert("Existed before")
            }
        }
        else
            alert("Check data")
    }

    saveDateTimeRoomData = () => {
        if (this.state.roomId && this.state.roomDate && this.state.countTimes > 0 && this.state.technologyIdDT) {
            let exist = false
            if (this.state.dateTime.length === 0) {
                let theTimes = this.state.timesArr.filter(time => {
                    if (time.status === 1)
                        return time
                }).map(time => { return time.value })
                this.state.dateTime.push({ "room": this.state.roomId, "day": this.state.roomDate, "technologyId": this.state.technologyIdDT, "times": theTimes })
                this.setState({ countTimes: 0 })
                this.setState({ timesArr: this.times })
            }
            else {
                for (let i = 0; i < this.state.dateTime.length; i++) {
                    if (this.state.dateTime[i].room === this.state.roomId && this.state.dateTime[i].day === this.state.roomDate && this.state.dateTime[i].technologyId === this.state.technologyIdDT) {
                        exist = true
                        break
                    }
                }
                if (!exist) {
                    let theTimes = this.state.timesArr.filter(time => {
                        if (time.status === 1)
                            return time
                    }).map(time => { return time.value })
                    this.state.dateTime.push({ "room": this.state.roomId, "day": this.state.roomDate, "technologyId": this.state.technologyIdDT, "times": theTimes })
                    this.setState({ countTimes: 0 })
                    this.setState({ timesArr: this.times })
                }
                else
                    alert("Existed before")
            }
        }
        else
            alert("Check data")
    }

    getTechName = (techId) => {
        for (let i = 0; i < this.state.technologies.length; i++) {
            if (techId === this.state.technologies[i]._id)
                return this.state.technologies[i].name
        }
    }

    getRoomName = (roomId) => {
        for (let i = 0; i < this.state.rooms.length; i++) {
            if (roomId === this.state.rooms[i]._id)
                return this.state.rooms[i].name
        }
    }

    changeStatusTime = (e) => {
        for (let i = 0; i < this.state.timesArr.length; i++) {
            if (this.state.timesArr[i].value === e.value) {
                if (e.checked) {
                    this.setState(prev => ({ countTimes: prev.countTimes + 1 }))
                    let timesCopy = [...this.state.timesArr]
                    let timeNew = { ...timesCopy[i] }
                    timeNew.status = 1
                    timesCopy[i] = timeNew
                    this.setState({ timesArr: timesCopy })
                }
                else {
                    this.setState(prev => ({ countTimes: prev.countTimes - 1 }))
                    let timesCopy = [...this.state.timesArr]
                    let timeNew = { ...timesCopy[i] }
                    timeNew.status = 0
                    timesCopy[i] = timeNew
                    this.setState({ timesArr: timesCopy })
                }
                break
            }
        }
    }

    checkDate = (e, filed) => {
        let date = new Date(e)
        if (date < new Date()) {
            alert("Check the " + filed + " value")
            return false
        }
        if (filed === "fromdate") {
            if (this.state.todate) {
                if (date > new Date(this.state.todate))
                    alert("From date must be less than or equal to date")
                else
                    this.setState({ [filed]: e })
            }
            else
                this.setState({ [filed]: e })
        }
        else if (filed === "todate") {
            if (date < new Date(this.state.fromdate))
                alert("To date must be greater than or equal from date")
            else
                this.setState({ [filed]: e })
        }
        else if (filed === "roomDate") {
            if (this.state.fromdate && this.state.todate) {
                if (date < new Date(this.state.fromdate) || date > new Date(this.state.todate))
                    alert("Date must be between from date and to date movie")
                else
                    this.setState({ [filed]: e })
            }
            else
                alert("Choose the From date and To date first")
        }
    }

    checkTechnology = (e) => {
        if (this.state.technologiesChoosed.length > 0) {
            if (this.state.technologiesChoosed.some(tech => tech.technologyId === e))
                this.setState({ technologyIdDT: e })
            else
                alert("Please choose from available technologies choosed")
        }
        else {
            alert("Choose the technologies above")
            this.setState({ technologyIdDT: 0 })
        }
    }

    setPhoto = (photo) => {
        this.setState({ photo: photo })
    }

    setVideo = (url) => {
        this.setState({ videoUrl: url })
    }

    checkRating = (e) => {
        if (Number(e) > 10)
            alert("Please check the rating")
        else
            this.setState({ rating: e })
    }

    saveMovie = (e) => {
        e.preventDefault()
        if (this.state.title && this.state.plot && this.state.director && this.state.releasedate && this.state.runtime
            && this.state.rating && this.state.fromdate && this.state.todate && this.state.actors.length > 0 && this.state.genres.length > 0
            && this.state.technologiesChoosed.length > 0 && this.state.photo && this.state.videoUrl && this.state.dateTime.length > 0) {
            const movieData = new FormData()
            movieData.append('title', this.state.title)
            movieData.append('plot', this.state.plot)
            movieData.append('director', this.state.director)
            movieData.append('actors', JSON.stringify(this.state.actors))
            movieData.append('videoUrl', this.state.videoUrl)
            movieData.append('photo', this.state.photo)
            movieData.append('releasedate', this.state.releasedate)
            movieData.append('rating', this.state.rating)
            movieData.append('fromDate', this.state.fromdate)
            movieData.append('toDate', this.state.todate)
            movieData.append('runtime', this.state.runtime)
            movieData.append('technology', JSON.stringify(this.state.technologiesChoosed))
            movieData.append('Availability', this.state.availability)
            movieData.append('genre', this.state.genreId)
            movieData.append('dateTime', JSON.stringify(this.state.dateTime))
            BackendDataServices.addMovie(movieData)
                .then(response => {
                    console.log(response.data)
                    alert("Movie added successfullty")
                })
                .catch(error => {
                    console.log(error.message)
                })
        }
        else {
            alert("Check all data please")
        }
    }

    render() {
        return (
            <div className='moveiDataForm'>
                <form onSubmit={this.saveMovie}>
                    <strong>Title:</strong> <input type="text" placeholder='Movie Title' value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} /><br></br>
                    <strong>Plot:</strong><input type="text" placeholder='Movie Plot' value={this.state.plot} onChange={(e) => this.setState({ plot: e.target.value })} /><br></br>
                    <strong>Director:</strong><input type="text" placeholder='Movie Director' value={this.state.director} onChange={(e) => this.setState({ director: e.target.value })} /><br></br>
                    <strong>Release date:</strong><input type="date" placeholder='Release date' value={this.state.releasedate} onChange={(e) => this.setState({ releasedate: e.target.value })} /><br></br>
                    <strong>Run time:</strong><input type="number" placeholder='Release date' value={this.state.runtime} onChange={(e) => this.setState({ runtime: e.target.value })} /><br></br>
                    <strong>Rating:</strong><input type="text" placeholder='Rating IMDB' value={this.state.rating} onChange={(e) => this.checkRating(e.target.value)} /><br></br>
                    <strong>From date:</strong><input type="date" value={this.state.fromdate} onChange={(e) => this.checkDate(e.target.value, 'fromdate')} /><br></br>
                    <strong>To Date:</strong><input type="date" value={this.state.todate} onChange={(e) => this.checkDate(e.target.value, 'todate')} /><br></br>
                    <strong>Availability</strong><input type="checkbox" value={this.state.availability} onChange={(e) => this.setState({ availability: e.target.checked ? 1 : 0 })} /><br></br>
                    <strong>Actors</strong><input type="text" placeholder='Movie Actors [use comma]' value={this.state.actors} onChange={(e) => this.setState({ actors: (e.target.value).split(",") })} /><br></br>
                    <strong>Genre:</strong>{this.state.genres ? this.state.genres.map((genre, i) => { return <span><span key={i}><input type='radio' value={genre._id} onChange={(e) => this.setState({ genreId: e.target.value })} />{genre.name}</span>{(i % 3 === 0) ? <br></br> : ''} </span> }) : ""}<br></br>
                    <strong>Photo:</strong><input type="file" onChange={(e) => this.setPhoto(e.target.files[0])} /><br></br>
                    <strong>Video:</strong><input type="text" placeholder='Set the IFrame URL Video here' value={this.state.videoUrl} onChange={(e) => this.setVideo(e.target.value)} /><br></br>
                    <h3>Technologies & Prices:</h3>
                    <div>
                        <select onChange={(e) => this.setState({ technologyId: e.target.value })}><option value='0'>Choose Technolgy</option>{this.state.technologies ? this.state.technologies.map((technology, i) => { return <option key={i} value={technology._id}>{technology.name}</option> }) : ""}</select><br></br>
                        <input type="number" placeholder='Price Technolgy' value={this.state.price} onChange={(e) => this.setState({ price: (e.target.value) })} />
                        <button type='button' onClick={this.saveTechPrice}>Add</button>
                        <div class='displayData'>
                            {this.state.technologiesChoosed ? this.state.technologiesChoosed.map((techPrice, i) => { return (<li key={i}><strong>Technology :</strong> {this.getTechName(techPrice.technologyId)} | <strong>Price :</strong> {techPrice.price}$</li>) }) : ""}
                        </div>
                    </div><br></br>
                    <h3>Data Rooms:</h3>
                    <div>
                        <strong>Room:</strong><select onChange={(e) => this.setState({ roomId: e.target.value })}><option value='0'>Choose Room</option>{this.state.rooms ? this.state.rooms.map((room, i) => { return <option key={i} value={room._id}>{room.name}</option> }) : ""}</select><br></br>
                        <strong>Date:</strong><input type="date" value={this.state.roomDate} onChange={(e) => this.checkDate(e.target.value, 'roomDate')} /><br></br>
                        <strong>Times:</strong><br></br>{this.state.timesArr.map((time, i) => { return (<span key={i}><input type="checkbox" checked={time.status ? 'checked' : ''} value={time.value} onChange={(e) => this.changeStatusTime(e.target)} />&nbsp;{time.value}{((i + 1) % 6 === 0) ? <br></br> : <span>&nbsp;&nbsp;&nbsp;</span>}</span>) })}<br></br>
                        <select onChange={(e) => this.checkTechnology(e.target.value)}><option value='0'>Choose Technolgy</option>{this.state.technologies ? this.state.technologies.map((technology, i) => { return <option key={i} value={technology._id}>{technology.name}</option> }) : ""}</select>
                        <button type='button' onClick={this.saveDateTimeRoomData}>Add</button>
                        <div class='displayData'>
                            {this.state.dateTime ? this.state.dateTime.map((dateTime, i) => { return (<li key={i}><strong>Room :</strong> {this.getRoomName(dateTime.room)} | <strong>Date :</strong>  {dateTime.day} | <strong>Technology :</strong>  {this.getTechName(dateTime.technologyId)} | <strong>Times :</strong>  {dateTime.times.map((time, i) => { return <span key={i}><span>{time}</span>, </span> })}</li>) }) : ""}
                        </div>
                    </div><br></br>
                    <button type='submit'>Save</button>
                </form>
            </div>
        );
    }
}

AddMovie.propTypes = {

};

export default AddMovie;