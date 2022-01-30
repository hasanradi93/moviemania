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

    getUserDataById(id) {
        return http.get(`/users/${id}`);
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

}

export default new BackendDataServices();