import { useNavigate } from 'react-router-dom';
import "./css/Login.css"
import Image from "./constant/shadow/Ellen.jpeg"

import {GoogleLogin} from "@react-oauth/google"
import {jwtDecode} from "jwt-decode"
import { addUser } from './services/api';



const LoginDailog = () => {
        const navigate = useNavigate();
       
       
        const onLoginSuccess= async (res)=>{
                const decoded=jwtDecode(res.credential);
               console.log(decoded);
               await addUser(decoded);
              
        
               navigate("/register");

        }

        const onLoginError=(res)=>{
                console.log("Login Failed" , res);
        
            }
        return (
          <div className="macbook">
                
                <div className="Boxes"/> 

                <img  className="Images"   src={Image} alt="dp"/>
              
                <div className="Google">
                <GoogleLogin 
                        onSuccess={onLoginSuccess}
                        onError={onLoginError}
                />
                </div>
          </div>
          
           
         
        );
      };
      
      export default LoginDailog;
  