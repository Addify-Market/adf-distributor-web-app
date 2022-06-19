import React, {useState} from 'react'
import './myaddons.css'
import { AiFillHeart } from "react-icons/ai";
import bids1 from '../../assets/bids1.png'
import bids2 from '../../assets/bids2.png'
import bids3 from '../../assets/bids3.png'
import bids4 from '../../assets/bids4.png'
import bids5 from '../../assets/bids5.png'
import bids6 from '../../assets/bids6.png'
import bids7 from '../../assets/bids7.png'
import bids8 from '../../assets/bids8.png'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
const MyAddons = ({title}) => {
  const [open, setOpen] = useState(false);
  const [uuid, setUuid] = useState("");
  const [next,setNext] = useState(false);
  const [enable,setEnable] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const generateUuid = () => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    let length = 6;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setUuid(result);
    setEnable(false);
    console.log(uuid);
  };
  const handleNext = () => {
    setNext(true);
  }
  return (
    <div className='bids section__padding'>
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
        </div>
        <div className="bids-container-card">
          <div className="card-column" >
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids1} alt="" />
              <Link to={`/item/123`}>
              <p className="bids-title">Abstact Smoke Red</p>
              </Link>
              </div>
              <div className="bids-card-bottom">
                <p>1.25 <span>ETH</span></p>
                <p>
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Link
                  </Button>
                </p>
              </div>
            </div>
          </div>
          <div className="card-column" >
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids2} alt="" />
              <Link to={`/item/123`}>
              <p className="bids-title">Mountain Landscape</p>
              </Link>
              </div>
              <div className="bids-card-bottom">
                <p>0.20 <span>ETH</span></p>
                <p> <AiFillHeart /> 25</p>
              </div>
            </div>
          </div>
          <div className="card-column" >
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids3} alt="" />
              <Link to={`/item/123`}>
              <p className="bids-title">Paint Color on Wall</p>
              </Link>
              </div>
              <div className="bids-card-bottom">
                <p>0.55 <span>ETH</span></p>
                <p> <AiFillHeart /> 55</p>
              </div>
            </div>
          </div>
          <div className="card-column" >
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids4} alt="" />
              <Link to={`/item/123`}>
              <p className="bids-title">Abstract Patern</p>
              </Link>
              </div>
              <div className="bids-card-bottom">
                <p>0.87 <span>ETH</span></p>
                <p> <AiFillHeart /> 82</p>
              </div>
            </div>
          </div>
          <div className="card-column" >
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids5} alt="" />
              <Link to={`/item/123`}>
              <p className="bids-title">White Line Grafiti</p>
              </Link>
              </div>
              <div className="bids-card-bottom">
                <p>0.09 <span>ETH</span></p>
                <p> <AiFillHeart /> 22</p>
              </div>
            </div>
          </div>
          <div className="card-column" >
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids6} alt="" />
              <Link to={`/item/123`}>
              <p className="bids-title">Abstract Triangle</p>
              </Link>
              </div>
              <div className="bids-card-bottom">
                <p>0.90 <span>ETH</span></p>
                <p> <AiFillHeart /> 71</p>
              </div>
            </div>
          </div>
          <div className="card-column" >
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids7} alt="" />
              <Link to={`/item/123`}>
              <p className="bids-title">Lake Landscape</p>
              </Link>
              </div>
              <div className="bids-card-bottom">
                <p>0.52 <span>ETH</span></p>
                <p> <AiFillHeart /> 63</p>
              </div>
            </div>
          </div>
          <div className="card-column" >
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids8} alt="" />
              <Link to={`/item/123`}>
              <p className="bids-title">Blue Red Art</p>
              </Link>
              </div>
              <div className="bids-card-bottom">
                <p>0.85 <span>ETH</span></p>
                <p> <AiFillHeart /> 66</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="load-more">
        <button>Load More</button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to link this addon with your NFT?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {!next? (
              
              !uuid? (
                  <Button onClick={generateUuid} autoFocus> Generate UUID </Button>
              ): ( " " + uuid,
              <>Link: <a href='#'>{window.location.host}/link/{uuid} </a><br/>Please Use this link and write something about this addon feature on your Unlockable content or Description text box and Create Your NFT.</>
              )
              
              
              
            ):<><div style={{marginLeft : "50px",marginTop:"10px"}} ><TextField id="outlined-basic" label="NFT Address" variant="outlined" /></div></>}
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {!next? 
          (<button className='nextButton'  onClick={handleNext}  disabled = {enable} autoFocus>
            Next
          </button>):(
             <Button onClick={handleNext} autoFocus>
              Create
            </Button>
          )
          }
          
        </DialogActions>
      </Dialog>
    </div>
    
  )
}

export default MyAddons
