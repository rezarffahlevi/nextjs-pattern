import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  timeout: 1000000000,
  validateStatus: function validateStatus(status) {
    return true;
  },
});

export { instance as RESTAPI };
