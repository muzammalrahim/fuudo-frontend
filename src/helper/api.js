import axios from "../config/axiosConfig";
import { authHeader } from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

export default async function get(endpoint, config = authHeader()) {
  return await axios.get(API_URL + endpoint, {headers:config}).then((response) => {
      
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

export async function del(endpoint, data = {}, config = authHeader()) {
  
  return await axios.delete(API_URL + endpoint, {headers:config});
}

export async function post(endpoint, data, config = authHeader()) {
  
  return await axios.post(API_URL + endpoint, data, {headers:config});
}
export async function put(endpoint, data, config = authHeader()) {
  
  return await axios.put(API_URL + endpoint, data, {headers:config});
}
