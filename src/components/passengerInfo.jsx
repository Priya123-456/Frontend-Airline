// PassengerInfoForm.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { savePassengerDetails } from './services/api.js';

const PassengerInfoForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, departureTime, arrivalTime, totalExpenseINR, fromCity1, toCity1, totalPassengers } = location.state || {};

  const [passengerForms, setPassengerForms] = useState(
    Array.from({ length: totalPassengers }, () => ({
      gender: 'Female',
      title: 'Ms.',
      dob: '',
      givenName: '',
      familyName: '',
      email: '',
      phone: ''
    }))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = passengerForms.map((passengerForm) => ({
        ...passengerForm,
        flightId: flight.id,
        airlineCode: flight.validatingAirlineCodes[0],
        totalExpenseINR
      }));

      const savedPassengers = await Promise.all(dataToSend.map(data => savePassengerDetails(data)));

      console.log('Passenger data saved:', savedPassengers);

      navigate('/order', {
        state: {
          passengers: savedPassengers,
          arrivalTime,
          departureTime,
          fromCity1,
          toCity1
        }
      });
    } catch (error) {
      console.error('Error saving passenger data:', error);
    }
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...passengerForms];
    updatedForms[index][name] = value;
    setPassengerForms(updatedForms);
  };

  return (
    <div style={{ height: "100%", width: "100%", fontSize: "22px" }}>
      <div style={{ display:"flex",}}>
      <h3 style={{ color: "#fff", fontFamily: "Arial, sans-serif", fontWeight: "50", fontSize: "35px", padding: '10px' }}>Passenger </h3>
      <h3 style={{ display:"flex", color: "#fff", fontFamily: "Arial, sans-serif", fontWeight: "50", fontSize: "35px", padding: '10px' }}> Information</h3>
      </div>
      <div style={{ width: '97%', height: 'auto ', backgroundColor: "#fff", zIndex: "3", borderRadius: "8px", left: '10px', position: "absolute", top: "150px", display: "flex", flexDirection: 'column', gap: '20px', padding: '10px' }}>
        <div style={{ zIndex: "4", fontFamily: "Arial, sans-serif", padding: "10px" }}>
          <p><strong>Flight:</strong> {flight.id}</p>
          <p><strong>Airline Code:</strong> {flight.validatingAirlineCodes[0]}</p>
          <p><strong>From:</strong> {fromCity1}</p>
          <p><strong>To:</strong> {toCity1}</p>
          <p><strong>Departure Time:</strong> {departureTime}</p>
          <p><strong>Arrival Time:</strong> {arrivalTime}</p>
          <p><strong>Total Expense (INR):</strong> {totalExpenseINR}</p>
        </div>
        <form onSubmit={handleSubmit}>
          {passengerForms.map((form, index) => (
            <div key={index} style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '8px', marginBottom: '10px' }}>
              <h3>Passenger {index + 1}</h3>
              <div style={{ zIndex: "4", fontFamily: "Arial, sans-serif", padding: "10px", marginLeft: "180px" }}>
                <label>Gender: </label>
                <select name="gender" value={form.gender} onChange={(e) => handleInputChange(index, e)} required>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={{ zIndex: "4", fontFamily: "Arial, sans-serif", padding: "10px", marginLeft: "180px" }}>
                <label>Title: </label>
                <select name="title" value={form.title} onChange={(e) => handleInputChange(index, e)} required>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>
              <div style={{ zIndex: "4", fontFamily: "Arial, sans-serif", padding: "10px", marginLeft: "180px" }}>
                <label>Date of Birth: </label>
                <input type="date" name="dob" value={form.dob} onChange={(e) => handleInputChange(index, e)} required autoComplete="off" />
              </div>
              <div style={{ zIndex: "4", fontFamily: "Arial, sans-serif", padding: "10px", marginLeft: "180px" }}>
                <label>Given Name: </label>
                <input type="text" name="givenName" value={form.givenName} onChange={(e) => handleInputChange(index, e)} required autoComplete="off" />
              </div>
              <div style={{ zIndex: "4", fontFamily: "Arial, sans-serif", padding: "10px", marginLeft: "180px" }}>
                <label>Family Name: </label>
                <input type="text" name="familyName" value={form.familyName} onChange={(e) => handleInputChange(index, e)} required autoComplete="off" />
              </div>
              <div style={{ zIndex: "4", fontFamily: "Arial, sans-serif", padding: "10px", marginLeft: "180px" }}>
                <label>Email: </label>
                <input type="email" name="email" value={form.email} onChange={(e) => handleInputChange(index, e)} required autoComplete="off" />
              </div>
              <div style={{ zIndex: "4", fontFamily: "Arial, sans-serif", padding: "10px", marginLeft: "180px" }}>
                <label>Phone Number: </label>
                <input type="tel" name="phone" value={form.phone} onChange={(e) => handleInputChange(index, e)} required autoComplete="off" />
              </div>
            </div>
          ))}
          <button style={{ zIndex: "4", fontFamily: "Arial, sans-serif", color: "white", padding: "10px", marginLeft: "180px", position: "absolute", left: "925px", top: "780px", width: "200px", backgroundColor: "#04318E", border: "none", borderRadius: "8px", filter: 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))',height:"48px" }} type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PassengerInfoForm;
