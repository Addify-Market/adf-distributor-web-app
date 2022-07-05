import { privateGet } from "../../utils/apiCaller";

export const getLinks = distributorid => dispatch => {
 return privateGet(`distributor/links`, { distributorid })
    .then(response => {
      dispatch({ type: "FETCH_LINKS", data: response.data.data });
    })
    .catch(error => {
      // dispatch(updateFail());
      console.log(`error: `, error);
    });
};
