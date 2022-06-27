import { publicGet, externalGet, privatePost } from "../../utils/apiCaller";
import variables from "../../config/index";
import data from "./testData";
export const getAddons = () => dispatch => {
  publicGet(`addons`)
    .then(response => {
      dispatch({ type: "FETCH_ADDONS", data: response.data.data });
    })
    .catch(error => {
      // dispatch(updateFail());
      console.log(`error: `, error);
    });
};

export const getAddondetails = addonId => dispatch => {
  publicGet(`addons/${addonId}`)
    .then(response => {
      dispatch({ type: "ADDON_DETAILS", data: response.data.data });
    })
    .catch(error => {
      console.log(`error: `, error);
    });
};

export const getNFTdetails = (contractAddr, tokenId) => dispatch => {
  externalGet(
    `${variables.NFTPortUrl}/nfts/${contractAddr}/${tokenId}?chain=rinkeby`,
    {
      Authorization: variables.NFTPortKey
    }
  )
    .then(async response => {
      let nft = response.data.nft;
      console.log(nft);
      if (!nft.metadata) {
        nft.metadata = await externalGet(nft.metadata_url).then(
          response => response.data
        );
        dispatch({ type: "NFT_DETAILS", data: response.data.nft });
      } else {
        dispatch({ type: "NFT_DETAILS", data: response.data.nft });
      }
    })
    .catch(error => {
      console.log(`error: `, error);
    });
};

 //let nfts = [];
// const allNFTs = (wallet, next = null) => {
//   //let walletId = "0x976e9A7B3112B498824E676dC2779F5edd0494A0";
//   //let url = `${variables.NFTPortUrl}/accounts/${wallet}?chain=rinkeby`;
//   let url = `${variables.moralis.apiUrl}/${wallet}/nft?chain=rinkeby&format=decimal`
//   // if (next) {
//   //   url += `&continuation=${next}`;
//   // }
//   console.log(url);
//   return externalGet(`${url}`, {
//     "X-API-Key": variables.moralis.apiKey
//   })
//     .then(response => {
//       console.log("nftdata",response.data);
//       // for (let nft of response.data.nfts) {
//       //   nfts.push(`${nft.contract_address}/${nft.token_id}`);
//       // }
//       // if (response.data.continuation) {
//       //   return allNFTs(wallet, response.data.continuation);
//       // } else {
//       //   return nfts;
//       // }
//     }
//     )
//     .catch(error => {
//       console.log(`error: `, error);
//     });
// };

export const getWalletNFTs = walletAddr => async dispatch => {
  //const walletNFTs = await allNFTs(walletAddr);
  //dispatch({ type: "WALLET_NFTS", data: walletNFTs });
  dispatch({ type: "WALLET_NFTS", data: data.nfts });
  //nfts = [];
};

export const linkAddon =
  (linkId, nftAddress, addonId, metadata, distributorid) => dispatch => {
    return privatePost(
      `link`,
      {
        distributorid
      },
      {
        linkId,
        nftAddress,
        addonId,
        metadata
      }
    )
      .then(response => {
        console.log(response.data.data);
        dispatch({ type: "LINK_ID", data: response.data.data.linkId});
        dispatch({ type: "LINK_CREATED" });
      })
      .catch(error => {
        console.log(`error: `, error);
      });
  };
