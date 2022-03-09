import axios from "../config/axiosConfig";
import { subAdminAuthHeader } from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;
{
  /*const Authorization =
  JSON.parse(localStorage.getItem("persist:v705-demo1-auth")) &&
  JSON.parse(localStorage.getItem("persist:v705-demo1-auth")).authToken;
export const headers = {
  "Content-Type": "application/json",
  Authorization: `Token ${Authorization && Authorization.replaceAll('"', "")}`,
};  */
}

// export const get2 = async (endpoint, params = {}) => {

//   const result = await axios.get(API_URL + endpoint).then((response) => {
//     // return axios.get(API_URL+endpoint) .then(response => {

//     if (response.data.results !== undefined) {
//       response.extra_data = {
//         count: response.data.count,
//         next: response.data.next,
//         previous: response.data.previous,
//       };
//       response.data = response.data.results;
//     }
//     return response;
//   });

//    return result

// };

export default async function get(endpoint, config = subAdminAuthHeader()) {
  
  return await axios.get(API_URL + endpoint, {headers:config}).then((response) => {
    // return axios.get(API_URL+endpoint) .then(response => {
      
    if (response.data.results !== undefined) {
      response.extra_data = {
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      };
      response.data = response.data.results;
    }
    return response;
  });
}

export async function del(endpoint, data = {}, config = subAdminAuthHeader()) {

  return await axios.delete(API_URL + endpoint, {headers:config});
}

export async function post(endpoint, data, config = subAdminAuthHeader()) {
  
  return await axios.post(API_URL + endpoint, data, {headers:config});
}
export async function put(endpoint, data, config = subAdminAuthHeader()) {
  
  return await axios.put(API_URL + endpoint, data, {headers:config});
}

{
  /*
export function put(endpoint, data) {
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.put(API_URL + endpoint, data, config);
}
export function patch(endpoint, data) {
  let config = {
    headers: headers,
  };
  return axios.patch(API_URL + endpoint, data);
}

export function post(endpoint, data) {
  let config = {
    headers: headers,
  };
  return axios.post(API_URL + endpoint, data, config);
}

export function del(endpoint, data = {}) {
  let config = {
    headers: headers,
    data: data,
  };
  return axios.delete(API_URL + endpoint, config);
}
*/
}
