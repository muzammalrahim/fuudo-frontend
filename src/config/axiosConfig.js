import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    function(config) {
      const token = localStorage.getItem("token"); 
      if (token) {
        config.headers["Authorization"] = 'Token ' + token;
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  export default axiosInstance;