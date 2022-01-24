import React, { Component } from "react"
import BackendDataServices from "../services/BackendDataServices"
import { Link } from "react-router-dom"

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
        getParsedDate = (strDate) => {
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
        render(){
                this.allMovies = this.state.movies.map((movie) => {
                let actors = ''
                movie.actors.forEach(element => {
                    actors += {element} + "-" 
                })
                actors = actors.substring(0, actors.length - 2)
                let dateTime = ''
                movie.dateTime.forEach(element => {
                    let times = ''
                    for (let i = 0; i < element.times.length; i++)
                        times += element.times[i] + '-'
                    times = times.substring(0, times.length - 2)
                    let day = this.getParsedDate(element.day)
                    console.log(day)
                    dateTime += <tr><td>{element.room.name}</td> <td>{times}</td> <td>{day}</td></tr>
                    console.log(dateTime)
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
                                        {dateTime}
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
            })  
        
    
        return( 
            <div className="row">
                {this.allMovies}
            </div>
    )
}     
}

export default TheMovies