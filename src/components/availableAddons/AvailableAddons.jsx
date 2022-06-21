import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./availableAddons.css";
import { Link } from "react-router-dom";
import { getAddons } from "./action";
const AvailableAddons = ({ title }) => {
  const dispatch = useDispatch();
  const { addons } = useSelector(state => state);
  const [loading, setLoading] = useState(true);
  const renderAddons = () => {
    if (addons.length) {
      setLoading(false);
    } else {
      dispatch(getAddons());
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
                <div className="card-column">
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
          {loading && "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default AvailableAddons;
