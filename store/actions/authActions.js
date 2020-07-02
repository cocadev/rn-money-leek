import { dispatchAction, postRequest } from "../services";
import { navigate, goBack } from "../services/navigator";
export const welcomeDone = () => {
  return dispatchAction("WELCOME_DONE", false, "Login");
};
export const socialLogin = (data, route = "VerifyNumber") => async (
  dispatch
) => {
  dispatch({ type: "SOCIAL_LOGIN", payload: data });
  navigate(route);
};
export const saveOtpToken = (data, navigate = "EnterOtp") => {
  return dispatchAction("SAVE_OTP_TOKEN", data, navigate);
};
export const loginNow = (obj, route = "Root") => async (dispatch, getState) => {
  var user = getState().auth.user;
  var data = {
    social_token: user.social_token,
    provider: user.provider,
    device_token: user.device_token,
    access_token: user.access_token,
    phone: user.phone,
  };
  return await postRequest("login", data)
    .then((result) => {
      dispatch({ type: "LOGIN_NOW", payload: result.data });
      navigate(route);
    })
    .catch((err) => {
      dispatch({ type: "SOCIAL_SIGNUP", payload: data });
      navigate("Signup");
    });
};
export const signupNow = (data) => async (dispatch) => {
  return await postRequest("signup", data)
    .then((result) => {
      dispatch({ type: "LOGIN_NOW", payload: result.data });
      navigate("Root");
    })
    .catch((err) => {
      console.warn(err);
      alert(err.response.data.message);
    });
};
export const logout = (data) => {
  return dispatchAction("LOGOUT", data, "Login");
};
export const uploadCnic = (data) => async (dispatch) => {
  return await postRequest("update-profile", data)
    .then((result) => {
      // dispatch({ type: "LOGIN_NOW", payload: result.data });
      // navigate("Root");
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};
export const updateCnicImages = (cnics) => async (dispatch, getState) => {
  var user = getState().auth.account.a_id;
  var data = { cnic: cnics, user_id: user };
  return await postRequest("update-profile", data)
    .then((result) => {
      dispatch({ type: "SAVE_CNIC", payload: cnics });
      goBack();
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};
export const getUser = () => async (dispatch, getState) => {
  var user = getState().auth.account.a_token;
  var data = { api_token: user };
  return await postRequest("profile", data)
    .then((result) => {
      dispatch({ type: "LOGIN_NOW", payload: result.data });
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};
export const setDeviceToken = (data) => {
  return dispatchAction("SAVE_DEVICE_TOKEN", data);
};
