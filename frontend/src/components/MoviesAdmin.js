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
                    <div className="card cardMovies">
                        <div className="card-body">
                            <div className="card-text">
                                <Link to={`/Movies/${movie._id}`}>
                                    <div className="imgMovie">
                                        <img className="poster" src={movie.photo} width='100%' height='400px' alt={movie.title} />
                                    </div>
                                </Link>
                                <div className="row">
                                    <h3 className="movieTitle">{movie.title}</h3><br />
                                    <div className="ratingDiv">
                                        <span className="rating" >{movie.rating}</span>
                                        <img src="./star.png" className="ratingStar"></img>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <Link to={"edit/" + movie._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                    Edit Detail
                                </Link>
                                <Link to={"tickets/" + movie._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
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
            <div className="row pb-1" style={{ textAlign: 'center', marginBottom: '10px' }}>
                <Link to={"add"}><img src='../add.png' width='32px' height='32px' alt='Add Movie'></img></Link>
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
                {setMoviesData}
            </div>
        </div>
    )
}

export default MoviesAdmin