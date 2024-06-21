


import axios from 'axios';

const url='http://localhost:8000';

export const addUser= async (data)=>{
    try{
        await  axios.post(`${url}/add`,data);
       
     
    }catch(error){
        console.log("Error while calling adduser API",error.message );
    }
}

export const getUsers= async (id)=>{
  try{
      let response=await axios.get(`${url}/user/${id}`);
     
      return response.data;

  }catch(error){
      console.log("error while calling getusers api",error.message)
  }

}



export const savePassengerDetails = async (data) => {
  try {
  const response= await axios.post(`${url}/passenger`,data);
    return response.data
  } catch (error) {
   console.log("error",error.message)
  }
};



export const getPassengerDetails = async (id) => {
    try {
      const response = await axios.get(`${url}/passenger/${id}`);
      return response.data;  
    } catch (error) {
      console.log("error", error.message);
      throw error;
      
    }
  };



  
  export const postPassengerDetails = async (passengerData) => {
    try {
      const response = await axios.post(`${url}/booking`, passengerData);
      return response.data;
    } catch (error) {
      console.error('Error posting passenger details:', error);
      throw error;
    }
  };



  export const getBookings = async () => {
    try {
      const response = await axios.get(`${url}/people`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  };

  export const cancelBooking = async (id) => {
    try {
      await axios.delete(`${url}/booking/${id}`);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
  };