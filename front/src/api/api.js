import axios from "axios";

const baseURL = "http://localhost:3030";

export const get = (url, params) => {
  return axios.get(url, {
    baseURL,
    params,
  });
};

export const post = (url, data) => {
  return axios.post(url, data, {
    baseURL,
  });
};
