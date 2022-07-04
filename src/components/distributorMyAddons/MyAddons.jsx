import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./myaddons.css";
import { Link } from "react-router-dom";
import { getLinks } from "./action";
// import loader from "../../assets/loading2.gif";
import { ThreeCircles } from  'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const MyAddons = ({ title }) => {
  const dispatch = useDispatch();
  const { links, distributor } = useSelector(state => state);
  const [loading, setLoading] = useState(true);
  const [message] =useState( "Please Wait...");
  const renderLinks = () => {
    if (links.length) {
      setLoading(false);
    } else {
      dispatch(getLinks(distributor.distributorId));
    }
  };
  useEffect(renderLinks, [renderLinks]);
  
  return (
    <div className="bids section__padding">
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
        </div>
        <div className="bids-container-card">
          {console.log("links")}
          {!loading &&
            links.map(link => {
              return (
                <div className="card-column">
                  <div className="bids-card">
                    <div className="bids-card-top">
                      <img
                        src={link.metadata.image}
                        alt=""
                        style={{ height: 200 }}
                      />
                      <Link to={`/link/${link.linkId}`}>
                        <p className="bids-title">{link.metadata.name}</p>
                      </Link>
                      <p>{link.metadata.description.substr(0, 100)}</p>
                    </div>
                    <div className="bids-card-bottom">
                      <p>Status: {link.status === 0 ? "Inactive" : "Active"}</p>
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

export default MyAddons;
