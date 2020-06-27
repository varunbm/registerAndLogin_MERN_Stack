import axios from "axios";
import * as actionTypes from "./types";

function loginUser(dataToSubmit) {
  const req = axios
    .post(`http://localhost:5000/api/users/login`, dataToSubmit)
    .then((res) => res.data);

  return {
    type: actionTypes.LOGIN_USER,
    payload: req,
  };
}

export default loginUser;
