import * as actionTypes from "./types";
import axios from "axios";

function registerUser(dataToSend) {
  const req = axios
    .post(`http://localhost:5000/api/users/register`, dataToSend)
    .then((res) => res.data);

  return {
    type: actionTypes.REGISTER_USER,
    payload: req,
  };
}

export default registerUser;
