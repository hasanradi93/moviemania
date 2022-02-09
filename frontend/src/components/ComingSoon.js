import React, { Component } from "react"
import BackendDataServices from "../services/BackendDataServices"
import { Link } from "react-router-dom"
import FunctionTools from "../services/FunctionTools"
import '../css/movies.css'


class ComingSoon extends Component {

    constructor(props) {
        super(props)
        let allMovies = ''
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        BackendDataServices.ComingSoon()
            .then(response => {
                console.log("data", response.data)
                this.setState({ movies: response.data })
                console.log(this.state.movies)
            })
            .catch(e => {
                console.log(e)
            })
    }
    render() {
        if (this.state.movies) {
            const { navigate } = this.props;
            this.allMovies = this.state.movies.map((movie) => {
                return (
                    <div key={movie._id} className="col-lg-4 pb-1">
                        <div className="card cardMovies">
                            <div className="card-body">
                                <div className="card-text">                    
                                        <div className="imgMovie">
                                            <img className="poster" src={movie.photo} width='100%' height='450px' alt={movie.title} />
                                        </div>
                                    <div className="movieInfo">
                                        <h3 className="movieTitle">{movie.title}</h3><br />
                                        <h3 className="comingSoonTitle">{FunctionTools.daysLeft(new Date(), movie.fromDate)} Days Left</h3>
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
export default ComingSoon