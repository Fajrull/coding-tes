import axios from "axios";

const BASE_URL = "http://94.74.86.174:8080/api";

const Login = async (data) => {
  try {
    const url = `${BASE_URL}/login`;
    const response = await axios.post(url, data);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const Register = async (data) => {
  try {
    const url = `${BASE_URL}/register`;
    const response = await axios.post(url, data);
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export { Login, Register };
