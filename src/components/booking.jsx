import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, passengers, fromCity1, toCity1  } = location.state || {};

  const [showDetails, setShowDetails] = useState(false);

  if (!flight) {
    return <p>No flight data available. Please go back and select a flight.</p>;
  }

  const formatDuration = (duration) => {
    const regex = /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?/;
    const matches = duration.match(regex);
    const days = matches[1] ? parseInt(matches[1], 10) : 0;
    const hours = matches[2] ? parseInt(matches[2], 10) : 0;
    const minutes = matches[3] ? parseInt(matches[3], 10) : 0;
    const totalHours = days * 24 + hours;
    return `${totalHours} hours ${minutes} minutes`;
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-IN', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  };

  const calculateTotalExpenseINR = (price) => {
    const conversionRate = 90; //  conversion rate from EUR to INR
    const adults = passengers.adults || 1;
    const children = passengers.children || 0;
    const infants = passengers.infants || 0;
    const travelClass = flight.travelClass || 'economy';

    let classMultiplier = 1;
    if (travelClass === 'business') {
      classMultiplier = 1.5;
    } else if (travelClass === 'first') {
      classMultiplier = 2;
    }
    const adultExpense = adults * price * classMultiplier * conversionRate;
    const childExpense = children * price * 0.75 * classMultiplier * conversionRate;
    const infantExpense = infants * price * 0.50 * classMultiplier * conversionRate;
    return adultExpense + childExpense + infantExpense;
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleBooking = () => {
    const airlineCode = flight.validatingAirlineCodes[0];
    const departureTime = formatDateTime(flight.itineraries[0].segments[0].departure.at);
    const arrivalTime = formatDateTime(
      flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at
    );
    const totalExpenseINR = calculateTotalExpenseINR(parseFloat(flight.price.grandTotal));

    navigate('/passenger', {
      state: { flight, departureTime, arrivalTime, totalExpenseINR, totalPassengers ,fromCity1,
        toCity1},
    });
  };

  const totalPassengers =
    (parseInt(passengers.adults, 10) || 0) +
    (parseInt(passengers.children, 10) || 0) +
    (parseInt(passengers.infants, 10) || 0);

  return (
    <div style={{color:"black",fontSize:"22px"}}>
      <h1 style={{color:"white",position:"absolute",left:"20px"}}>Booking Details</h1>
      <div style={{  padding: '10px', marginBottom: '10px' ,display:'flex',width:"60%",height:"400px",backgroundColor:"#fff",position:'absolute',left:"250px",top:"110px", borderRadius:'5px'}}>
        <div style={{position:"absolute",left:"50px",top:"30px"}}>
        <p>Flight ID: {flight.id}</p>
        <p>AirlineCode: {flight.validatingAirlineCodes[0]}</p>
        <p>From: {fromCity1}</p>
        <p>To: {toCity1}</p>
        <p>Departure Time: {formatDateTime(flight.itineraries[0].segments[0].departure.at)}</p>
        <p>Arrival Time: {formatDateTime(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at)}</p>

        <p>Duration: {formatDuration(flight.itineraries[0].duration)}</p>
        </div>
        <div style={{position:"absolute",left:"550px",top:"30px"}}>
        <p>Price: {(parseFloat(flight.price.grandTotal) * 90).toFixed(2)} INR</p>
        <p>Total Expense: {calculateTotalExpenseINR(parseFloat(flight.price.grandTotal)).toFixed(2)} INR</p>
        <p>Total Passengers: {totalPassengers}</p>
        <ul>
          <li>Adults: {passengers.adults}</li>
          <li>Children: {passengers.children}</li>
          <li>Infants: {passengers.infants}</li>
        </ul>
        </div>

        <button  style={{border:'none',background:'none',borderBottom:'2px solid black',borderRadius:'5px',color:'black',position:'absolute',top:"290px",left:"580px"}}  onClick={toggleDetails}>
          {showDetails ? 'Less Details' : 'View Details'}
        </button>

        {showDetails && (
          <div style={{position:"absolute",top:"310px",left:"580px" ,fontSize:"15px",backgroundColor:"#fff",padding:"10px",borderRadius:"5px",filter: 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))'}}>
            <p>Seat Layout: 3-4-3</p>
            <p>Seat Pitch: 79cm</p>
            <p>Meal Provided</p>
            <p>Power & USB Outlets Available</p>
          </div>
        )}

       
      </div>
      <button style={{color:"white", position:"absolute",top:'550px',left:"270px",width:"150px",height:"35px",border:"none",borderRadius:"5px",backgroundColor:'#04318E',filter: 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))'}} onClick={handleBooking}>Proceed </button>
    </div>
  );
};

export default BookingPage;
