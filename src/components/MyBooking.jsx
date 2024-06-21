

import React, { useState, useEffect } from 'react';
import { getBookings, cancelBooking ,getUsers} from './services/api.js'; // Import cancelBooking from API
import { useNavigate } from 'react-router-dom';

import './css/booking.css'; 

const BookingItem = ({ booking, onCancel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <ul className="booking-item" style={{padding:"10px"}}>
      <div className="booking-summary" onClick={toggleExpand}>
        <div>Passenger ID: {booking.orderId}</div>
        <div>From: {booking.fromCity} To: {booking.toCity}</div>
      </div>
      {isExpanded && (
        <div className="booking-details" style={{fontSize:"20px"}}>
          <div><strong>Flight ID:</strong> {booking.flightId}</div>

          <div><strong>Airline Code:</strong> {booking.airlineCode}</div>
          <div><strong>Total Expense:</strong> {booking.totalExpenseINR} INR</div>
          <div><strong>Arrival Time: </strong>{booking.arrivalTime}</div>
          <div><strong>Departure Time:</strong> {booking.departureTime}</div>
          <p><strong>Passenger Details:</strong></p>
          <p><strong>Name:</strong> {booking.givenName} {booking.familyName}</p>
          <p><strong>Title:</strong> {booking.title}</p>
          <p><strong>Date of Birth:</strong> {new Date(booking.dob).toLocaleDateString()}</p>
          <p><strong>Gender:</strong> {booking.gender}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Phone:</strong> {booking.phone}</p>
          <button  style={{border:'none',backgroundColor:'white',color:'black',position:'absolute',top:"640px",left:"50px",width:"92.3%",height:"30px"}}  onClick={toggleDetails}>
          {showDetails ? 'Less Details' : 'View Details'}
        </button>

        {showDetails && (
          <div style={{position:"absolute",top:"670px",left:'50px',backgroundColor:"white" ,width:"92.3%",height:"50px", filter: 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))'}}>
             <button className="cancel-button" onClick={() => onCancel(booking._id)}>Cancel Booking</button>
            
          </div>
        )}
         
        </div>
      )}
    </ul>
  );
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [users,setUsers]=useState([]);

  useEffect(() => {

    const  fetchData = async () => {
          let response = await getUsers();
          setUsers(response);
        
      }
      fetchData();
  }, []);

  
  const navigate = useNavigate();

  const handle = () => {
    navigate('/home');
  };

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId); // Call the cancelBooking API function
      // Remove the cancelled booking from the bookings list
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error('Error cancelling booking:', error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    const getBook = async () => {
      try {
        const fetchedBookings = await getBookings(); // Fetch bookings data
        setBookings(fetchedBookings); // Set bookings state
      } catch (error) {
        console.error('Error fetching bookings:', error);
        
      }
    };

    getBook(); 
  }, []); 

  return (
    <div>
      <h1 style={{color:"#fff",padding:"20px"}}>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <BookingItem key={booking._id} booking={booking} onCancel={handleCancel} />
          ))}
        </ul>
      )}
      <button onClick={handle}  style={{border:"none",position:"absolute",left:"1200px",width:"100px",height:"30px",borderRadius:"5px",backgroundColor:'#04318E',filter: 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))',color:"white",top:'20px'}}>Back</button>
    </div>
  );
};

export default MyBookings;
