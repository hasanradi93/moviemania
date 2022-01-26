import React, { useState, useEffect } from "react"
import BackendDataServices from "../services/BackendDataServices"
import { Link } from "react-router-dom"
import '../App.css'

const MoviesAdmin = props => {
    const [movies, setMovies] = useState([])
    const [searchName, setSearchName] = useState("")

    useEffect(() => {
        retrieveMovies()
    }, [])

    const onChangeSearchName = e => {
        const searchName = e.target.value
        setSearchName(searchName)
    }



    const retrieveMovies = () => {
        BackendDataServices.getAll()
            .then(response => {
                setMovies(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }


    const findByName = () => {
        //find(searchName, "name")
        console.log("find y name")
    }

    function formatDate(newDate) {
        const months = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December',
        }
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        let d = String(newDate).split('T')
        d = new Date(d[0])
        const year = d.getFullYear()
        const date = d.getDate()
        const monthIndex = d.getMonth()
        const monthName = months[monthIndex]
        const dayName = days[d.getDay()] // Thu
        const formatted = `${dayName}, ${date} ${monthName} ${year}`
        return formatted.toString()
    }

    let setMoviesData = ``
    if (movies) {
        setMoviesData = movies.map((movie) => {
            return (
                <div key={movie._id} className="col-lg-4 pb-1">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{movie.name}</h5>
                            <div className="card-text">
                                <strong>Release Date: </strong>{movie.releasedate}<br />
                                <strong>Plot: </strong>{movie.plot}<br />
                                <strong>Actors: </strong>
                                {
                                    movie.actors.map((actor, i, arr) => <span key={i} className="actorMovie">{actor} {i !== (arr.length - 1) ? ',' : ''}</span>)
                                }<br></br>
                                <strong>Date Times:</strong>
                                <table className='dateTimeAdminStyle'>
                                    <thead><tr><th>Room</th><th>Times</th><th>Day</th></tr></thead>
                                    <tbody>
                                        {
                                            movie.dateTime.map((dateTime, i) => {
                                                return <tr key={i}>
                                                    <td>{dateTime.room.name}</td>
                                                    <td>{
                                                        dateTime.times.map((time, i, arr) => { return <span key={i} className="timesMovie">{time} {i !== (arr.length - 1) ? ',' : ''}</span> })
                                                    }</td>
                                                    <td>{formatDate(dateTime.day)}</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>

                                </table>
                            </div>
                            <div className="row">
                                <Link to={"/movies/" + movie._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                    View Detail
                                </Link>
                                <Link to={"/movies/" + movie._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                    View tickets
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <div className="row pb-1">
                <div className="input-group col-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                {

                    setMoviesData

                }


            </div>
        </div>
    )
}

export default MoviesAdmin