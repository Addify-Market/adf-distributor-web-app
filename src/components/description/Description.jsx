import React from 'react'
import './description.css'
import { useSelector } from "react-redux";
import bids1 from '../../assets/bids1.png'
import bids2 from '../../assets/bids2.png'
import bids3 from '../../assets/bids3.png'
import { Link } from 'react-router-dom';
import Button from "./components/Button";

const Description = ({title}) => {
  const { user } = useSelector(state => state);
  return (
    <div className='description-bids section__padding'>
    <div className="description-bids-container">
      <div className="description-bids-container-text">
        <h1>{title}</h1>
      </div>
      <div className="description-container-card">
        <div className="description-card-columns" >
          <div className="description-bids-card">
            <div className="description-bids-card-top">
              <img src={bids1} alt="" />
            <a href={`https://addify-market.github.io/adf-distributor-web-app/`} style={{display:"flex", justifyContent: "space-between"}}>
            <p className="description-bids-title">Supplier</p>
            <p><Button color="#4AB3EF" title="Connect" role="supplier" /></p>
            </a>
            </div>
            <div className="description-bids-card-bottom">
            <p></p>
             
            </div>
          </div>
        </div>
        <div className="description-card-columns" >
          <div className="description-bids-card">
            <div className="description-bids-card-top">
              <img src={bids2} alt="" />
              <a href={`https://addify-market.github.io/adf-supplier-web-app/`} style={{display:"flex", justifyContent: "space-between"}}>
            <p className="description-bids-title">Distributor</p>
            <p><Button color="#4AEFB0" title="Connect" role="distributor" /></p>
            </a>
            </div>
            <div className="description-bids-card-bottom">
            <p></p>
            </div>
          </div>
        </div>
        <div className="description-card-columns" >
          <div className="description-bids-card">
            <div className="description-bids-card-top">
              <img src={bids3} alt="" />
            <Link to={`/post/123`} style={{display:"flex", justifyContent: "space-between"}}>
                <p className="description-bids-title">User</p>
                <p><Button color="#C74FF0" title="Connect" role="user"/></p>
            </Link>
            </div>
            <div className="description-bids-card-bottom">
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default Description;
