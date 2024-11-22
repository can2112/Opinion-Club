import axios from "axios";
const nextClient = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
nextClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    return res;
  }
);

export default nextClient;
