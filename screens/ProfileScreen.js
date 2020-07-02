import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { _C } from "../constants/Colors";
import { defaultStyles, width } from "../constants";
import { BackGround } from "../components/Images";
export class ProfileScreen extends Component {
  render() {
    return (
      <View style={[styles.container, { justifyContent: "flex-start" }]}>
        <BackGround />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.fixed, styles.scrollView]}
        >
          <View style={[styles.container, styles.cPadding, styles.mt40]}>
            <View style={styles.ProfileP}>
              <Image
                source={require("../assets/images/user.png")}
                style={styles.imageP}
                resizeMode="cover"
              />
              <Text style={[styles.titleP]}>Kareem</Text>
              <Text style={styles.textYP}>Joined on March 2020</Text>
            </View>
            <View style={styles.listsP}>
              {this.state.setting.map((obj, key) => (
                <ListItem {...this.props} {...obj} key={key} />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  constructor() {
    super();
    this.state = {
      setting: [
        {
          text: "My Circles",
          image: require("../assets/images/profile/Share.png"),
          route: "MyCircles",
        },
        {
          text: "Settings",
          image: require("../assets/images/profile/Tools.png"),
          route: "Settings",
        },
        {
          text: "Terms And Condition",
          image: require("../assets/images/profile/Terms.png"),
          route: "Terms",
        },
        {
          text: "Logout",
          image: require("../assets/images/profile/Logout.png"),
          route: "Logout",
        },
      ],
    };
  }
}
const ListItem = ({ image, text, route, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(route)}
      style={styles.listP}
    >
      <View style={styles.circleP}>
        <Image source={image} style={styles.imageC} resizeMode="contain" />
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  ...defaultStyles,
  ProfileP: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageP: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  titleP: {
    fontSize: 24,
    color: _C.text,
    marginTop: 20,
    marginHorizontal: 15,
  },
  textYP: {
    fontSize: 16,
    color: _C.yellow,
  },
  listsP: {
    flexDirection: "column",
    backgroundColor: _C.bBG,
    width: width - 40,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  circleP: {
    height: 40,
    width: 40,
    backgroundColor: _C.yellow,
    borderRadius: 40 / 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  imageC: {
    height: 20,
    width: 20,
  },
  listP: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
  },
  mt40: {
    marginTop: 40,
  },
});
