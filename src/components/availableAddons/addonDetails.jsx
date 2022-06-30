import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./addon.css";
import { useNavigate } from "react-router-dom";
// import item from "../../assets/item1.png";
//import nftAddrRef from "../../assets/nft-addr.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import { v4 as uuidv4 } from "uuid";
import { getAddondetails, getNFTdetails, linkAddon,getWalletNFTs } from "./action";
//import loader from "../../assets/loading2.gif";
import {Navbar, Footer} from "../../components";
import { ThreeCircles } from  'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import  {PreviewImage}  from "./previewImage";
import { ethers } from "ethers";

const AddonDetails = () => {
  let navigate = useNavigate();
  //const [addr, setAddr] = useState("");
  const [copied, setCopied] = useState(false);
  //const [PK, setPK] = useState("");
  //console.log(PK);
  //const [mask, setMask] = useState("");
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [uuid, setUuid] = useState("");
  const [addon, setAddon] = useState({});
  const dispatch = useDispatch();
  const props = useSelector(state => state);
  const { fetching, fetched } = props.addon;
  const [loading, setLoading] = useState(true);
  const [contractAddr] = useState(null);
  const [tokenId] = useState(null);
  const [NFT, setNFT] = useState({});
  const [spinner, setSpinner] = useState(false);
  console.log(NFT);
  // const [importPK, setImportPK] = useState(false);
  // const [error, setError] = useState(null);
  const params = window.location.pathname.split("/");
  const addonId = params[params.length - 1];
  const [nftList,setNftList] = useState(props.nfts.list);
  const [selected,setSelected] = useState([]);
  const [selectImage, setSelecteImage] = useState(true);
  const [error,setError]  = useState("");
  //const [search,setSearch] = useState([]);
  //const [keyword,setKeyword] = useState("");
  const [message] =useState( "Please Wait...");
  const fetchAddonDetails = () => {
    if (!fetching && loading && addonId !== props.addon.addonId) {
      console.log("fetching addon details");
      dispatch(getAddondetails(addonId));
    }
    if (!fetching && fetched) {
      setLoading(false);
      setAddon(props.addon);
    }
  };
  const fetchNftDetails = () => {
    if (loading && contractAddr && tokenId) {
      dispatch(getNFTdetails(contractAddr, tokenId));
      setLoading(false);
    }
    if (!props.nft.fetching && props.nft.fetched) {
      setNFT(props.nft);
    }
  };

  useEffect(fetchAddonDetails, [fetchAddonDetails, fetching, fetched]);
  useEffect(fetchNftDetails, [contractAddr, tokenId]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Update the document title using the browser API
    // if(keyword.length !== 0){
    //   setNftList(search)
    // }else{
    //   setNftList(props.nfts.list)
    // }
    setNftList(props.nfts.list)
    
  },[setNftList,props.nfts.list]);
  // useEffect(()=> {
  //   console.log("props",props);
  // })
//   useEffect(() => {
//     // const loadImage = image => {
//     //   return new Promise((resolve, reject) => {
//     //     const loadImg = new Image()
//     //     loadImg.src = image.url
//     //     // wait 2 seconds to simulate loading time
//     //     loadImg.onload = () =>
//     //       setTimeout(() => {
//     //         resolve(image.url)
//     //       }, 2000)

//     //     loadImg.onerror = err => reject(err)
//     //   })
//     // }
//     // Promise.all(nftList.map(image => loadImage(image.metadata.image)))
//     // .then(() => setSpinner(true))
//     // .catch(err => console.log("Failed to load images", err))
//     setTimeout(() => {
//       setSpinner(true)
//    }, 2000)
// }, [])
  useEffect(() => {
    // Update the document title using the browser API
    console.log("selected1",selected);
    
  },[selected]);
  const handleClickOpen = () => {
    dispatch(getWalletNFTs(localStorage.getItem("distributor")));
    setTimeout(() => {
      setSpinner(true)
   }, 1000)
    setUuid(uuidv4());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectNFTImage = (e,token_id) => {
    console.log("event token",e,token_id);
    
    const selectedClass = document.querySelector(".selected");
    console.log("selectedClass", selectedClass);
    
    // if(e.target.classList.contains("selected")){
    //   e.target.classList.remove("selected");
    // }
    if(e.target.classList.contains("selected")){
      selectedClass.classList.remove("selected")
      
      //e.target.classList.add("selected");
      console.log("classremove",e.target.classList);
      setSelecteImage(()=> true);
    }else if (selectedClass){
      selectedClass.classList.remove("selected");
      e.target.classList.add("selected");
      setSelecteImage(()=> false);
    }else{
      e.target.classList.add("selected");
      setSelecteImage(()=> false);
      console.log("classadd",e.target.classList);
    }
    
    console.log("selectImage",selectImage);
    console.log("selectTokenid",token_id);
    // console.log("token_id",token_id.length)
    if(token_id.length){
  
      const selectednft = nftList.filter(item=> item.token_id.includes(token_id));
      setSelected(selectednft);
      
      
    }
  
    // setStep(step + 1);
    // console.log(step);
  };
  // const handleNext = () => {
  //   setStep(step + 1);
  // }
  // const handleback = () => {
  //   setStep(step - 1);
  // };
  // const nftSearch = (e) => {
  //   console.log(e.target.value,"keyword");
  //   setKeyword(e.target.value);
  //   if(e.target.value.length === 0){
  //     setSearch([]);
  //   }else{
  //     const searchValue = nftList.filter(item=> item.metadata.name.toLowerCase().includes(keyword.toLowerCase()));
  //     console.log("search",searchValue);
  //     setSearch(searchValue);
  //   }
    
  // }
  
  // const onNFTAddressChange = e => {
  //   const nftAddr = e.target.value.split("/");
  //   setAddr(e.target.value);
  //   console.log(props);
  //   if (props.nfts.list.indexOf(e.target.value) === -1) {
  //     setError("This NFT doesen't belongs to your wallet");
  //     return;
  //   }
  //   setLoading(true);
  //   setContractAddr(nftAddr[0]);
  //   setTokenId(nftAddr[1]);
  // };
  // const onPKChange = e => {
  //   setPK(e.target.value);
  //   let mask = "";
  //   for (let i = 0; i < e.target.value.length; i++) {
  //     mask += "*";
  //   }
  //   setMask(mask);
  // };
  const handleLink = async () => {
    setLoading(true);
    console.log("props.distributor.distributorId",props.distributor.distributorId);
    console.log("selected1",selected);
    selected.map(async (data) => {
  
      await dispatch(
        linkAddon(
          uuid,
          data.contract_address,
          addonId,
          data.metadata,
          props.distributor.distributorId
        )
      )
    });
    
    setStep(step + 1);
    //navigate("/distributor/links");
  };
  const paylater = ()  => {
    //console.log("props",props);
    setStep(step + 1);

  }
  const payNow = async()  => {
    //console.log("props",props);
    
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
      // const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const tx1 = await signer.sendTransaction({
        to: "0x6b61FC8a00e7C0d6E6025C528FCafBBCC43935C6",
        value: ethers.utils.parseEther(props.addon.price)
      });
      //dispatch(updateStatus('status',1));
      // console.log({ ether, addr });
       console.log("tx", tx1);
       handleSubmit();
      // setTxs([tx]);
    } catch (err) {
      console.log(props.addon.price);
      setError(err.message);
    }

  }
  const handleSubmit = () => {
    const linkId = props.linkId
    navigate("/link/"+linkId);
  }
 

  return (
    <>
    <Navbar/>
      {props.addon.addonId !== addonId ? (
        <div style={{ width: "100%", marginTop:"200px", marginBottom:"200px", marginLeft:"850px" }}>
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
          <br />
          <b style={{ fontSize: "20pt", color:"white" }}>
            {message ? message : "Creating. Please wait..."}
          </b>
        </div>
      ) : (
        <div className="item section__padding">
         
          <div className="item-image">
            <img src={addon.logo} alt="item" style={{ width: '400px', height: '400px' }} />
          </div>
          <div className="item-content">
            <div className="item-content-title">
              <h1 style={{ margin: 0, padding: 0 }}>{addon.title}</h1>
              {addon.distributedBy && (
                <div className="item-content-creator" style={{ marginTop: 0 }}>
                  <div>
                    <p>From: {addon.distributedBy.business} </p>
                  </div>
                </div>
              )}
              <div
                style={{
                  padding: 10,
                  background: "#70707021",
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#fff",
                  borderRadius: 5
                }}
              >
                Price <span>{addon.price} ETH</span>
                <br />
                {addon.quantity || 1 - (addon.used + addon.booked || 1)} of{" "}
                {addon.quantity} available
              </div>
            </div>

            <div className="item-content-detail">
              <p>{addon.description}</p>
              {addon.link && (
                <p>
                  <a rel="noreferrer" href={addon.link} target="_blank">
                    More details...
                  </a>
                </p>
              )}
            </div>
            <div className="item-content-buy">
              <button className="primary-btn" onClick={handleClickOpen}>
                Link With NFT
              </button>
            </div>
          </div>
          <Dialog
            maxWidth="md"
            fullWidth={true}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {(step === 1) &&
                <>
                Link your NFT
                </>
              }
              {(step === 2) &&
                <>
                 Unlockable Content Description
                </>
              }
              {(step === 3) &&
                <>
                 Note
                </>
              }
              </DialogTitle>
            <DialogContent>
              <DialogContentText component="div" id="alert-dialog-description">
              {step ===1 && 
              <>
                {/* <div className="search">
                    <input type="text" onChange={nftSearch} placeholder="Search" />
                </div> */}
                <div className="image-container">
                {
                  
                  nftList.map((nft,index)=>
                    <PreviewImage {...nft}  spinner={spinner} selectNFTImage = {selectNFTImage}/>
                      
                  )
                  
                } 
                </div>
                <div className="">
                  <button
                    style={{backgroundColor: selectImage ? "#dddddd" : "white"}}
                    className="next"
                    disabled={selectImage}
                    onClick={handleLink}
                    autoFocus
                  >
                    {loading ? "Please wait" : "Link"}
                  </button>
                </div>
                </>
              }
              
              {step ===2 && 
              <>
               <br />
                  <div className="success-link" >Congrats! Linked Successufully</div>
                  <br/>
                  <p style={{textAlign:"center"}}><b>Please paste this on your NFT description & update NFT</b></p>
                  <br />
                  <p
                    
                    style={{
                      width: "80%",
                      margin: "auto",
                      padding: "5%",
                      backgroundColor: copied?"#79bbff":"#fcfcfc",
                      borderRadius: "10px"
                    }}
                    onClick={() =>  {
                      setCopied(true);
                      setTimeout(()=>{
                        setCopied(false)
                      },1000)
                      navigator.clipboard.writeText(`
                    ### Get *Exciting Addon* with this NFT.

                    This addon is **secured by Addify**. Please click on [this link](https://adf-distributor-web-app.vercel.app/link/${uuid}) to verify the addon before buying the NFT.`)
                  }}
                  >
                    {copied?
                    (<div style={{textAlign:"center"}}>
                      Copied
                    </div>):(
                    <>
                    <b>Get Exciting addon</b> With this NFT.
                    <br />
                    This addon is <b>secured by Addify</b>. Please click on <a href={`https://adf-distributor-web-app.vercel.app/link/${uuid}`} target="_blank" rel="noreferrer">this
                    link</a> to verify the addon before buying the NFT.
                    <br />
                    </>
                    )}
                    
                  </p>
                  <div className="payment">
                      <button className="paynow" onClick={payNow}>Pay Now</button>
                      <button className="button-6" onClick={paylater}> Pay Later</button>
                  </div>
                  {error && 
                    <div style={{color:"red",textAlign:"center"}} >
                      {error}
                    </div>
                  }
                </>
              }
              
              {step === 3 && 
                <>
                <p 
                style={{
                  color: "#a5a235",
                  fontWeight: "bold",
                  width: "80%",
                  margin: "auto",
                  padding: "5%",
                  backgroundColor: "#fcfcfc",
                  borderRadius: "10px"
                }}>Please note, you need to pay for this addon before your buyer redeems this.</p>
                <button
                style={{backgroundColor: selectImage ? "#dddddd" : "white"}}
                className="next"
                onClick={handleSubmit}
                autoFocus
              >
                {loading ? "Please wait" : "OK"}
              </button>
                </>
                
              }
                 
               
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* {step ===1 && 
                  <button
                    className="nextButton"
                    style={{backgroundColor: selectImage ? "#dddddd" : "white"}}
                    disabled={selectImage}
                    onClick={handleLink}
                    autoFocus
                  >
                    {loading ? "Please wait" : "Link"}
                  </button>
              }
               */}
            </DialogActions>
          </Dialog>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AddonDetails;
