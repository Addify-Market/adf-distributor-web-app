import { publicGet, externalGet, privatePost } from "../../utils/apiCaller";
import variables from "../../config/index";

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
        dispatch({ type: "LINK_CREATED" });
      })
      .catch(error => {
        console.log(`error: `, error);
      });
  };
