import React, { useState, useEffect, useRef} from "react"
import BackendDataServices from "../services/BackendDataServices"
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import FunctionTools from '../services/FunctionTools'
import '../css/movieDetails.css'

const MoviesDetails = props => {
    const [movie, setMovie] = useState([])
    const [day,setday] =useState([])
    const [room,setRoom] = useState([])
    // const day = useRef('') 
    // const room = useRef(0) 
    const  movieId  = useParams().id

    useEffect(() => {
        retrieveMovie()
    }, [])

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

  const groupByDays = (arr) => {
    const newarr = Array.from(new Set(arr.map(JSON.stringify))).map(JSON.parse);
    
    day.current=arr[0]
    console.log("dayy",day)
    return newarr
  }

   const getRoomsDay = (daySelected) => {
     const rooms= movie[0].dateTime.filter((dateTime) => {
         if (dateTime.day === daySelected)
         return dateTime.room 
     })
     day.current =daySelected
     console.log("daySelected",day)
     console.log("room", room)
     return rooms
   }


   const getTimesDay = (roomIdSelected) => {
    const times= movie[0].dateTime.filter((dateTime) => {
        if ((dateTime.room._id  === roomIdSelected) && (dateTime.day === day)){
            room.current = roomIdSelected
            return dateTime.times
        }
    })
    return times
  }
  

    let setMoviesData = ``
    if (movie[0]) {
        let movieDetails= movie[0]
        let arrDays = movieDetails.dateTime.map((dateTime) => dateTime.day)
        // let arrRoom = movieDetails.dateTime.map((dateTime) => dateTime.room)

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
                    { groupByDays(arrDays).map((dayData , i ,arr) => { return <li key={i} className={i === 0 ? 'active' : ''} onClick={ () => getRoomsDay(dayData)}>{FunctionTools.formatDate(dayData)}</li>}) }
                  </ul>
                </div>
                <div className="roomData">  
                  <ul> 
                    { getRoomsDay(arrDays[0]).map((roomData,i,arr) => { return <li key={i} className={i === 0 ? 'active' : ''} onClick={ () => getTimesDay(roomData.room._id)}>{roomData.room.name}</li>})}
                  </ul>
                </div>
                <div className="timeData">
                <ul> 
                    {getTimesDay(arrDays[0]).map((timeData,i,arr) => { return <li key={i} className={i === 0 ? 'active' : ''}>{timeData}</li>})}
                  </ul>
                </div>
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