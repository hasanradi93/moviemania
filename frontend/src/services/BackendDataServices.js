//in servics folder
import http from "../http-common";

class BackendDataServices {
    getAll() {
        return http.get(`admin/movies`);
    }

    getMovies() {
        return http.get('movies/get-newest-movies')
    }

    ComingSoon() {
        return http.get('movies/ComingSoon')
    }

    getMovieData(id) {
        return http.get(`/movies/${id}`);
    }

    getTakenSeats(data) {
        return http.post('tickets/takenSeats', data)
    }

    findMovies(data) {
        return http.post(`admin/movies/find`, data);
    }

    addMovie(data) {
        return http.post("/admin/movies", data);
    }

    updateMovie(id, data) {
        return http.put(`/admin/movies/${id}`, data);
    }

    registerUser(data) {
        return http.post('users/register', data)
    }

    loginUser(data) {
        return http.post('users/login/', data)
    }

    checkToken(data, headers) {
        return http.post('users/tokenIsValid', data, headers)
    }

    getUserData(data, headers) {
        return http.post(`/users/`, data, headers);
    }

    getGenres() {
        return http.get('genres/')
    }

    getRooms() {
        return http.get('rooms/')
    }

    getTickets() {
        return http.get('tickets/')
    }

    getTechnologies() {
        return http.get('technologies/')
    }

    uploadPhoto(formData) {
        return http.post(`users/uploadPhoto`, formData)
    }

    updateUsername(formData) {
        console.log(formData)
        return http.post(`users/updateUsername`, formData)
    }

    updateName(formData, id) {
        return http.post(`users/updateName/`,formData,id)
    }

    getUserTickets(data) {
        return http.post('/tickets/userTickets', data)
    }

    getUsersAndCountTickets(data) {
        return http.get('/users/getUsersAndCountTickets', data)
    }

    getMovieTickets(id) {
        return http.post(`/admin/tickets/movie/${id}`);
    }

    buyTicket(data) {
        return http.post('/tickets/', data)
    }

    cancelTicket(data) {
        return http.post('/tickets/cancelTicket', data)
    }



}

export default new BackendDataServices();