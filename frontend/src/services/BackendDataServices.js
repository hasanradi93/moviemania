//in servics folder
import http from "../http-common";

class BackendDataServices {
    getAll() {
        return http.get(`admin/movies`);
    }

    get(id) {
        return http.get(`/movies/${id}`);
    }


    createMovie(data) {
        return http.post("/admin/movies", data);
    }

    updateMovie(data) {
        return http.put("/movies/${id}", data);
    }

    deleteMovie(id, userId) {
        return http.delete(`/movies/?id=${id}`);
    }

    getMovies() {
        return http.get('movies/get-newest-movies')
    }

    getUserTicketById(id) {
        return http.get(`/users/${id}`);
    }

    ComingSoon() {
        return http.get('movies/ComingSoon')
    }

    getTakenSeats(data) {
        return http.post('tickets/takenSeats', data)
    }

    getTickets() {
        return http.get('admin/tickets')
    }

    registerUser(data) {
        return http.get('users/register', data)
    }

    loginUser(data) {
        return http.get('users/login', data)
    }

    checkToken(data, headers) {
        return http.get('users/tokenIsValid', data, headers)
    }

    getUserData(headers) {
        return http.get(`/users/`, headers);
    }
}

export default new BackendDataServices();