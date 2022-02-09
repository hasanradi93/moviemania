import React, { Component } from "react"
import BackendDataServices from "../services/BackendDataServices"
import { Link } from "react-router-dom"
import '../css/movies.css'

class TheMovies extends Component {

    constructor(props) {
        super(props)
        let allMovies = ''
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        BackendDataServices.getMovies()
            .then(response => {
                this.setState({ movies: response.data })
            })
            .catch(e => {
                console.log(e)
            })
    }
    render() {
        if (this.state.movies) {
            this.allMovies = this.state.movies.map((movie) => {
                return (
                    <div key={movie._id} className="col-lg-4 pb-1">
                        <div className="card cardMovies">
                            <div className="card-body">
                                <div className="card-text">
                                    <Link to={`Movies/${movie._id}`}>
                                        <div className="imgMovie">
                                            <img className="poster" src={movie.photo} width='100%' height='550px' alt={movie.title} />
                                        </div>
                                    </Link>
                                    <div className="movieInfo">
                                        <h3 className="movieTitle">{movie.title}</h3><br />

                                        <div className="ratingDiv">
                                            <span className="rating" >{movie.rating}</span>
                                            <img src={window.location.origin + '/star.png'} className="ratingStar"></img>
                                        </div>
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
                <div className="row">
                    {this.allMovies}
                </div>
            </div>
        )
    }
}

export default TheMovies