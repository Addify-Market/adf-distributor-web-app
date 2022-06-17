import React, { useState } from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

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

  // const handleLogout = () => {
  //   setUser(false);
  // };
  const handleLogin = () => {
    setConnected(true);
    setUser(true);
  };

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
