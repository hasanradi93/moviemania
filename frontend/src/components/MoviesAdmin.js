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
        if (searchName) {
            console.log("searchName", searchName)
            BackendDataServices.findMovies({ "name": searchName })
                .then(response => {
                    console.log("response.data", response.data)
                    setMovies(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
        }
        else
            alert("Write movie name")
    }

    let setMoviesData = ``
    if (movies) {
        setMoviesData = movies.map((movie) => {
            return (
                <div key={movie._id} className="col-lg-4 pb-1">
                    <div className="card cardMovies">
                        <div className="card-body">
                            <div className="card-text">
                                <Link to={`/Movies/${movie._id}`}>
                                    <div className="imgMovie">
                                        <img className="poster" src={movie.photo} width='100%' height='400px' alt={movie.title} />
                                    </div>
                                </Link>
                                <div className="movieInfo">
                                    <h3 className="movieTitle">{movie.title}</h3><br />
                                    <div className="ratingDiv">
                                        <span className="rating" >{movie.rating}</span>
                                        <img src={window.location.origin + '/star.png'} className="ratingStar"></img>
                                    </div>
                                </div>
                                <div className="movieInfo">
                                    <Link to={"edit/" + movie._id} className="btn btn-primary col-lg-6" style={{ background: 'linear-gradient(#870f06, #a3020d)', borderColor: 'black' }}>
                                        Edit Detail
                                    </Link>
                                    <Link to={"tickets/" + movie._id} className="btn btn-primary col-lg-6" style={{ background: 'linear-gradient(#870f06, #a3020d)', borderColor: 'black' }}>
                                        View tickets
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )
        })
    }

    return (
        <div>
            <div className="row pb-1" style={{ textAlign: 'center', marginBottom: '10px' }}>
                <Link to={"add"}><img src={window.location.origin + '/add.png'} width='32px' height='32px' alt='Add Movie'></img></Link>
            </div>
            <div className="row pb-1" style={{ marginBottom: '20px' }}>
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
                            className="btn searchBtn"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                {movies ? setMoviesData : 'No Movies'}
            </div>
        </div>
    )
}

export default MoviesAdmin