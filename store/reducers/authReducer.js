const defaultUser = {
  access_token: "",
  social_token: "",
  provider: "",
  device_token: "",
  name: "kareem",
  email: "",
  phone: "",
  age: "25",
  gender: "Male",
  state: "Cairo",
  country: "Egypt",
  status: "Employed",
  jobName: "Developer",
  highestIncome: "15000",
  gotLoanInPast: "Yes",
  anyPendingInstallment: "Yes",
  privacyPolicyAccept: true,
};
const initialState = {
  welcomeUser: true,
  isLoggedIn: false,
  user: defaultUser,
  account: {},
  otpToken: null,
  phoneNumber: null,
  isUserExists: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "WELCOME_DONE":
      return { ...state, welcomeUser: action.payload };
    case "SOCIAL_LOGIN":
      let loginP = action.payload;
      var data = {
        ...state,
        user: Object.assign(state.user, {
          social_token: loginP.token,
          provider: loginP.provider,
          access_token: loginP.access_token,
          name: loginP.name,
          email: loginP.email,
        }),
        isUserExists: true,
      };
      debugger;
      return data;
    case "SOCIAL_SIGNUP":
      var signup = {
        ...state,
        isUserExists: false,
      };
      return signup;
    case "LOGIN_NOW":
      var account = action.payload.data;
      debugger;
      return { ...state, account: account, isLoggedIn: true };
    case "SAVE_CNIC":
      var data = {
        ...state,
        account: Object.assign(state.account, {
          isCnicVerified: false,
          a_cnic: action.payload,
        }),
      };
      return data;
    case "SAVE_OTP_TOKEN":
      var res = {
        ...state,
        otpToken: action.payload.token,
        phoneNumber: action.payload.phone,
        user: Object.assign(state.user, {
          phone: action.payload.phone,
        }),
      };
      return res;
    case "SAVE_DEVICE_TOKEN":
      var res = {
        ...state,
        user: Object.assign(state.user, {
          device_token: action.payload,
        }),
      };
      console.warn(res);
      return res;
    case "LOGOUT":
      return { ...state, user: defaultUser, account: {}, isLoggedIn: false };
    default:
      return state;
  }
};
export default authReducer;
