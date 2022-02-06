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

    get(id) {
        return http.get(`/movies/${id}`);
    }

    getTakenSeats(data) {
        return http.post('tickets/takenSeats', data)
    }

    addMovie(data) {
        return http.post("/admin/movies", data);
    }

    updateMovie(data) {
        return http.put("/movies/${id}", data);
    }

    registerUser(data) {
        return http.post('users/register', data)
    }

    loginUser(data) {
        return http.post('users/login', data)
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

    uploadPhoto(formData, data) {
        return http.post(`users/uploadPhoto`, formData, data)
    }

    getUserTickets(data) {
        return http.post('/tickets/userTickets', data)
    }

    buyTicket(data) {
        return http.post('/tickets/', data)
    }
}

export default new BackendDataServices();