import { expo } from "../app.json";
// import { NativeModules } from "react-native";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
// import * as firebase from "firebase/app";
// const { RNTwitterSignIn } = NativeModules;
import {
  iosClientId,
  androidClientId,
  androidStandaloneClientId,
} from "../constants";
// const { TwitterAuthProvider } = firebase.auth;
const TwitterKeys = {
  TWITTER_CONSUMER_KEY: "enter your own api key",
  TWITTER_CONSUMER_SECRET: "enter your own twitter app's secret key",
};
export const loginNowFb = async function login(props) {
  try {
    await Facebook.initializeAsync(expo.facebookAppId);
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"],
    });
    if (type === "success") {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      return { access_token: token, data: await response.json() };
    } else {
      return null;
    }
  } catch ({ message }) {
    alert(`Facebook Login Error`);
  }
};

export const loginNowGoogle = async () => {
  var config = {
    androidClientId: androidClientId,
    iosClientId: iosClientId,
    scopes: ["profile", "email"],
    behavior: "web",
  };
  const result = await Google.logInAsync(config);
  if (result.type === "success") {
    return result;
  } else {
    return { cancelled: true };
  }
};

// export const twitterLogin = async () => {
//   try {
//     await RNTwitterSignIn.init(
//       TwitterKeys.TWITTER_CONSUMER_KEY,
//       TwitterKeys.TWITTER_CONSUMER_SECRET
//     );
//     // also includes: name, userID & userName
//     const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();
//     const credential = TwitterAuthProvider.credential(
//       authToken,
//       authTokenSecret
//     );

//     const firebaseUserCredential = await firebase
//       .auth()
//       .signInWithCredential(credential);
//     console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
//   } catch (e) {
//     console.error(e);
//   }
// };
