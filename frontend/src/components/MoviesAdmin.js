import React, { useState, useEffect } from "react"
import BackendDataServices from "../services/BackendDataServices"
import { Link } from "react-router-dom"
import '../App.css'
import FunctionTools from '../services/FunctionTools'

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

    let setMoviesData = ``
    if (movies) {
        setMoviesData = movies.map((movie) => {
            return (
                <div key={movie._id} className="col-lg-4 pb-1">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{movie.name}</h5>
                            <div className="card-text">
                                <h2>{movie.title}</h2><br />
                                <div className="imgMovie">
                                    <img src={movie.photo} width='100%' height='400px' alt={movie.title} />
                                </div>
                                <strong>Release Date: </strong>{FunctionTools.formatDate(movie.releasedate)}<br />
                                <strong>Plot: </strong>{movie.plot}<br />
                                <strong>Genre: </strong>{movie.genre.name}<br />
                                <strong>Available: </strong>
                                {FunctionTools.formatDate(movie.fromDate)} to
                                {FunctionTools.formatDate(movie.toDate)}<br />
                                <strong>Status: </strong> {(movie.Availability === 1) ? 'Available' : (movie.Availability === 0) ? 'Coming soon' : 'Ended'}<br />
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
                                                    <td>{FunctionTools.formatDate(dateTime.day)}</td>
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