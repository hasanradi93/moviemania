import { React, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import TheMovies from './components/TheMovies'
import MovieDetails from './components/MovieDetails'
import AdminPanel from './components/AdminPanel'
import Login from './components/auth/Login'
import NotFound from './components/NotFound'
import ComingSoon from './components/ComingSoon'
import SideBar from './components/SideBar'
import Profile from './components/Profile'
import Register from './components/auth/Register'
import UserTicket from './components/UserTicket'
import TicketsAdmin from './components/TicketsAdmin'
import MoviesAdmin from './components/MoviesAdmin'
import Navbar from './components/Navbar'
import UserContext from "./context/UserContext";
import BackendDataServices from './services/BackendDataServices'
function App() {

  // State variable to send to multiple components
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token"); // grabbing JWT token from localStorage
      if (token === null) {
        // if there is no token we then set the localStorage key to auth-token and the value of token to an empty string. This avoids any errors
        localStorage.setItem("auth-token", "");
        token = "";
      }
      else {
        console.log(token)
      }
      // Here we are calling to our backend to make sure our JWT Response is valid
      const tokenRes = await BackendDataServices.checkToken(null, // body is set to null
        { headers: { "x-auth-token": token } }
      );
      // if there is token response data then we will grab that user and then setUserData to hold the token information and the user response data
      if (tokenRes.data) {
        const userRes = await BackendDataServices.getUserData({
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    // We have to call on our function within a useEffect to make our function async / await
    checkLoggedIn();
  }, []);

  return (
    <div>
      <Navbar />
      <SideBar />
      <div className="container mt-3 navclass" id='content' >
        {/* UserContext.Provider is Context API similiar to Redux. We are wrapping the components that we want to share state with. */}
        <UserContext.Provider value={{ userData, setUserData }}>
          <Routes>
            <Route exact path={"/"} element={<TheMovies />} />
            <Route exact path={"ComingSoon"} element={<ComingSoon />} />
            <Route path="Movies/:id" element={<MovieDetails />} />
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="UserTicket/:id" element={<UserTicket />} />
            <Route path="AdminPanel" element={<AdminPanel />} >
              {/* nest these routes inside of the dashboard route */}
              <Route index element={<TicketsAdmin />} />
              <Route path="Tickets" element={<TicketsAdmin />} />
              <Route path="Movies" element={<MoviesAdmin />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserContext.Provider>

      </div>
    </div >
  );
}

export default App;
