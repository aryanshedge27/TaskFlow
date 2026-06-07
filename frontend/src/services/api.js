import axios from "axios";

const API = axios.create({
  baseURL: "https://taskflow-backend-gzvh.onrender.com/api",
});

export default API;