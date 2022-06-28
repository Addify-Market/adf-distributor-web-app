import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./addon.css";
import { useNavigate } from "react-router-dom";
import item from "../../assets/item1.png";
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
import loader from "../../assets/loading2.gif";
import {Navbar, Footer} from "../../components"


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
  console.log(NFT);
  // const [importPK, setImportPK] = useState(false);
  // const [error, setError] = useState(null);
  const params = window.location.pathname.split("/");
  const addonId = params[params.length - 1];
  const [nftList,setNftList] = useState(props.nfts.list);
  const [selected,setSelected] = useState([]);
  const [selectImage, setSelecteImage] = useState(true);
  const [search,setSearch] = useState([]);
  const [keyword,setKeyword] = useState("");
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
    if(keyword.length !== 0){
      setNftList(search)
    }else{
      setNftList(props.nfts.list)
    }
    
  },[setNftList,keyword.length,props.nfts.list,search]);
  useEffect(() => {
    // Update the document title using the browser API
    console.log("selected1",selected);
    
  },[selected]);
  const handleClickOpen = () => {
    dispatch(getWalletNFTs(localStorage.getItem("distributor")));
    
    setUuid(uuidv4());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectNFTImage = (e,token_id) => {
    //console.log("event",e);
    

    setSelecteImage(()=> !selectImage);
    if(!selectImage){
      e.target.classList.remove("selected");
    }else{
      e.target.classList.add("selected");
    }
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
  const nftSearch = (e) => {
    console.log(e.target.value,"keyword");
    setKeyword(e.target.value);
    if(e.target.value.length === 0){
      setSearch([]);
    }else{
      const searchValue = nftList.filter(item=> item.metadata.name.toLowerCase().includes(keyword.toLowerCase()));
      console.log("search",searchValue);
      setSearch(searchValue);
    }
    
  }
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
  const handleSubmit = () => {
    const linkId = props.linkId
    navigate("/link/"+linkId);
  }
 

  return (
    <>
    <Navbar/>
      {props.addon.addonId !== addonId ? (
        <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
          <img
            src={loader}
            alt="vybuhijk"
            style={{ width: "400px", height: "400px", margin: "auto" }}
          />
          <br />
          <b style={{ fontSize: "20pt", color:"white" }}>
            {message ? message : "Creating. Please wait..."}
          </b>
        </div>
      ) : (
        <div className="item section__padding">
          <div className="item-image">
            <img src={item} alt="item" style={{ width: 200, height: 200 }} />
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
            <DialogTitle id="alert-dialog-title">Link your NFT</DialogTitle>
            <DialogContent>
              <DialogContentText component="div" id="alert-dialog-description">
              {step ===1 && 
              <>
                <div className="search">
                    <input type="text" onChange={nftSearch} placeholder="Search" />
                </div>
                <div className="image-container">
                  {console.log(nftList,"nftList")}
                {
                  
                  nftList.map((nft,index)=>
                      
                      <div className="images" key={index}>
                        <div className="image"> 
                            {/* <img src ={nft.metadata.image} onClick={()=>handleNext(nft.token_id)} alt={nft.metadata.name}/> */}
                            {console.log(selectImage,"selectImage")}
                            <img src ={nft.metadata.image} className="addon-preview"  onClick={(e)=>selectNFTImage(e,nft.token_id)} alt={nft.metadata.name}/> 
                        </div>
                        <div className="title" >
                          <span>{nft.metadata.name}</span>
                        </div>
                        </div>
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
                  <b>Please paste this on your NFT description & update NFT</b>
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
                      },200)
                      navigator.clipboard.writeText(`
                    ### Get *Exciting Addon* with this NFT.

                    This addon is **secured by Addify**. Please click on [this link](https://adf-distributor-web-app.vercel.app/link/${uuid}) to verify the addon before buying the NFT.`)
                  }}
                  >
                    <b>Get Exciting addon</b> With this NFT.
                    <br />
                    This addon is <b>secured by Addify</b>. Please click on <a href={`https://adf-distributor-web-app.vercel.app/link/${uuid}`} target="_blank" rel="noreferrer">this
                    link</a> to verify the addon before buying the NFT.
                    <br />
                  </p>
                  <div className="payment">
                      <button className="paynow">Pay Now</button>
                      <button className="button-6" onClick={paylater}> Pay Later</button>
                  </div>
                  
                </>
              }
              
              {step === 3 && 
                <>
                <p 
                style={{
                  color: "red",
                  fontWeight: "bold",
                  width: "80%",
                  margin: "auto",
                  padding: "5%",
                  backgroundColor: "#fcfcfc",
                  borderRadius: "10px"
                }}>You need to pay,
                before your buyer redeems the Addon. Otherwise, Redeemtion process will
                fail.</p>
                <button
                style={{backgroundColor: selectImage ? "#dddddd" : "white"}}
                className="next"
                onClick={handleSubmit}
                autoFocus
              >
                {loading ? "Please wait" : "Done"}
              </button>
                </>
                
              }
                 
               
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {console.log("step",step)}
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
