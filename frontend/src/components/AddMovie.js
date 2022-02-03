import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackendDataServices from '../services/BackendDataServices';

class AddMovie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            plot: "",
            director: "",
            releasedate: "",
            runtime: 0,
            rating: 0,
            fromdate: "",
            todate: "",
            actors: [],
            availability: 0,
            genres: [],
            genreId: 0,
            technologies: [],
            technologiesChoosed: [],
            technologyId: 0,
            price: 0,
            rooms: [],
            dateTime: []
        }
    }


    componentDidMount() {
        this.getGenres()
        this.getTechnologies()
        this.getRooms()
    }

    getGenres = () => {
        BackendDataServices.getGenres()
            .then(response => {
                this.setState({ genres: response.data })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    getTechnologies = () => {
        BackendDataServices.getTechnologies()
            .then(response => {
                this.setState({ technologies: response.data })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    getRooms = () => {
        BackendDataServices.getRooms()
            .then(response => {
                this.setState({ rooms: response.data })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }


    componentDidUpdate(prevProps, prevState) {
        //console.log("ddsfd", this.state.technologies)
        //console.log(this.state.genreId)
    }

    saveTechPrice = () => {
        if (this.state.price && this.state.technologyId) {
            let exist = false
            for (let i = 0; i < this.state.technologiesChoosed.length; i++) {
                if (this.state.technologiesChoosed[i].technologyId === this.state.technologyId) {
                    exist = true
                    break
                }
            }
            if (!exist)
                this.state.technologiesChoosed.push({ "technologyId": this.state.technologyId, "price": this.state.price })
            else
                alert("Existed before")
        }
        else
            alert("Check data")

    }

    getTechName = (techId) => {
        for (let i = 0; i < this.state.technologies.length; i++) {
            if (techId === this.state.technologies[i]._id)
                return this.state.technologies[i].name
        }
    }

    saveMovie = (e) => {
        e.preventDefault()
        // console.log(this.state.title)
        // console.log(this.state.plot)
    }

    render() {
        return (
            <div className='moveiDataForm'>
                <form onSubmit={this.saveMovie}>
                    <strong>Title:</strong> <input type="text" placeholder='Movie Title' value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} /><br></br>
                    <strong>Plot:</strong><input type="text" placeholder='Movie Plot' value={this.state.plot} onChange={(e) => this.setState({ plot: e.target.value })} /><br></br>
                    <strong>Director:</strong><input type="text" placeholder='Movie Director' value={this.state.director} onChange={(e) => this.setState({ director: e.target.value })} /><br></br>
                    <strong>Release date:</strong><input type="date" placeholder='Release date' value={this.state.releasedate} onChange={(e) => this.setState({ releasedate: e.target.value })} /><br></br>
                    <strong>Run time:</strong><input type="date" placeholder='Release date' value={this.state.runtime} onChange={(e) => this.setState({ runtime: e.target.value })} /><br></br>
                    <strong>Rating:</strong><input type="text" placeholder='Rating IMDB' value={this.state.rating} onChange={(e) => this.setState({ rating: e.target.value })} /><br></br>
                    <strong>From date:</strong><input type="date" value={this.state.fromdate} onChange={(e) => this.setState({ fromdate: e.target.value })} /><br></br>
                    <strong>To Date:</strong><input type="date" value={this.state.todate} onChange={(e) => this.setState({ todate: e.target.value })} /><br></br>
                    <strong>Availability</strong><input type="checkbox" value={this.state.availability} onChange={(e) => this.setState({ availability: e.target.checked ? 1 : 0 })} /><br></br>
                    <strong>Actors</strong><input type="text" placeholder='Movie Actors [use comma]' value={this.state.actors} onChange={(e) => this.setState({ actors: (e.target.value).split(",") })} /><br></br>
                    <strong>Genre:</strong>{this.state.genres ? this.state.genres.map((genre, i) => { return <span key={i}><input type='radio' value={genre._id} onChange={(e) => this.setState({ genreId: e.target.value })} />{genre.name}</span> }) : ""}<br></br>
                    <strong>Technologies & Prices:</strong>
                    <div>
                        <select onChange={(e) => this.setState({ technologyId: e.target.value })}><option value='0'>Choose Technolgy</option>{this.state.technologies ? this.state.technologies.map((technology, i) => { return <option key={i} value={technology._id}>{technology.name}</option> }) : ""}</select><br></br>
                        <input type="number" placeholder='Price Technolgy' value={this.state.price} onChange={(e) => this.setState({ price: (e.target.value) })} />
                        <button type='button' onClick={this.saveTechPrice}>Add</button>
                        <div id='dataTech'>
                            {this.state.technologiesChoosed ? this.state.technologiesChoosed.map((techPrice, i) => { return (<li key={i}>{this.getTechName(techPrice.technologyId)}, {techPrice.price}</li>) }) : ""}
                        </div>
                    </div><br></br>
                    <strong>Data Rooms:</strong>
                    <div>
                        <select onChange={(e) => this.setState({ technologyId: e.target.value })}><option value='0'>Choose Technolgy</option>{this.state.technologies ? this.state.technologies.map((technology, i) => { return <option key={i} value={technology._id}>{technology.name}</option> }) : ""}</select><br></br>
                        <input type="number" placeholder='Price Technolgy' value={this.state.price} onChange={(e) => this.setState({ price: (e.target.value) })} />
                        <button type='button' onClick={this.saveTechPrice}>Add</button>
                        <div id='dataTech'>
                            {this.state.technologiesChoosed ? this.state.technologiesChoosed.map((techPrice, i) => { return (<li key={i}>{this.getTechName(techPrice.technologyId)}, {techPrice.price}</li>) }) : ""}
                        </div>
                    </div><br></br>
                    <button type='submit'>Save</button>
                </form>
            </div>
        );
    }
}

AddMovie.propTypes = {

};

export default AddMovie;