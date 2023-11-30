import HomePage from "./components/homePage"
import axios from "axios"
import EventPage from "./components/eventsShow/EventModal"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from "./components/users/SignIn";
import SignUp from "./components/users/SIgnUp";
import UserDashboard from "./components/users/UserDashbord";

export default function App(){

  return(
    <div>
  <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/SignIn" element={<SignIn/>}/>
        <Route path="/SignUP" element={<SignUp/>}/>
        <Route path="/UserPage" element={<UserDashboard/>}/>
      </Routes>
    </Router>
    </div>
  )
}