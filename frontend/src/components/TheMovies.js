import React, { Component } from "react"
import BackendDataServices from "../services/BackendDataServices"
import { Link } from "react-router-dom"
import '../css/movies.css'

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
                        <div className="card cardMovies" style={{border: "2px solid red"}}>
                        <div className="card-body">
                            <div className="card-text">
                            <Link to = {`Movies/${movie._id}`}>
                                <div className="imgMovie">
                                    <img src={movie.photo} width='100%' height='400px' alt={movie.title} />
                                </div>
                                </Link>
                                <div>
                                    <h3 style={{textAlign: "center", float: "left", width: "60%", marginLeft : "60px", fontSize: "40px", color: "whitesmoke"}}>{movie.title}</h3><br />
                                
                                <div style={{float: "right", width: "20%", marginTop: "-22px"}}>
                                    <span style={{fontSize: "30px", color: "whitesmoke"}}>8.7</span>
                                    <img src="./star.png" style={{width: "24px", height: "24px", float: "right", marginTop: "8px"}}></img>
                                </div>  
                                </div>                             
                </div>
                    </div>
                        </div>
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