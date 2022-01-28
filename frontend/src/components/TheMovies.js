import React, { Component } from "react"
import BackendDataServices from "../services/BackendDataServices"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'


class TheMovies extends Component{
  
    constructor(props){
        super(props)
        let allMovies =''
        this.state={
            movies: []
        }
    }
        
    componentDidMount(){
        BackendDataServices.getMovies()
            .then(response => {
                console.log("data", response.data)
                this.setState({movies : response.data})
                console.log(this.state.movies)
            })
            .catch(e => {
                console.log(e)
            })
        }   
        render(){
            if (this.state.movies) {
                const { navigate } = this.props;
                this.allMovies = this.state.movies.map((movie) => {
                    return (
                        <div key={movie._id} className="col-lg-4 pb-1">
                            <Link to = {`Movies/${movie._id}`}>
                            <div className="card" onClick={() => navigate('MovieDetails')}>
                                <div className="card-body">
                                    <div className="card-text">
                                        <div className="imgMovie">
                                            <img src={movie.photo} width='100%' height='400px' alt={movie.title} />
                                            <h3>{movie.title}</h3><br />
                                        </div>                               
                        </div>
                            </div>
                                </div>
                                </Link>
                                    </div>                              
                                        
                )})}
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