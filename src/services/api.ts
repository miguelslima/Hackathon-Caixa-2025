import axios from "axios";

const api = axios.create({
  baseURL: "https://apphackaixades.azurewebsites.net/api/",
});

export { api };
