import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./item.css";
// import creator from "../../assets/seller2.png";
import linkimage from "../../assets/link.jpg"

import { getLinkDetails } from "./action";
// import Button from "@mui/material/Button";
import loader from "../../assets/loading2.gif";
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
const Item = () => {
  const props = useSelector(state => state);
  const dispatch = useDispatch();
  const { fetching, fetched } = props.link;
  const [link, setLink] = useState({});
  const [loading, setLoading] = useState(true);
  const params = window.location.pathname.split("/");
  const linkId = params[params.length - 1];
  const [message] =useState( "Please Wait...");
  const fetchLinkDetails = () => {
    if (!fetching && loading && linkId !== props.link.linkId) {
      console.log("fetching link details");
      dispatch(getLinkDetails(linkId));
    }
    if (!fetching && fetched) {
      setLoading(false);
      setLink(props.link);
    }
  };
  useEffect(fetchLinkDetails, [fetchLinkDetails, fetching, fetched]);

  return (
    
    <div className="item section__padding">
      {link.linkId && (
        <>
        <div className="card">
        <div className="item-content">
            <div className="item-content-title">
              <img src={link.addonId.logo} style={{width:"300px",height:"300px", marginLeft:"40px"}} alt={link.addonId.title} />
              <h1 style={{marginLeft:"40px"}}>{link.addonId.title}</h1>
              <p>
                Price: <span>{link.addonId.price} ETH</span>
                <br /> Status: {link.status === 0 ? "Inactive" : "active"}
              </p>
              
            </div>
            {/* <div className="item-content-creator">
              <div>
                <p>Supplier</p>
              </div>
              <div>
                <img src={creator} alt="creator" />
                <p >Business Name</p>
              </div>
            </div> */}
            
            <div className="item-content-detail">
              <h3 style={{textAlign:"left",marginBottom:"10px"}}>Description</h3>
              <div className="item-description">{link.addonId.description}</div>
              
              {link.status === 0 && (
                <div className="item-description">
                  <button className="primary-btn request-button" onClick={() => {}}>
                    Activation request
                  </button>
                </div >
              )}
            </div>
          </div>
        </div>
       <img src={linkimage} style={{margin:"350px 100px  0 100px"}} alt="link Addon"/>  
          {link.metadata && (
            <div className="card">
              <div className="item-content">
                <div className="item-content-title">
                  <img src={link.metadata.image} style={{width:"300px",height:"300px", marginLeft:"40px"}} alt="" />
                  <h1 style={{marginLeft:"40px"}}>{link.metadata.name}</h1>
                  <p style={{marginLeft:"40px"}}>
                    <br /> Status: Linked
                  </p>
                  
                </div>
                {/* <div className="item-content-creator">
                  <div>
                    <p>collection</p>
                  </div>
                  <div>
                    <img src={creator} alt="creator" />
                    <p>{link.metadata.collection}</p>
                  </div>
                </div> */}
                <div className="item-content-detail">
                <h3 style={{textAlign:"left",marginBottom:"10px"}}>Description</h3>
                <div className="item-description">{link.metadata.description}</div>
                </div>
              </div>
              </div>
          )}
        </>
      )}
      {loading && 
       <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
       <img
         src={loader}
         alt="vybuhijk"
         style={{ width: "400px", height: "400px", margin: "auto" }}
       />
       {/* <Box sx={{ display: 'flex' }} style={{justifyContent:"center", marginTop:"300px"}}>
        <CircularProgress />
      </Box> */}
       <br />
       <b style={{ fontSize: "20pt", color:"white" }}>
         {message ? message : "Creating. Please wait..."}
       </b>
     </div>

      }
    </div>
  );
};

export default Item;
