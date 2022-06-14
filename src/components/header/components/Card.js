import "../../bids/bids.css";
import { AiFillHeart } from "react-icons/ai";
import bids1 from "../../../assets/bids1.png";
import bids2 from "../../../assets/bids2.png";
import bids3 from "../../../assets/bids3.png";
import { Link } from "react-router-dom";
const Card = () => {
  return (
    <div className="bids section__padding">
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>Bids</h1>
        </div>
        <div className="bids-container-card">
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids1} alt="" />
                <Link to={`/post/123`}>
                  <p className="bids-title">Abstact Smoke Red</p>
                </Link>
              </div>
              <div className="bids-card-bottom">
                <p>
                  1.25 <span>ETH</span>
                </p>
                <p>
                  {" "}
                  <AiFillHeart /> 92
                </p>
              </div>
            </div>
          </div>
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids2} alt="" />
                <Link to={`/post/123`}>
                  <p className="bids-title">Mountain Landscape</p>
                </Link>
              </div>
              <div className="bids-card-bottom">
                <p>
                  0.20 <span>ETH</span>
                </p>
                <p>
                  {" "}
                  <AiFillHeart /> 25
                </p>
              </div>
            </div>
          </div>
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids3} alt="" />
                <Link to={`/post/123`}>
                  <p className="bids-title">Paint Color on Wall</p>
                </Link>
              </div>
              <div className="bids-card-bottom">
                <p>
                  0.55 <span>ETH</span>
                </p>
                <p>
                  {" "}
                  <AiFillHeart /> 55
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
