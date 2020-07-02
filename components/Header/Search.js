import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { width, defaultStyles } from "../../constants";
import { Circle } from "../../components";
import { Feather } from "@expo/vector-icons";
import { _C } from "../../constants/Colors";
class Search extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <Text style={styles.text}>Join Circle</Text>
        <View style={styles.row}>
          <View style={styles.circle}>
            <Feather name="plus" color={_C.yellow} size={22} />
          </View>
          <View style={styles.circle}>
            <Feather name="search" color={_C.yellow} size={22} />
          </View>
        </View>
      </View>
    );
  }
}
export default Search;

const styles = StyleSheet.create({
  ...defaultStyles,
  parent: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    backgroundColor: _C.bBG,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20
  }
});
