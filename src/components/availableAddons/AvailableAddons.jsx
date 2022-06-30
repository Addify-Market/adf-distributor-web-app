import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./availableAddons.css";
import { Link } from "react-router-dom";
//import loader from "../../assets/loading2.gif";
import { getAddons } from "./action";
//import loading from "../../assets/loading";
import { ThreeCircles } from  'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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
            <>
            <div style={{ width: "100%", marginTop:"200px", justifyContent:"center",alignItems:"center",display:'flex' }}>
            {/* <img
              src={loader}
              alt="vybuhijk"
              style={{ width: "400px", height: "400px", margin: "auto" }}
            /> */}
             <ThreeCircles
                   color="#f70f76"
                   outerCircleColor="#11b6c5"
                   middleCircleColor="#f70f76"
                   innerCircleColor="#7202c0"
                 />
            {/* <Box sx={{ display: 'flex' }} style={{justifyContent:"center", marginTop:"300px"}}>
             <CircularProgress />
           </Box> */}
            <br />
            </div>
            <div style={{ width: "100%", marginBottom:"200px", justifyContent:"center",alignItems:"center",display:'flex' }}>
              <b style={{ fontSize: "20pt", color:"white" }}>
              {message ? message : "Creating. Please wait..."}
            </b>
            </div>
            </>
          
          }
        </div>
      </div>
    </div>
  );
};

export default AvailableAddons;
