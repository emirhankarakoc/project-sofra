import axios from "axios";

const HOSTLINK = "https://backend.bdmstf.easypanel.host";
const LOCALHOST = "http://localhost:8080";
export const APIURL = LOCALHOST;

// Function to get token from local storage or return null
const getToken = () => {
  const userToken = localStorage.getItem("userToken");
  return userToken ? `Bearer ${userToken}` : null;
};

export let http = axios.create({
  baseURL: APIURL,
  headers: {
    Authorization: getToken(), // Include Authorization header if token exists
  },
});

// Interceptor to conditionally add Authorization header if token is present
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const httpError = (error) => {
  let errorMessage = error.message;

  if (error.response) {
    errorMessage = error.response.data;
  }
  return errorMessage;
};
