import React, { Component } from "react";
import { logo, background, google } from "../constants/Images";
import { Image, View, ImageBackground } from "react-native";
import { height, width } from "../constants/";
const Logo = props => (
  <View style={{ height: 250, marginVertical: 30 }} {...props}>
    <Image resizeMode="contain" style={{ height: "100%" }} source={logo} />
  </View>
);
const Google = props => (
  <View style={{ height: 250, marginVertical: 30 }} {...props}>
    <Image resizeMode="contain" style={{ flex: 1 }} source={google} />
  </View>
);
const BackGround = props => (
  <View
    style={{
      width: width,
      height: height,
      flex: 1,
      zIndex: -1,
      position: "absolute",
      backgroundColor: "#333"
    }}
  >
    <ImageBackground
      style={{ height: height, width: width }}
      resizeMode="cover"
      source={background}
      {...props}
    />
  </View>
);
export { Logo, BackGround, Google };
