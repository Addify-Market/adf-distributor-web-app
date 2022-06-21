import {  publicGet } from "../../utils/apiCaller";


  export const getDistributorInfo =  walletId => dispatch => {
    console.log("acWalletId",walletId)
    return publicGet(`distributor/${walletId}`)
      .then(response => {
        dispatch({type:"DISTRIBUTOR_INFO",data: response.data.data});
      })
      .catch(error => {
        // dispatch(updateFail());
        console.log(`error: `, error);
      });
  };