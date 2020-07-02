import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { _C } from "../constants/Colors";
import { defaultStyles } from "../constants";
import { BackGround, Logo } from "../components/Images";
export class NotificationScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BackGround />
        <Logo />
      </View>
    );
  }
}

export default NotificationScreen;
const styles = StyleSheet.create({
  ...defaultStyles
});
