import { React, useState, useEffect, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './css/preloader.css'

import TheMovies from './components/TheMovies'
import MovieDetails from './components/MovieDetails'
import AdminPanel from './components/AdminPanel'
import TicketsMovie from './components/TicketsMovie'
import Login from './components/auth/Login'
import NotFound from './components/NotFound'
import ComingSoon from './components/ComingSoon'
import SideBar from './components/SideBar'
import Profile from './components/Profile'
import Register from './components/auth/Register'
import UserTicket from './components/UserTicket'
import AllTickets from './components/AllTickets'
import MoviesAdmin from './components/MoviesAdmin'
import EditMovie from './components/EditMovie'
import Navbar from './components/Navbar'
import UserContext from "./context/UserContext";
import BackendDataServices from './services/BackendDataServices'
import AddMovie from './components/AddMovie'
import CountTicketsUser from './components/CountTicketsUser'
function App() {
  //const { userDataCheck } = useContext(UserContext);
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
      // Here we are calling to our backend to make sure our JWT Response is valid
      const tokenRes = await BackendDataServices.checkToken({ "data": 0 }, { headers: { "x-auth-token": token } })
      // if there is token response data then we will grab that user and then setUserData to hold the token information and the user response data
      if (tokenRes.data) {
        const userRes = await BackendDataServices.getUserData({ "id": tokenRes.data.id }, { headers: { "x-auth-token": token } })
        console.log("userRes", userRes)
        setUserData({
          token: token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
    const preloader = () => {
      let interval = setInterval(() => {
        document.getElementById('preloader').style.display = 'none';
        document.getElementById('allWebsite').style.display = 'block';
        clearInterval(interval)
      }, 3000)
    }
    preloader();
  }, []);


  return (
    <div>
      {/* UserContext.Provider is Context API similiar to Redux. We are wrapping the components that we want to share state with. */}
      <UserContext.Provider value={{ userData, setUserData }}>
      <div id="preloader"> 
      <div id="loader" class="nfLoader">   <img className='moviemania' style={{ color: "wheat", textAlign: "center", marginTop: "-200px", marginLeft: "-200px", width: '500px'}} src='../moviemaniaTitlepng.png'></img> </div>
      </div> 
      <div id='allWebsite' style={{display: "none"}}>
        <Navbar />
        <SideBar />
        <div className="container mt-3 navclass" id='content' >
          <Routes>
            <Route exact path={"/"} element={<TheMovies />} />
            <Route path={"ComingSoon"} element={<ComingSoon />} />
            <Route path="Movies/:id" element={<MovieDetails />} />
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="UserTicket/:id" element={<UserTicket />} />
            <Route path="AdminPanel" element={<AdminPanel />} >
              {/* nest these routes inside of the dashboard route */}
              <Route index element={<AllTickets />} />
              <Route path="Tickets" element={<AllTickets />} />
              <Route path="AllUsers" element={<CountTicketsUser />} />
              <Route path="Movies" element={<MoviesAdmin />} />
              <Route path="Movies/add" element={<AddMovie />} />
              <Route path="Movies/edit/:id" element={<EditMovie />} />
              <Route path="Movies/Tickets/:id" element={<TicketsMovie />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
        </div>
      </UserContext.Provider>
    </div >
  );
}

export default App;
