import * as actionTypes from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case actionTypes.REGISTER_USER:
      return { ...state, loginSuccess: action.payload };
    default:
      return state;
  }
}
