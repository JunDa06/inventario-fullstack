import axios from "axios";

const api = axios.create({
  baseURL: "https://inventario-fullstack-production.up.railway.app/api"
});

export default api;