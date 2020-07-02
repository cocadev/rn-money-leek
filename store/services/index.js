import { navigate } from "../services/navigator";
import axios from "axios";
import { BACKEND_URL } from "react-native-dotenv";
export const dispatchAction = (action, payload, route = null) => (dispatch) => {
  dispatch({ type: action, payload: payload });
  if (route) {
    navigate(route);
  }
};
export const postRequest = async (url, body) => {
  console.warn("body", body);
  var finalUrl = BACKEND_URL + url;
  return new Promise((resolve, reject) => {
    axios
      .post(finalUrl, body)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
