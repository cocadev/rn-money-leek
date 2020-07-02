import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { _C } from "../constants/Colors";
import { width, defaultStyles } from "../constants";
const VerifyCnic = ({ navigation }) => {
  return (
    <View style={styles.boxP}>
      <Text style={styles.title}>National ID Required</Text>
      <Text style={[styles.text]}>
        To join this circle you need to have verified National ID.
      </Text>
      <Text style={[styles.text]}>Capture your National ID to be verified</Text>
      <View style={[styles.row, styles.btnG]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UploadCnic")}
          style={[styles.button, styles.customizeBtn]}
        >
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("UploadCnic")}
          style={[styles.button, styles.customizeBtn]}
        >
          <Text style={styles.buttonText}>Upload Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyCnic;

const styles = StyleSheet.create({
  ...defaultStyles,
  boxP: {
    height: 250,
    width: width - 20,
    backgroundColor: _C.bBG,
    position: "absolute",
    bottom: 105,
    left: -40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  customizeBtn: {
    width: 160,
    paddingHorizontal: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  btnG: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: _C.text,
    fontSize: 18,
    textAlign: "center",
    marginVertical: 5,
  },
  title: {
    color: _C.yellow,
    fontSize: 30,
    textAlign: "center",
    marginVertical: 10,
  },
});
