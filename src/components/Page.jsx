import "./css/Styled.css";
import MyImage from "./constant/asset/Flying.png"
import Image from "./constant/fly/high.png"
import Shadow from "./constant/shadow/Shadow.png"
import { useNavigate } from "react-router-dom";
const Page = () => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/home');
  };
  return (
    <div className="macbook">
      <b className="text">We’re going on a trip.</b>
      
       
      <img
        className="flying"
        src={MyImage}   alt="dp"/>
         <img className="Shadow"
       src={Shadow} alt="dp"/>
        <img className="image" 
        src={Image} alt="dp"
        />
      
       
      
      <div className="are-you-in">Are you in?</div>
      <div className="macbook-child" onClick={handleButtonClick} />
      <p className="Get">Get started</p>
    </div>
  );
};

export default Page;



