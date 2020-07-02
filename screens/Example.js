import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { _C } from "../constants/Colors";
import { defaultStyles } from "../constants";
import { BackGround } from "../components/Images";
import HeaderBack from "../components/Header/HeaderBack";
export class Example extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BackGround />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.fixed, styles.scrollView]}
        >
          <HeaderBack isRight={false} title="Title" {...this.props} />
        </ScrollView>
      </View>
    );
  }
}

export default Example;
const styles = StyleSheet.create({
  ...defaultStyles
});
