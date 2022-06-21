import axios from "axios";
import { serviceUrl } from "../config";
const defaultApiVersion = "v1";

export const publicPost = (
    endpoint,
    headers={},
    body,
    apiVersion = defaultApiVersion
  ) => {
    return axios
      .post(`${serviceUrl}/${endpoint}`,body, 
      {
        headers:headers
      }
      )
      .then(response => response)
      .catch(error => console.log("Error occured: ", error));
  };

  export const publicGet = (
    endpoint,
    apiVersion = defaultApiVersion
  ) => {
      
    return axios
      .get(`${serviceUrl}/${endpoint}`, 
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
      )
      .then(response => response)
      .catch(error => console.log("Error occured: ", error));
  };
  export const privateGet = (
    endpoint,
    headers,
    apiVersion = defaultApiVersion
  ) => {
      
    return axios
      .get(`${serviceUrl}/${endpoint}`, 
      {
        headers: headers
      }
      )
      .then(response => response)
      .catch(error => console.log("Error occured: ", error));
  };