// OrderPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postPassengerDetails } from './services/api';

//import "./css/order.css";

const OrderPage = () => {
  const location = useLocation();
  const { passengers, arrivalTime, departureTime, fromCity1, toCity1 } = location.state || [];
  const navigate = useNavigate();

  const goToHomePage = async () => {
    try {
      await Promise.all(passengers.map(passenger => {
        const passengerData = {
          orderId: passenger._id,
          flightId: passenger.flightId,
          airlineCode: passenger.airlineCode,
          fromCity: fromCity1,
          toCity: toCity1,
          totalExpenseINR: passenger.totalExpenseINR,
          arrivalTime,
          departureTime,
          givenName: passenger.givenName,
          familyName: passenger.familyName,
          title: passenger.title,
          dob: passenger.dob,
          gender: passenger.gender,
          email: passenger.email,
          phone: passenger.phone,
        };
        return postPassengerDetails(passengerData);
      }));

      navigate('/home'); // Navigate to the home page after posting data
    } catch (error) {
      console.error('Error posting order data:', error);
    }
  };

  if (!passengers || passengers.length === 0) return <p>Loading...</p>;

  return (
    <div className='Box' style={{ fontSize: "22px" }} >
      <h1 className='order' style={{color:"white",padding:"10px"}}>Order Confirmed</h1>
      <div style={{ width: '80.5%', backgroundColor: "#fff", borderRadius: "8px", margin: 'auto', marginTop: '20px', padding: '20px',height:"450px" }}>
        {passengers.map((passenger, index) => (
          <div key={passenger._id} style={{display:"flex"}} >
            <div style={{position:"absolute",left:"200px"}}>
            <h3>Passenger {index + 1}</h3>

            <p><strong>Passenger ID:</strong> {passenger._id}</p>
            <p><strong>Flight ID:</strong> {passenger.flightId}</p>
            <p><strong>Airline Code:</strong> {passenger.airlineCode}</p>
            <p><strong>From:</strong> {fromCity1}</p>
            <p><strong>To:</strong> {toCity1}</p>
            <p><strong>Total Expense (INR):</strong> {passenger.totalExpenseINR}</p>
            <p><strong>Arrival Time:</strong> {arrivalTime}</p>
            <p><strong>Departure Time:</strong> {departureTime}</p>
            </div>
           
            <div className='passenger-details' style={{position :"absolute",left:"750px"}}>
              <p style={{fontSize:"28px"}}><strong>Passenger Details</strong></p>
              <p><strong>Name:</strong> {passenger.givenName} {passenger.familyName}</p>
              <p><strong>Title:</strong> {passenger.title}</p>
              <p><strong>Date of Birth:</strong> {new Date(passenger.dob).toLocaleDateString()}</p>
              <p><strong>Gender:</strong> {passenger.gender}</p>
              <p><strong>Email:</strong> {passenger.email}</p>
              <p><strong>Phone:</strong> {passenger.phone}</p>
            </div>
          </div>
        ))}
      </div>
      <button className='button' onClick={goToHomePage}  style={{position:"absolute",top:"30px",left:"1150px",width:"120px",height:"35px", border:"none" , backgroundColor:"#04318E" , filter: 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))',color:"white"}}>Go to Home</button>
    </div>
  );
};

export default OrderPage;
