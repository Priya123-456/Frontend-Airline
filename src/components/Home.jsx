import React,{useState,useEffect} from 'react'

import imagea from "./constant/objects/image1.jpg"
import imageb from "./constant/objects/image2.jpg"
import imagec from "./constant/objects/image3.jpg"
import imaged from "./constant/objects/image4.jpg"
import imagee from "./constant/objects/image5.jpg"
import imagef from "./constant/objects/image9.jpg"
import imageg from "./constant/objects/image10.jpg"
import imageh from "./constant/objects/image8.jpg"
import plane from "./constant/plane.png"
import globe from "./constant/globe.png"
import book from "./constant/book.png"
import { getBookings } from './services/api'
import { useNavigate } from 'react-router-dom'


import "./css/image.css"



const Home = () => {

  
  

  
  const navigate = useNavigate();

  const goToMyBookings = async () => {
    try {
      const bookings = await getBookings(); 
      navigate('/mybookings'); 
    } catch (error) {
      console.error('Error fetching bookings:', error);
     
    }
  };
    

  

  
  

  const Handle = () => {
    navigate('/search');
  };

  
  const Box={
    width: '100%',
    position: 'relative',
    backgroundColor: '#3572ef',
    height: '210.134vh',
    overflow: 'hidden',
    textAlign:' left',
   
    color:' #fff',
    fontFamily: 'Inter',
  }

  const stack={
    position: 'absolute',
    backgroundColor:'#F6F6F6',
    width: '98.6%',
    height:'161.5vh',
    top:'300px',
    left:'10px',
    bottom:'1px',
    zIndex:'1',
    borderRadius:'5px',

  }

  
const text={
  position:'absolute',
  left:'70px',
  top:'150px',
  fontFamily:'Arial, sans-serif',
  fontWeight:'100',
  fontSize:'43px',
}
const text2={
  position:'absolute',
  left:'70px',
  top:'200px',
  fontFamily:'Arial, sans-serif',
  fontWeight:'300',
  fontSize:'40px',
}


const popular={
  position:'absolute',
  left:'40px',
  top:'315px',
  fontFamily:'Arial, sans-serif',
  fontWeight:'100',
  fontSize:'23px',
  color:'#474648',
  zIndex:'7'
}



  return (




    
  
   
    <div style={Box} >
      <h1 style={text}>Where  are  you</h1> 
      <h1 style={text2}><strong>flying  </strong> to ?</h1>

     
      <img  style={{width:'60px',hieght:"60px",position:"absolute",left:'700px',top:'190px', filter:'opacity(2) contrast(1.8) brightness(1.1) saturate(1.2) sepia(0.1) drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))' /* Enhanced effects */
  ,transition: 'all 0.3s ease'}} src={plane}  alt="dp"  onClick={Handle}/>
  <img  style={{width:'110px',hieght:"110px",position:"absolute",left:'800px',top:'165px', filter:'  opacity(1.8) contrast(1.5) brightness(1.2) saturate(1.2) sepia(0.1) drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))' /* Enhanced effects */
  ,transition: 'all 0.3s ease'}} src={globe} alt="dp"/>
  <img  style={{width:'60px',hieght:"60px",position:"absolute",left:'950px',top:'190px', filter:'opacity(1.8) contrast(1.5) brightness(1.2) saturate(1.2) sepia(0.1) drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))' /* Enhanced effects */
  ,transition: 'all 0.3s ease'}} src={book}  alt="dp"      />
  <h3 style={{position:'absolute',left:'703px',top:'245px',fontWeight:"200"}}>Flights</h3>
  <h3 style={{position:'absolute',left:'805px',top:'245px',fontWeight:'200'}}  onClick={goToMyBookings}>   My Bookings</h3>
  <h3  style={{position:'absolute',left:'952px',top:'245px',fontWeight:'200'}}>Support</h3>
      <h2 style={popular}>Popular</h2>
      <div className='one' >
      <div className='two' >
      <img style={{zIndex:'4',width:'400px',height:'450px', margin:'5px',
    padding:'5px',borderRadius:'12px'}}  src={imagea} alt ="dp"/>
      <img  style={{zIndex:'4' ,width:'400px',height:'450px' , margin:'5px',
    padding:'5px',borderRadius:'12px'}}   src={imageb} alt ="dp"/>
      <img  style={{zIndex:'4' ,width:'400px',height:'450px' , margin:'5px',
    padding:'5px',borderRadius:'12px'}}  src={imagec} alt ="dp"/>
      <img  style={{zIndex:'4' ,width:'400px',height:'450px' , margin:'5px',
    padding:'5px',borderRadius:'12px'}} src={imaged} alt ="dp"/>
      </div>
      <div  className='three'>
      <img  style={{zIndex:'4' ,width:'300px',height:'450px' , margin:'5px',
    padding:'5px',borderRadius:'12px'}} src={imagee} alt ="dp"/>
      <img  style={{zIndex:'4' ,width:'400px',height:'450px' , margin:'5px',
    padding:'5px',borderRadius:'12px'}} src={imagef} alt ="dp"/>
      <img  style={{zIndex:'4' ,width:'400px',height:'450px' , margin:'5px',
    paddingLeft:'2px', padding:'5px',borderRadius:'12px'}} src={imageg} alt ="dp"/>
      <img  style={{zIndex:'4',width:'400px',height:'450px' , margin:'5px',
   paddingLeft:'3px',padding:'5px',borderRadius:'12px'}} src={imageh} alt ="dp"/>
      </div>
      </div>
      
      <div style={stack}/>
      
    
    
      
  </div>
  )
}

export default Home
