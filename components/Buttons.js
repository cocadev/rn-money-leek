import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { _C } from "../constants/Colors";
import { Zocial } from "@expo/vector-icons";
import { width } from "../constants";
export const IconButton = props => {
  const { iconName, text, backC, image } = props;
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <View
        style={{
          backgroundColor: backC,
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          width: 50,
          marginRight: 10
        }}
      >
        {iconName == undefined ? (
          image
        ) : (
          <Zocial color="#fff" size={20} name={iconName} />
        )}
      </View>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: _C.button,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 45,
    width: width - 100,
    paddingRight: 10,
    marginVertical: 10
  },
  buttonText: {
    fontSize: 20,
    color: _C.buttonText
  }
});
