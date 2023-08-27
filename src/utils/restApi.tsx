import axios from "axios";

const instance = axios.create({
  baseURL: `https://run.mocky.io/`,
  timeout: 10000,
  validateStatus: function validateStatus(status) {
    return true;
  },
});

export { instance as RESTAPI };
