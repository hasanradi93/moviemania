import { React, useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import TheMovies from './components/TheMovies'
import MovieDetails from './components/MovieDetails'
import MoviesAdmin from './components/MoviesAdmin'
import AdminMovieTicket from './components/AdminMovieTicket'
import Login from './components/Login'

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
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/movies" className="navbar-brand">
          MovieMania
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/movies"} className="nav-link">
              Movies
            </Link>
          </li>
          <li className="nav-item" >
            {user ? (
              <a onClick={logout} className="nav-link" style={{ cursor: 'pointer' }}>
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}

          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/movies"]} component={TheMovies} />
          <Route
            path="/movies/admin"
            render={(props) => (
              <MoviesAdmin {...props} user={user} />
            )}
          />
          <Route
            path="/movies/:id"
            render={(props) => (
              <MovieDetails {...props} user={user} />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
          <Route
            path="/admin/movie/:id"
            render={(props) => (
              <AdminMovieTicket {...props} user={user} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
