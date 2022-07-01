import { publicPost ,publicGet } from "../../utils/apiCaller";
export const postDistributorInfo = (walletId,name,phone,email) => dispatch => {
   return publicPost(
        `distributor`,
        {},
        {
          walletId,
          name: name,
          phone: phone,
          email: email
        }
      )
        .then(response => {
          dispatch({
            type: "DISTRIBUTOR_INFO",
            data: response.data.data
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
          console.log("error:", error);
          //dispatch({ type: "DISTRIBUTOR_INFO", data: {error:"404",distributedId:null}});
          // publicPost(
          //   `distributor`,
          //   {},
          //   {
          //     walletId,
          //     name: "Shuhail Alam",
          //     phone: null,
          //     email: "shuhail@grr.la"
          //   }
          // )
          //   .then(response => {
          //     dispatch({
          //       type: "DISTRIBUTOR_INFO",
          //       data: {
          //         walletId,
          //         name: "Shuhail Alam",
          //         phone: null,
          //         email: "shuhail@grr.la",
          //         distributorId: response.data.distributorId
          //       }
          //     });
          //     publicGet(`addons`)
          //       .then(response => {
          //         dispatch({ type: "FETCH_ADDONS", data: response.data.data });
          //       })
          //       .catch(error => {
          //         // dispatch(updateFail());
          //         console.log(`error: `, error);
          //       });
          //   })
          //   .catch(error => {
          //     // dispatch(updateFail());
          //     console.log(`error: `, error);
          //   });
        });
    };