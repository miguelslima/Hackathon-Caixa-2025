import axios from "axios";

const api = axios.create({
  baseURL: "https://hackathon-caixa-2025-zeta.vercel.app",
});

export { api };
