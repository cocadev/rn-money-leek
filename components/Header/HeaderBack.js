import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { width, defaultStyles } from "../../constants";
import { Circle } from "../../components";
import { Feather } from "@expo/vector-icons";
import { _C } from "../../constants/Colors";
class HeaderBack extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { title, isBack, isRight, icon, image, rightClick } = this.props;
    return (
      <View style={styles.parent}>
        <TouchableOpacity
          onPress={() => (isBack ? this.props.navigation.goBack() : null)}
          style={styles.circleP}
        >
          {isBack && (
            <View style={styles.circleInner}>
              <Feather name="arrow-left" size={25} />
            </View>
          )}
          <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
        {isRight && (
          <View>
            <TouchableOpacity onPress={rightClick} style={styles.circle}>
              {image != undefined ? (
                <Image
                  source={image}
                  style={styles.imageC}
                  resizeMode="contain"
                />
              ) : (
                <Feather name={icon} color={_C.yellow} size={22} />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
HeaderBack.defaultProps = {
  isBack: true,
  title: "Title",
  isRight: false,
  icon: "question",
  image: null,
  rightClick: {}
};
export default HeaderBack;

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
  circleInner: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    backgroundColor: _C.yellow,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    backgroundColor: _C.bBG,
    height: 40,
    width: 40,
    borderRadius: 40 / 2
  },
  circleP: {
    backgroundColor: _C.bBG,
    width: "auto",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  imageC: {
    height: 20,
    width: 20
  }
});
