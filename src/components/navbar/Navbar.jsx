import React, { useState, useEffect } from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { getDistributorInfo, getWalletNFTs, logout,login } from "./action";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Menu = () => (
  <>
    <Link to="/distributor/addons">
      <p>MarketPlace</p>{" "}
    </Link>
    <Link to="/distributor/links">
      <p>My Links</p>{" "}
    </Link>
  </>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, setUser] = useState(true);
  //const [is_connected, setConnected] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let referrer = document.referrer;
  console.log("referrer",referrer);
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   if (localStorage.getItem("distributor") !== null) {
  //     setConnected(true);
  //   } else {
  //     setConnected(false);
  //   }
  //   console.log("isconnected", is_connected);
  // }, [is_connected]);
  // const handleLogout = () => {
  //   setUser(false);
  // };

  const { distributor, isConnected } = useSelector(state => state);
  const handleLogin = async () => {
    if (!window.ethereum) alert("No crypto wallet found. Please install it.");

    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const walletId = await signer.getAddress();

    if (walletId) {
      localStorage.setItem("distributor", walletId);
      //setConnected(true);

       await dispatch(getDistributorInfo(walletId));
      
      // if (!distributorInfo) {
      //   navigate("/distributor/register");
      // }
      dispatch(login(true));
      dispatch(getWalletNFTs(walletId));
    }
    
    setUser(true);
  };
  const redirect = () => {
    console.log("distributor",Object.keys(distributor).length);
    console.log("is_connected",isConnected);
    if(isConnected && Object.keys(distributor).length===0){
      console.log("is_connected",isConnected);
      //setConnected(true);
      navigate("/distributor/register");
    }
    // if(is_connected){
    //   if(!distributor.distributorId){
    //     navigate("/distributor/register");
    //   }else{
    //     navigate("/");
    //   }
    // }else{
    //   setUser(true);
    //   //setConnected(true);
    //   navigate("/distributor/addons");
    //   return;
    // }
  
  };
  useEffect(redirect, [distributor,isConnected,navigate]);

  const handleLogut = async () => {
    localStorage.removeItem("distributor");
    dispatch(logout());
    //setConnected(false);
    navigate("/");
  };

  return (
    <>
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} alt="logo" style={{width:"32px",height:"32px"}}/>
          <Link to="/">
            <h1>Adify</h1>
          </Link>
          {isConnected && (
            <div className="navbar-links_container">
              <Menu />
            </div>
          )}
        </div>
      </div>
      <div className="navbar-sign">
        {user && !isConnected && (
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
        {user && isConnected && (
          <>
            {/* <Link to="/create">
              <button type="button" className="primary-btn" onClick={handleLogout}>
                Create
              </button>
            </Link> */}
            {/* <button type="button" className="secondary-btn" onClick={handleLogin}>
              Connected
            </button> */}
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
              {user && !isConnected && (
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
              {user && isConnected && (
                <>
                  {/* <Link to="/create">
                    <button type="button" className="primary-btn">
                      Create
                    </button>
                  </Link> */}
                  {/* <button type="button" className="secondary-btn">
                    Connected
                  </button> */}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Navbar;
