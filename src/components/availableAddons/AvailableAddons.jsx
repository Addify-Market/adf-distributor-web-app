import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./availableAddons.css";
import { Link } from "react-router-dom";
import loader from "../../assets/loading2.gif";
import { getAddons } from "./action";
import loading from "../../assets/loading";
const AvailableAddons = ({ title }) => {
  const dispatch = useDispatch();
  const { addons } = useSelector(state => state);
  const [loading, setLoading] = useState(true);
  const [message] =useState( "Please Wait...");
  const renderAddons = () => {
    if (!addons.length && loading) {
      dispatch(getAddons());
    } else {
      setLoading(false);
    }
  };
  useEffect(renderAddons, [renderAddons]);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className="bids section__padding">
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
        </div>
        <div className="bids-container-card">
          {!loading &&
            addons.map(addon => {
              return (
                <div className="card-column" key={addon.addonId}>
                  <div className="bids-card">
                    <div className="bids-card-top">
                      <img src={addon.logo} alt="" style={{ height: 200 }} />
                      <Link to={`/addon/${addon.addonId}`}>
                        <p className="bids-title">{addon.title}</p>
                      </Link>
                    </div>
                    <div className="bids-card-bottom">
                      <p>
                        {addon.price} <span>ETH</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          {loading && 
            <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
            <img
              src={loader}
              alt="vybuhijk"
              style={{ width: "400px", height: "400px", margin: "auto" }}
            />
            <br />
            <b style={{ fontSize: "20pt", color:"white" }}>
              {message ? message : "Creating. Please wait..."}
            </b>
          </div>
          
          }
        </div>
      </div>
    </div>
  );
};

export default AvailableAddons;
