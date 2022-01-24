import React, { useState, useEffect } from "react"
import BackendDataServices from "../services/BackendDataServices"
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'

const MoviesDetails = props => {
    const [movie, setMovie] = useState([])
    const  movieId  = useParams().id
    console.log(movieId)

    useEffect(() => {
        retrieveMovie()
    }, [])

    const retrieveMovie = () => {
        BackendDataServices.get(movieId)
            .then(response => {
                console.log("dataa", response.data)
                setMovie(response.data)
                console.log(movie)

            })
            .catch(e => {
                console.log(e)
            })
    }

    const getParsedDate = (strDate) => {
        var strSplitDate = String(strDate).split('T')
        var date = new Date(strSplitDate[0])
        // alert(date)
        var dd = date.getDate()
        var mm = date.getMonth() + 1 //January is 0!

        var yyyy = date.getFullYear()
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        date = dd + "-" + mm + "-" + yyyy
        return date.toString()
    }

    let setMoviesData = ``
    if (movie) {
            let actors = ''
            movie.actors.forEach(element => {
                actors += `${element} - `
            })
            actors = actors.substring(0, actors.length - 2)
            let dateTimeData = ''
            movie.dateTime.forEach(element => {
                let times = ''
                for (let i = 0; i < element.times.length; i++)
                    times += element.times[i] + '-'
                times = times.substring(0, times.length - 2)
                let day = getParsedDate(element.day)
                console.log(day)
                dateTimeData += <tr><td>{element.room.name}</td> <td>{times}</td> <td>{day}</td></tr>
                console.log(dateTimeData)
            })
            return (
                <div key={movie._id} className="col-lg-4 pb-1">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{movie.name}</h5>
                            <p className="card-text">
                                <strong>Release Date: </strong>{movie.releasedate}<br />
                                <strong>Plot: </strong>{movie.plot}<br />
                                <strong>Actors: </strong>{actors}
                                <strong>Date Times:</strong>
                                <table>
                                    <tr><td>Room</td><td>Times</td><td>Day</td></tr>
                                    {dateTimeData}
                                </table>
                            </p>
                            <div className="row">
                                <Link to={"/movies/" + movie._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                    View Detail
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
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