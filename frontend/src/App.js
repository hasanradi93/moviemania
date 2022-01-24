import { React, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import TheMovies from './components/TheMovies'
import MovieDetails from './components/MovieDetails'
import MoviesAdmin from './components/MoviesAdmin'
import AdminMovieTicket from './components/AdminMovieTicket'
import Login from './components/Login'
import NotFound from './components/NotFound'
import ComingSoon from './components/ComingSoon'
import Navbar from './components/Navbar'

function App() {

  const [user, setUser] = useState(null)

  async function login(user = null) {
    setUser(user)
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>

      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<TheMovies />} />
          <Route exact path={"/ComingSoon"} element={<ComingSoon />} />
          <Route
            path="movies/admin" element={<MoviesAdmin />}
            render={(props) => (
              <MoviesAdmin {...props} user={user} />
            )}
          />
          <Route
            path="/movies/:id" element={<MovieDetails />}
            render={(props) => (
              <MovieDetails {...props} user={user} />
            )}
          />
          <Route
            path="/login" element={<Login />}
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
          <Route
            path="/admin/movies/:id" element={<AdminMovieTicket />}
            render={(props) => (
              <AdminMovieTicket {...props} user={user} logout={logout} />
            )}
          />
          <Route
            path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;