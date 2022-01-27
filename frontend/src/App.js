import { React, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/nav.css'

import TheMovies from './components/TheMovies'
import MovieDetails from './components/MovieDetails'
import AdminPanel from './components/AdminPanel'
import AdminMovieTicket from './components/AdminMovieTicket'
import Login from './components/Login'
import NotFound from './components/NotFound'
import ComingSoon from './components/ComingSoon'
import SideBar from './components/SideBar'
import Profile from './components/Profile'
import UserTicket from './components/UserTicket'
import TheTickets from './components/TheTickets'
import MoviesAdmin from './components/NotFound'

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

      <SideBar />
      <div className="container mt-3 navclass" id='content' >
        <Routes>
          <Route exact path={"/"} element={<TheMovies />} />
          <Route exact path={"ComingSoon"} element={<ComingSoon />} />
          <Route
            path="Movies/:id" element={<MovieDetails />}
            render={(props) => (
              <MovieDetails {...props} user={user} />
            )}
          />
          <Route
            path="Login" element={<Login />}
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
          <Route
            path="Profile" element={<Profile />}
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
          <Route
            path="Profile/:id" element={<Profile />}
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
          <Route
            path="UserTicket/:id" element={<UserTicket />}
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
          <Route path="AdminPanel" element={<AdminPanel />} render={(props) => (
            <Login {...props} login={login} />
          )}>
            {/* nest these routes inside of the dashboard route */}
            <Route path="TheTickets" element={<TheTickets />} />
            <Route path="Movies" element={<MoviesAdmin />} />
          </Route>
          <Route
            path="*" element={<NotFound />} />
        </Routes>


      </div>
    </div >
  );
}

export default App;
