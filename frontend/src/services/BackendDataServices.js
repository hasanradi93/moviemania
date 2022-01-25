//in servics folder
import http from "../http-common";

class BackendDataServices {
    getAll() {
        return http.get(`movies/admin`);
    }

    get(id) {
        return http.get(`/movies/${id}`);
    }


    createMovie(data) {
        return http.post("/movies/admin/", data);
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

}

export default new BackendDataServices();