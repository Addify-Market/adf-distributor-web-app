import React, { useState, useEffect } from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import axios from "axios";
import {data} from "../../config";
import { useNavigate } from 'react-router-dom';
const Menu = () => (
  <>
    <Link to="/">
      <p>Explore</p>{" "}
    </Link>
    <p>My Items</p>
  </>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, setUser] = useState(true);
  const [is_connected, setConnected] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    // Update the document title using the browser API
    if(localStorage.getItem('distributor')!== null){
      setConnected(true);
    }else{
      setConnected(false);
    }
    console.log("isconnected",is_connected)
  },[is_connected]);
  // const handleLogout = () => {
  //   setUser(false);
  // };
  const handleLogin = async () => {
    if (!window.ethereum)
      alert("No crypto wallet found. Please install it.");
    
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    //showAccount.innerHTML = account;
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const walletId = await signer.getAddress();
    console.log("account",walletId);
    if(walletId){
      //console.log(data, "variables");
      localStorage.setItem("distributor",walletId);
      const response = await axios
        .get(`${data.serviceUrl}/distributor/${walletId}`)
        .then(res => res.data)
        .catch(e => {
          console.log("\x1b[31mNot Found");
          return null;
        });
      console.log("respon",response);
      if(response){
        setUser(true);
        setConnected(true);
        navigate('/');
      }else{
        setUser(false);
        navigate('distributor/register');
      }
      console.log(response);
    }
    // setConnected(true);
    // setUser(true);
  };
  const handleLogut = async () => {
    localStorage.removeItem('distributor');
    setConnected(false);
    navigate('/');
  }
  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} alt="logo" />
          <Link to="/">
            <h1>Adify</h1>
          </Link>
        </div>
      </div>
      <div className="navbar-sign">
        {user && !is_connected &&(
          <>
            {/* <Link to="/create">
              <button type="button" className="primary-btn" onClick={handleLogout}>
                Create
              </button>
            </Link> */}
            <button type="button" className="secondary-btn" onClick={handleLogin}>
              Connect
            </button>
            
          </>
        )}
        {user && is_connected &&(
          <>
            {/* <Link to="/create">
              <button type="button" className="primary-btn" onClick={handleLogout}>
                Create
              </button>
            </Link> */}
            <button type="button" className="secondary-btn" onClick={handleLogin}>
              Connected
            </button>
            <button type="button" className="primary-btn" onClick={handleLogut}>
               Logout
              </button>
          </>
        )}
      </div>
      <div className="navbar-menu">
        {toggleMenu ? (
          <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
        ) : (
          <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center">
            <div className="navbar-menu_container-links">
              <Menu />
            </div>
            <div className="navbar-menu_container-links-sign">
              {user && !is_connected &&(
                <>
                  {/* <Link to="/create">
                    <button type="button" className="primary-btn">
                      Create
                    </button>
                  </Link> */}
                  <button type="button" className="secondary-btn">
                    Connect
                  </button>
                </>
              )}
              {user && is_connected &&(
                <>
                  {/* <Link to="/create">
                    <button type="button" className="primary-btn">
                      Create
                    </button>
                  </Link> */}
                  <button type="button" className="secondary-btn">
                    Connected
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
