import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export const token = JSON.parse(localStorage.getItem("UserAuthKey"));

const headers = { ...DEFAULT_HEADERS };

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: headers,
});

export default axiosClient;
