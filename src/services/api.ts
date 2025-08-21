import axios from "axios";

const api = axios.create({
  baseURL: "https://hackathon-caixa-2025-psu62372y-miguel-limas-projects.vercel.app",
  // baseURL: "https://apphackaixades.azurewebsites.net/api/",
});

export { api };
