import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./item.css";
import creator from "../../assets/seller2.png";
import linkimage from "../../assets/link.jpg"

import { getLinkDetails } from "./action";
import Button from "@mui/material/Button";
const Item = () => {
  const props = useSelector(state => state);
  const dispatch = useDispatch();
  const { fetching, fetched } = props.link;
  const [link, setLink] = useState({});
  const [loading, setLoading] = useState(true);
  const params = window.location.pathname.split("/");
  const linkId = params[params.length - 1];
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
              <h1>{link.addonId.title}</h1>
              <p>
                Price: <span>{link.addonId.price} ETH</span>
                <br /> Status: {link.status === 0 ? "Inactive" : "active"}
              </p>
              <img src={link.addonId.logo} style={{width:"300px",height:"300px"}} alt="" />
            </div>
            <div className="item-content-creator">
              <div>
                <p>Supplier</p>
              </div>
              <div>
                <img src={creator} alt="creator" />
                <p >Business Name</p>
              </div>
            </div>
            <div className="item-content-detail">
              <div className="item-description">{link.addonId.description}</div>
              <hr />
              {link.status === 0 && (
                <div className="item-description">
                  <h3>Request NFT Owner to ACTIVATE this addon</h3>
                  <Button className="primary-btn" onClick={() => {}}>
                    Activation request
                  </Button>
                </div >
              )}
            </div>
          </div>
        </div>
       <img src={linkimage} style={{margin:"350px 100px  0 100px" }}/>  
          {link.metadata && (
            <div className="card">
              <div className="item-content">
                <div className="item-content-title">
                  <h4>{link.metadata.name}</h4>
                  <p>
                    <br /> Status: Linked
                  </p>
                  <img src={link.metadata.image} style={{width:"300px",height:"300px"}} alt="" />
                </div>
                <div className="item-content-creator">
                  <div>
                    <p>collection</p>
                  </div>
                  <div>
                    <img src={creator} alt="creator" />
                    <p>{link.metadata.collection}</p>
                  </div>
                </div>
                <div className="item-content-detail">
                <div className="item-description">{link.metadata.description}</div>
                </div>
              </div>
              </div>
          )}
        </>
      )}
    </div>
  );
};

export default Item;
