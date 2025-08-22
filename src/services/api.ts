import axios from "axios";

const api = axios.create({
  baseURL: "https://hackathon-caixa-2025-zeta.vercel.app",
  // baseURL: "http://192.168.0.100:3001",
});

export { api };
