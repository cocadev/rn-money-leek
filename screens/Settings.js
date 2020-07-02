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
import { Switch } from "native-base";
export class Settings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BackGround />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.fixed, styles.scrollView]}
        >
          <HeaderBack isRight={false} {...this.props} title="Settings" />
          <View style={styles.parent}>
            <View style={styles.list}>
              <Text style={styles.text}>Version</Text>
              <Text style={styles.text}>1.0.1</Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.text}>Language</Text>
              <View style={[styles.alignCenter]}>
                <Text style={styles.text}>English</Text>
                <Switch
                  value={this.state.language}
                  onChange={() =>
                    this.setState({ language: !this.state.language })
                  }
                  style={styles.switch}
                  ios_backgroundColor={_C.bBG}
                  trackColor={{ false: _C.bBG, true: _C.yellow }}
                  thumbColor={this.state.language ? _C.black : _C.yellow}
                />
                <Text style={[styles.text, styles.arb]}>عربى</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  constructor() {
    super();
    this.state = {
      language: false
    };
  }
}

export default Settings;
const styles = StyleSheet.create({
  ...defaultStyles,
  parent: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  parent: {
    flex: 1
  },
  alignCenter: {
    flexDirection: "row",
    alignItems: "center"
  },
  arb: {
    position: "relative",
    top: -5
  },
  switch: {
    marginHorizontal: 10
  }
});
