import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./myaddons.css";
import { Link } from "react-router-dom";
import { getLinks } from "./action";
const MyAddons = ({ title }) => {
  const dispatch = useDispatch();
  const { links, distributor } = useSelector(state => state);
  const [loading, setLoading] = useState(true);
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
          {loading && "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default MyAddons;
