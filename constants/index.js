import { Dimensions, StyleSheet } from "react-native";
import { _C } from "./Colors";
export const { height, width } = Dimensions.get("window");
const cPadding = { paddingHorizontal: 20 };
export const iosClientId =
  "851630312397-jjgq8n36b7nnes6jcs9bkalbqb39e5hu.apps.googleusercontent.com";
export const androidClientId =
  "851630312397-qq30blf91vvm57meduo364aktv9ajvs8.apps.googleusercontent.com";
export const firebaseConfig = {
  apiKey: "AIzaSyD9JsdwOQ8HIlWdl4YpeEFDyikzmQ4ZNLw",
  authDomain: "moneyleek.com",
  databaseURL: "https://moneyleek-74284.firebaseio.com",
  projectId: "moneyleek-74284",
  storageBucket: "moneyleek-74284.appspot.com",
  messagingSenderId: "851630312397",
  appId: "1:851630312397:web:51cdab836dc5d1b90f1284",
  measurementId: "G-LFR68N9CYG"
};

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    ...cPadding,
  },
  cPadding: {
    ...cPadding,
  },
  logoSm: {
    height: 150,
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    backgroundColor: "transparent",
  },
  bottomNote: {
    flexDirection: "row",
    position: "absolute",
    bottom: 30,
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  titleY: {
    color: _C.yellow,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  titleL: {
    fontSize: 30,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    marginVertical: 10,
  },
  nText: {
    color: "#fff",
    fontSize: 15,
  },
  textY: {
    color: _C.yellow,
    fontSize: 18,
    marginVertical: 10,
  },
  label: {
    color: "#fff",
    fontSize: 18,
  },
  labelY: {
    color: _C.yellow,
    fontSize: 18,
  },
  bgP: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: _C.bBG,
    borderRadius: 10,
    width: "auto",
    padding: 15,
    paddingTop: 5,
    paddingBottom: 10,
    marginVertical: 5,
  },
  InputBox: {
    flex: 1,
    height: 40,
    fontSize: 20,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    color: "#fff",
  },
  button: {
    backgroundColor: _C.button,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: "100%",
    paddingRight: 10,
    marginVertical: 20,
    borderRadius: 6,
  },
  mt80: {
    marginTop: 80,
  },
  mt20: {
    marginTop: 20,
  },
  mt10: {
    marginTop: 10,
  },
  pt80: {
    paddingTop: 80,
  },
  buttonText: {
    fontSize: 20,
    color: _C.buttonText,
  },
  mv30: {
    marginVertical: 30,
  },
  mv20: {
    marginVertical: 20,
  },
  mv10: {
    marginVertical: 10,
  },
  mL10: {
    marginLeft: 10,
  },
  mR10: {
    marginRight: 10,
  },
  mL20: {
    marginLeft: 20,
  },
  mR20: {
    marginRight: 20,
  },
  textM: {
    fontSize: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  c2: {
    width: "50%",
  },
  mt0: {
    marginTop: 0,
  },
  mh20: {
    marginHorizontal: 20,
  },
  mh10: {
    marginHorizontal: 10,
  },
  nowrap: { flexWrap: "nowrap" },
  alCenter: {
    alignItems: "center",
  },
  textW: {
    color: "#fff",
  },
});
