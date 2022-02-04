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

    createMovie(data) {
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

    getTechnologies() {
        return http.get('technologies/')
    }

    uploadPhoto(formData, id) {
        return http.post(`users/uploadPhoto/${id}`, formData, {})
    }






    getUserDataById(id) {
        return http.get(`/users/getData/${id}`)
    }

    getUserTicketsById(id) {
        return http.get(`/tickets/user/${id}`);
    }
}

export default new BackendDataServices();