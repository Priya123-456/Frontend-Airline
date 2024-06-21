import React from 'react'
import Page from "./Page.jsx";
import LoginDailog from "./LoginDailog.jsx";
import { Routes, Route } from "react-router-dom"
import Home from './Home.jsx';


import Booking from './booking.jsx';
import FlightSearch from '../FlightSearch.jsx';
import PassengerInfoForm from './passengerInfo.jsx';
import OrderConfirmation from './OrderConfirmation.jsx';
import MyBookings from './MyBooking.jsx';



const Main = () => {
  
  return (
    <>
   <Routes>
       <Route path='/' element={<LoginDailog />} />
        
       
          
          
        <Route path='/register/' element={<Page />} />
        <Route path='/home' element={<Home />} />
      
     
        <Route path='/search' element={< FlightSearch/>} />
        <Route path='/booking' element={< Booking/>} />
        <Route path='/passenger' element={< PassengerInfoForm/>} />
        <Route path='/order' element={< OrderConfirmation/>} />
        <Route path='/mybookings' element={<MyBookings/>} />
       
      
        </Routes>
         
    </>
  )
}

export default Main
