import { publicGet } from "../../utils/apiCaller";

export const getLinkDetails = linkId => dispatch => {
  publicGet(`link/${linkId}`)
    .then(response => {
      console.log(response.data);
      dispatch({ type: "LINK_DETAILS", data: response.data.data });
    })
    .catch(error => {
      console.log(`error: `, error);
    });
};
