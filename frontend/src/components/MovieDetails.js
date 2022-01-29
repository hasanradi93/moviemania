import React, { useState, useEffect } from "react"
import BackendDataServices from "../services/BackendDataServices"
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import FunctionTools from '../services/FunctionTools'

const MoviesDetails = props => {
    const [movie, setMovie] = useState([])
    const movieId = useParams().id

    useEffect(() => {
        retrieveMovie()
    }, [])

    const retrieveMovie = () => {
        BackendDataServices.get(movieId)
            .then(response => {
                console.log("dataa", response.data)
                const movieData = response.data
                setMovie(movieData)

            })
            .catch(e => {
                console.log(e)
            })
    }

    let setMoviesData = ``
    if (movie[0]) {

        setMoviesData =
            <div key={movie[0]._id} className="col-lg-4 pb-1">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{movie[0].title}</h5>
                        <div className="card-text">
                            <strong>Release Date: </strong>{movie[0].releasedate}<br />
                            <strong>Plot: </strong>{movie[0].plot}<br />
                            <strong>Actors: </strong>
                            {
                                movie[0].actors.map((actor, i, arr) => <span key={i} className="actorMovie">{actor} {i !== (arr.length - 1) ? ',' : ''}</span>)
                            }<br></br>
                            <strong>Date Times:</strong>
                            <table className='dateTimeAdminStyle'>
                                <thead><tr><th>Room</th><th>Times</th><th>Day</th></tr></thead>
                                <tbody>
                                    {
                                        movie[0].dateTime.map((dateTime, i) => {
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
                            <Link to={"/movies/" + movie[0]._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                View Detail
                            </Link>
                            <Link to={"/movies/" + movie[0]._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                View tickets
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    }

    return (
        <div>
            <div className="row">
                {

                    setMoviesData

                }


            </div>
        </div>
    )
}

export default MoviesDetails