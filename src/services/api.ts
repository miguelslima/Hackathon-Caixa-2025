import axios from "axios";

const api = axios.create({
  baseURL: "https://hip-goats-build.loca.lt/",
  // baseURL: "https://apphackaixades.azurewebsites.net/api/",
});

export { api };
