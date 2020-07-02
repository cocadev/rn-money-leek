import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { Logo, BackGround } from "../components/Images";
class Splash extends Component {
  render() {
    return (
      <View
        style={[{ justifyContent: "center", alignItems: "center", flex: 1 }]}
      >
        <Logo />
        <ActivityIndicator color="#fff" size="large" />
        <BackGround />
      </View>
    );
  }
}
export default Splash;
