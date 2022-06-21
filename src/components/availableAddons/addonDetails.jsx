import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./addon.css";
import { useNavigate } from "react-router-dom";
import item from "../../assets/item1.png";
import nftAddrRef from "../../assets/nft-addr.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { v4 as uuidv4 } from "uuid";
import { getAddondetails, getNFTdetails, linkAddon } from "./action";

const AddonDetails = () => {
  let navigate = useNavigate();
  const [addr, setAddr] = useState("");
  const [PK, setPK] = useState("");
  console.log(PK);
  const [mask, setMask] = useState("");
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [uuid, setUuid] = useState("");
  const [addon, setAddon] = useState({});
  const dispatch = useDispatch();
  const props = useSelector(state => state);
  const { fetching, fetched } = props.addon;
  const [loading, setLoading] = useState(true);
  const [contractAddr, setContractAddr] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [NFT, setNFT] = useState({});
  console.log(NFT);
  const [importPK, setImportPK] = useState(false);
  const [error, setError] = useState(null);
  const params = window.location.pathname.split("/");
  const addonId = params[params.length - 1];
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
  const handleClickOpen = () => {
    setUuid(uuidv4());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setStep(step + 1);
    console.log(step);
  };
  const handleback = () => {
    setStep(step - 1);
  };
  const onNFTAddressChange = e => {
    const nftAddr = e.target.value.split("/");
    setAddr(e.target.value);
    console.log(props);
    if (props.nfts.list.indexOf(e.target.value) === -1) {
      setError("This NFT doesen't belongs to your wallet");
      return;
    }
    setLoading(true);
    setContractAddr(nftAddr[0]);
    setTokenId(nftAddr[1]);
  };
  const onPKChange = e => {
    setPK(e.target.value);
    let mask = "";
    for (let i = 0; i < e.target.value.length; i++) {
      mask += "*";
    }
    setMask(mask);
  };
  const handleLink = async () => {
    setLoading(true);
    await dispatch(
      linkAddon(
        uuid,
        addr,
        addonId,
        props.nft.metadata,
        props.distributor.distributorId
      )
    );
    navigate("/distributor/links");
  };
  return (
    <>
      {props.addon.addonId !== addonId ? (
        "loading..."
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
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Link your NFT</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {step === 1 ? (
                  <>
                    <b>Please paste this on your NFT description & create NFT</b>
                    <br />
                    <br />
                    <p
                      style={{
                        width: "80%",
                        margin: "auto",
                        padding: "5%",
                        backgroundColor: "#fcfcfc",
                        borderRadius: "10px"
                      }}
                    >
                      <b>Get FREE {addon.title}</b> With this NFT.
                      <br />
                      This addon is <b>secured by Addify</b>. Please click on [ this
                      link](
                      {`https://addify-user-web-app.vercel.app/link/${uuid}`}) to
                      verify the addon before buying the NFT.
                      <br />
                    </p>
                    <br />
                  </>
                ) : step === 2 ? (
                  <>
                    <br />
                    <b>
                      Once your NFT is created, paste your Contract Address & Token
                      Id here:
                    </b>
                    <br />
                    <br />
                    <p
                      style={{
                        width: "80%",
                        margin: "auto",
                        padding: "5%",
                        backgroundColor: "#fcfcfc",
                        borderRadius: "10px"
                      }}
                    >
                      <TextField
                        style={{
                          width: "100%",
                          fontSize: 10
                        }}
                        id="outlined-basic"
                        placeholder="0xce229448a8945c8f57e37c60a64/12546"
                        variant="outlined"
                        value={addr}
                        onClick={() => {
                          setError(null);
                        }}
                        onBlur={onNFTAddressChange}
                        onChange={onNFTAddressChange}
                      />
                    </p>
                    <p
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        textAlign: "center",
                        height: 20,
                        marginBottom: 10
                      }}
                    >
                      {error}
                    </p>
                    <img src={nftAddrRef} style={{ width: "100%" }} alt="nft addr" />
                    <br />
                    <br />
                  </>
                ) : (
                  <>
                    <b>Important</b>
                    <br />
                    <p
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        width: "80%",
                        margin: "auto",
                        padding: "5%",
                        backgroundColor: "#fcfcfc",
                        borderRadius: "10px"
                      }}
                    >
                      Addon Linking won't cost you anything, but you need to pay,
                      before your buyer redeems the Addon. Redeemtion process will
                      fail otherwise.
                    </p>
                    <hr />
                    <br />
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={importPK}
                            defaultChecked
                            onChange={() => {
                              setImportPK(!importPK);
                            }}
                          />
                        }
                        label="Enable auto debit from your wallet"
                      />
                    </FormGroup>
                    <br />
                    <br />
                    {importPK && (
                      <>
                        <b>Import wallet</b>
                        <br />
                        <br />
                        <p
                          style={{
                            width: "80%",
                            margin: "auto",
                            padding: "5%",
                            backgroundColor: "#fcfcfc",
                            borderRadius: "10px"
                          }}
                        >
                          <b>We need permission</b> to sign the transaction. We won't
                          charge anything now. You wallet{" "}
                          <b>
                            will be charged only when your NFT is sold & your buyer
                            redeems the addon
                          </b>
                          .
                          <br />
                          Each time you link addon to your NFT, you need to enter
                          your private key. As{" "}
                          <b>We don't store your private key for security reason.</b>
                          <br />
                          <br />
                          Enter your private key:
                          <br />
                          <TextField
                            style={{
                              width: "100%"
                            }}
                            id="outlined-basic"
                            placeholder="NFT Address"
                            variant="outlined"
                            value={mask}
                            onChange={onPKChange}
                          />
                          <br />
                        </p>
                        <br />
                        You can also buy the Addon directly form here & link to your
                        NFT.
                        <br />
                      </>
                    )}
                  </>
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {step > 1 && <Button onClick={handleback}>Back</Button>}
              {step < 3 ? (
                <button
                  className="nextButton"
                  disabled={error}
                  onClick={handleNext}
                  autoFocus
                >
                  Next
                </button>
              ) : (
                <button
                  className="nextButton"
                  disabled={error || loading}
                  onClick={handleLink}
                  autoFocus
                >
                  {loading ? "Please wait" : "Link"}
                </button>
              )}
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default AddonDetails;
