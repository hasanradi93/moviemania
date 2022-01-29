import React, { useState, useEffect } from "react"
import BackendDataServices from "../services/BackendDataServices"
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import FunctionTools from '../services/FunctionTools'
import '../css/movieDetails.css'

const MoviesDetails = props => {
    const [movie, setMovie] = useState([])
    const  movieId  = useParams().id

    useEffect(() => {
        retrieveMovie()
    }, [])

  const groupByDays = (arr) => {
    const newarr = Array.from(new Set(arr.map(JSON.stringify))).map(JSON.parse);
    return newarr
  }

  const retrieveMovie = () => { 
    BackendDataServices.get(movieId)
        .then(response => { 
            const movieData = response.data
            setMovie(movieData)

        })
        .catch(e => {
            console.log(e)
        })
}

    let setMoviesData = ``
    
    if (movie[0]) {
        let movieDetails= movie[0]
        
        let arrDays = movieDetails.dateTime.map((dateTime) => dateTime.day)
        let arrTimes = movieDetails.dateTime.map((dateTime) => dateTime.times)
        setMoviesData =

        <div className="containerMovie">
            <div className="containerImageDetails">
               <div className="conatinerImage">
                 <img src={movieDetails.photo} height='500px' alt={movieDetails.title} />
               </div>

               <div className="conatinerDetails">
                 <h1 className="card-title">{movieDetails.title}</h1>
                 <div className="card-text">
                    <strong>Release Date: </strong>{movieDetails.releasedate}<br />
                    <strong>Run Time: </strong>{movieDetails.runtime}<br />
                    <strong>Plot: </strong>{movieDetails.plot}<br />
                    <strong>Director: </strong>{movieDetails.director}<br />
                    <strong>Actors: </strong>
                      {movieDetails.actors.map((actor, i, arr) => <span key={i} className="actorMovie">{actor} {i !== (arr.length - 1) ? ',' : ''}</span>)}<br></br>
                    <strong>Genre: </strong>{movieDetails.genre.name}<br />
                    <strong>Available: </strong>
                       {FunctionTools.formatDate(movieDetails.fromDate)} to
                       {FunctionTools.formatDate(movieDetails.toDate)}<br />
                   <strong>Technology: </strong>
                        {movieDetails.technology.map((technology, i, arr) => <span key={i} className="technolgyMovie">{technology.technologyId.name} {i !== (arr.length - 1) ? ',' : ''}</span>)}<br></br>
                   <strong>Date Times:</strong>
                   <table className='dateTimeAdminStyle'>
                        <thead><tr><th>Room</th><th>Times</th><th>Day</th></tr></thead>
                        <tbody>
                            { movieDetails.dateTime.map((dateTime, i) => {
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
              </div>
            </div>

            <div className="containerTrailer">   </div> 
            <div className="branchs"> </div>
            <div className="reservation">
                <div className="dayData">
                  <ul>
                    { groupByDays(arrDays).map((day , i ,arr) => { return <li key={i} className={i !== 1 ? 'active' : ''}>{FunctionTools.formatDate(day)}</li>}) }
                  </ul>
                </div>
                <div className="roomData">  
               
                   </div>
                <div className="timeData"></div>
            </div>
            <div className="paymentForm"></div>
        </div>




                // <div key={movie[0]._id} className="col-lg-4 pb-1">
                //     <div className="card">
                //         <div className="card-body">
                //          
                //             <div className="card-text">
                //                 <strong>Release Date: </strong>{movie[0].releasedate}<br />
                //                 <strong>Plot: </strong>{movie[0].plot}<br />
                //                 <strong>Actors: </strong>
                //                 {
                //                      movie[0].actors.map((actor, i, arr) => <span key={i} className="actorMovie">{actor} {i !== (arr.length - 1) ? ',' : ''}</span>)
                //                }<br></br>
                //                 <strong>Date Times:</strong>
                //                 <table className='dateTimeAdminStyle'>
                //                     <thead><tr><th>Room</th><th>Times</th><th>Day</th></tr></thead>
                //                     <tbody>
                //                         {
                //                            movie[0].dateTime.map((dateTime, i) => {
                //                                 return <tr key={i}>
                //                                     <td>{dateTime.room.name}</td>
                //                                     <td>{
                //                                         dateTime.times.map((time, i, arr) => { return <span key={i} className="timesMovie">{time} {i !== (arr.length - 1) ? ',' : ''}</span> })
                //                                     }</td>
                //                                     <td>{FunctionTools.formatDate(dateTime.day)}</td>
                //                                 </tr>
                //                             })
                //                         }
                //                     </tbody>

                //                 </table>
                //             </div>
                //             <div className="row">
                //                 <Link to={"/movies/" + movie[0]._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                //                     View Detail
                //                 </Link>
                //                 <Link to={"/movies/" + movie[0]._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                //                     View tickets
                //                 </Link>
                //             </div>
                //         </div>
                //     </div>
                // </div>
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