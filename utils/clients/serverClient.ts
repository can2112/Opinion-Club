import axios from "axios";

const serverClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
serverClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    return res;
  }
);

export default serverClient;
