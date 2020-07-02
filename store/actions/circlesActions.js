import { dispatchAction, postRequest } from "../services";
import { navigate } from "../services/navigator";
export const getCircles = (type) => async (dispatch, getState) => {
  if (type == "active") {
    var action = "SET_ACTIVE_CIRCLES";
  } else if (type == "finished") {
    var action = "SET_FINISHED_CIRCLES";
  } else if (type == "my_active") {
    var action = "SET_MY_ACTIVE_CIRCLES";
  } else if (type == "my_finished") {
    var action = "SET_MY_FINISHED_CIRCLES";
  } else {
    var action = false;
  }
  if (type == "active" || type == "finished") {
    var data = { circle_type: type };
  } else {
    var user = getState().auth.account.a_id;
    var data = { circle_type: type.replace("my_", ""), user_id: user };
  }
  if (action) {
    return await postRequest("circles", data)
      .then((result) => {
        dispatch({ type: action, payload: result.data.data });
      })
      .catch((err) => {
        // console.warn(err);
      });
  }
};
export const joinCircle = (id) => async (dispatch, getState) => {
  var user = getState().auth.account.a_id;
  var data = { circle_id: id, user_id: user };
  return await postRequest("join-circle", data)
    .then((result) => {
      // dispatch({ type: action, payload: result.data.data });
      alert(result.data.message);
      navigate("Root");
    })
    .catch((err) => {
      alert(err.response.data.message);
      return err.response.data;
    });
};
