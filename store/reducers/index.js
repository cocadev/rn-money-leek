import { combineReducers } from "redux";
import authReducer from "./authReducer";
import circlesReducer from "./circlesReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  circles: circlesReducer,
});
export default rootReducer;
