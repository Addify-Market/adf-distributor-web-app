import React, {useState, useEffect} from 'react';
import './register.css'

import { useNavigate } from 'react-router-dom';
import {Navbar, Footer} from '../../components';
import { useDispatch } from "react-redux";
import { ThreeCircles } from  'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {postDistributorInfo} from './action';
const Register = () => {
  const [loading,setLoading] = useState(true);
  const [walletId,setWalletId] = useState(null);
  const [message,setMessage] =useState( "Please Wait...");
  const [error,setError] = useState({name:"",email:""});
  const dispatch = useDispatch();
  const [values, setValues] = useState({
   name: "",
   email: "",
   phone: "",
   buttonText: "Submit",
   });
 const { name, phone, email } = values;
  
  useEffect(() => {
   setTimeout(() => {
     setLoading(false);
     setWalletId(localStorage.getItem('distributor'));
   }, 2000);
 }, []);
 const handleChange = (name) => (e) => {
  setValues({ ...values, [name]: e.target.value });
};
let navigate = useNavigate();

  
const sendRequest = async (e) => {
  e.preventDefault();
  
  try {
  console.log("name1",name);
  if(name===""){
    setError({name:"Please Fill Up Your Name"});
    return ;
  }
  if(email===""){
    setError({email:"Please Fill Up Your Email"});
    return ;
  }
  setLoading(true);
  console.log("ok");
  setMessage("Please Wait")   
  //  await axios({
  //   method: "POST",
  //     url: `${data.serviceUrl}/distributor`,
  //     data: {walletId,name,phone,email},
  //   });
  await dispatch(postDistributorInfo(walletId,name,phone,email));
      setLoading(false);
      setMessage("Success!");
      navigate('/distributor/addons');
  } catch (error) {
    console.log(error);
  }
};
  return (
    <>
    <Navbar/>
    
      {loading ? (
        <>
        <div style={{ width: "100%", marginTop:"200px", justifyContent:"center",alignItems:"center",display:'flex' }}>
      
         <ThreeCircles
               color="#f70f76"
               outerCircleColor="#11b6c5"
               middleCircleColor="#f70f76"
               innerCircleColor="#7202c0"
             />
       
        <br />
        </div>
        <div style={{ width: "100%", marginBottom:"200px", justifyContent:"center",alignItems:"center",display:'flex' }}>
          <b style={{ fontSize: "20pt", color:"white" }}>
          {message ? message : "Creating. Please wait..."}
        </b>
        </div>
        </>
      ) :(
        <>
        <div className='register section__padding'>
      <div className="register-container">
      <h3 style={{textAlign:"center"}}>let`s share your more information</h3>
      
      <form onSubmit={sendRequest} className='register-writeForm form-data' autoComplete='off' >
      
        <div className="register-formGroup">
          <label>Name*</label>
          <input type="text" onChange={handleChange("name")} value={name} placeholder='Name' />
          {console.log("error",error)}
          {error.name &&
            <div style={{color:"red",padding:"15px"}} >{error.name}</div>
          }
        </div>
        <div className="register-formGroup">
          <label>Email*</label>
          <input type="email" onChange={handleChange("email")} value={email} placeholder='Email' />
          {error.email &&
            <div style={{color:"red",padding:"15px"}} >{error.email}</div>
          }
        </div>
        <div className="register-formGroup">
          <label>Phone</label>
          <input type="text" onChange={handleChange("phone")} value={phone} placeholder='Phone' />
        </div>
        
       <div className="register-button">
        <button className='register-writeButton'>submit</button>
       </div>
      </form>
    </div>
    </div>
    </>
    )}
      
    
    <Footer />
   </>
   )
};

export default Register;
