import { Dimensions } from "react-native";
export const _Colors = { blue: "#3D36A4", orange: "#FF643D", bgColor: "#fff" };
export const { width, height } = Dimensions.get("window");
export const _titleStyle = {
  fontSize: 25,
  fontWeight: "bold",
  color: "#333"
};
export const _container = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: _Colors.bgColor,
  paddingHorizontal: 30
};
export const _greyDesc = {
  fontSize: 18,
  color: "#919191"
};
export default {
  isSmallDevice: width < 375
};
