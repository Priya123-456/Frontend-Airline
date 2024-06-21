import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChild, faBaby } from '@fortawesome/free-solid-svg-icons';



const AppFlight = () => {

  const navigate = useNavigate();

  const handleButtonClick = (flight) => {

    
  
    navigate('/booking', { state: { flight

      ,
      passengers: { adults, children, infants },
      fromCity1,
      toCity1
    } });
  };

  const [fromCity1, setFromCity1] = useState('');
  const [toCity1, setToCity1] = useState('');
  const [departDate1, setDepartDate1] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState('economy');
  const [result, setResult] = useState(null);
  const [conversionRate, setConversionRate] = useState(90); //  conversion from EUR to INR
  const [carriers, setCarriers] = useState({}); 

  

  const handleSubmit = async (e) => {
    console.log('Submitting form data...', fromCity1, toCity1, departDate1,adults);
    e.preventDefault();
    const url = 'http://localhost:8000/api/search-multi-city';
    const requestData = {
      fromCity1,
      toCity1,
      departDate1,
      adults
    };
    try {
      const response = await axios.post(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response from server:', response.data);
      
      setCarriers(response.data.flights.dictionaries.carriers);
     
      setResult(response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
     
    }
  };

  const calculateTotalExpenseINR = (price) => {
    let classMultiplier = 1;
    if (travelClass === 'business') {
      classMultiplier = 1.5; // Assuming business class is 1.5 times the price of economy
    } else if (travelClass === 'first') {
      classMultiplier = 2; // Assuming first class is 2 times the price of economy
    }
    const adultExpense = adults * price * classMultiplier * conversionRate;
    const childExpense = children * price * 0.75 * classMultiplier * conversionRate; // Assuming children pay 75% of adult price
    const infantExpense = infants * price * 0.50 * classMultiplier * conversionRate; // Assuming infants pay 50% of adult price
    return adultExpense + childExpense + infantExpense;
  };

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


  const iconStyle = {
   position:"absolute",
   left:"478px",
   top:"201px",

   
    
  };
  
  const iconStyles = {
   
    position:'absolute',
   left:"478px",
   top:"235px",
  
   
  };
  
  const IconStyle = {
   
    position:'absolute',
    left:'577px',
    top:'235px',
   
   
  };

  return (
    <div style={{width: '100%',
      position: 'relative',
      backgroundColor:' #3572ef',
      height:  '100%',
     
     
      color:' #fff',
      fontFamily: 'Inter'}}>
      <h2 style={{position:'absolute',left:'557px',fontSize:'42px',fontWeight:'400',fontFamily:'Aleo',zIndex:"4"}}>Serach Flights</h2>
     
     
      <form onSubmit={handleSubmit}>
     
     
        <div>
          
          <input style={{position:'absolute',left:'500px',border:'none',width:"350px",height:'25px',top:'100px',borderRadius:'6px'}} type="text" value={fromCity1} onChange={(e) => setFromCity1(e.target.value)} required  placeholder='From City'/>
        </div>
        <div>
          
          <input  style={{position:'absolute',left:'500px',border:'none',width:"350px",height:'25px',top:'133px',borderRadius:'6px'}}   type="text" value={toCity1} onChange={(e) => setToCity1(e.target.value)} required placeholder='To City' />
        </div>
        <div>
          
          <input  style={{position:'absolute',left:'500px',border:'none',width:"352px",height:'25px',top:'166px',borderRadius:'6px'}}  className='Word' type="date" value={departDate1} onChange={(e) => setDepartDate1(e.target.value)} required />
        </div>
        <div>

        <FontAwesomeIcon icon={faUser} style={iconStyle} />
         
          <input style={{position:'absolute',left:'500px' ,width:"162px",height:'25px',top:'192px',borderRadius:'4px',border:'none',color:'white',background:"none",borderBottom:"2px solid white"}}  type="number" value={adults} onChange={(e) => setAdults(e.target.value)} min="1" required  placeholder='Adult'/>
        </div>
        <div>
        <FontAwesomeIcon icon={faChild} style={iconStyles} />
          <input  style={{position:'absolute',left:'500px' ,width:"67.5px",height:'25px',top:'225px',borderRadius:'4px',border:'none',color:'white',background:"none",borderBottom:"2px solid white"}}  type="number" value={children} onChange={(e) => setChildren(e.target.value)} min="0" required    placeholder='Child' />
        </div>
        <div>
        <FontAwesomeIcon icon={faBaby} style={IconStyle} />
          <input style={{position:'absolute',left:'596px' ,width:"67.5px",height:'25px',top:'225px',borderRadius:'4px',border:'none',color:'white',background:"none",borderBottom:"2px solid white"}}  className='baby'  type="number" value={infants} onChange={(e) => setInfants(e.target.value)} min="0" required  placeholder='Infant'/>
        </div>
        <div>
         
          <select  style={{position:'absolute',left:'680px',border:'none',width:"172px",height:'25px',top:'197px',borderRadius:'6px'}}  className='economy' value={travelClass} onChange={(e) => setTravelClass(e.target.value)} required>
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </div>
       
        <button  style={{position:'absolute', left:'770px',top:'238px', width:'100px', height:'50px', border:"none", borderRadius:'5PX', backgroundColor:'#04318E', zIndex:'6',filter:' drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))',color:"#fff",fontWeight:"28px"}} className="Flight" type="submit">Search</button>
      </form>

      {result && (
        <div>
          <h3 style={{position:'absolute',top:'250px',left:'10px',fontSize:'20px',fontWeight:'200'}}>Flight Results</h3>
          {result.flights.data.map((flight, index) => {
            const totalExpenseINR = calculateTotalExpenseINR(parseFloat(flight.price.grandTotal));
            const priceINR = (parseFloat(flight.price.grandTotal) * conversionRate).toFixed(2);
            const departureTime = formatDateTime(flight.itineraries[0].segments[0].departure.at);
            const arrivalTime = formatDateTime(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at);
            const airlineCode = flight.validatingAirlineCodes[0]; 
            const airlineName = carriers[airlineCode] || airlineCode; 
            const seatAvailability = flight.numberOfBookableSeats || 'No data';
          
            return (
              <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' ,top:'300px',position:'relative'}}  onClick={() => handleButtonClick(flight)}>
                <p>Flight ID: {flight.id}</p>
                <p>Airline: {airlineName}</p>
                <p>Departure Time: {departureTime}</p>
                <p>Arrival Time: {arrivalTime}</p>
                <p>Duration: {formatDuration(flight.itineraries[0].duration)}</p>
                <p>Price: {priceINR} INR</p>
                <p>Total Expense: {totalExpenseINR.toFixed(2)} INR</p>
                <p>Seats Available: {seatAvailability}</p>
                
                {/* Add more flight details as needed */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppFlight;
