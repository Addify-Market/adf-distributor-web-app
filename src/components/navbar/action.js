import { publicGet, externalGet, publicPost } from "../../utils/apiCaller";
import variables from "../../config/index";
export const getDistributorInfo = walletId => dispatch => {
  publicGet(`distributor/${walletId}`)
    .then(response => {
      dispatch({ type: "DISTRIBUTOR_INFO", data: response.data.data });
      publicGet(`addons`)
        .then(response => {
          dispatch({ type: "FETCH_ADDONS", data: response.data.data });
        })
        .catch(error => {
          // dispatch(updateFail());
          console.log(`error: `, error);
        });
    })
    .catch(error => {
      publicPost(
        `distributor`,
        {},
        {
          walletId,
          name: "Shuhail Alam",
          phone: null,
          email: "shuhail@grr.la"
        }
      )
        .then(response => {
          dispatch({
            type: "DISTRIBUTOR_INFO",
            data: {
              walletId,
              name: "Shuhail Alam",
              phone: null,
              email: "shuhail@grr.la",
              distributorId: response.data.distributorId
            }
          });
          publicGet(`addons`)
            .then(response => {
              dispatch({ type: "FETCH_ADDONS", data: response.data.data });
            })
            .catch(error => {
              // dispatch(updateFail());
              console.log(`error: `, error);
            });
        })
        .catch(error => {
          // dispatch(updateFail());
          console.log(`error: `, error);
        });
    });
};
let nfts = [];
const allNFTs = (wallet, next = null) => {
  let url = `${variables.NFTPortUrl}/accounts/${wallet}?chain=rinkeby`;
  if (next) {
    url += `&continuation=${next}`;
  }
  console.log(url);
  return externalGet(`${url}`, {
    Authorization: variables.NFTPortKey
  })
    .then(response => {
      console.log(response.data);
      for (let nft of response.data.nfts) {
        nfts.push(`${nft.contract_address}/${nft.token_id}`);
      }
      if (response.data.continuation) {
        return allNFTs(wallet, response.data.continuation);
      } else {
        return nfts;
      }
    })
    .catch(error => {
      console.log(`error: `, error);
    });
};

export const getWalletNFTs = walletAddr => async dispatch => {
  const walletNFTs = await allNFTs(walletAddr);
  dispatch({ type: "WALLET_NFTS", data: walletNFTs });
  nfts = [];
};
