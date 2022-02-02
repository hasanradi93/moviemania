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

    getUserTicketsById(id) {
        return http.get(`/tickets/user/${id}`);
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

    getUserDataById(id){
        return http.get(`/users/getData/${id}`)
    }
}

export default new BackendDataServices();