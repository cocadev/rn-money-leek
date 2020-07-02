import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { BackGround, Logo, Google } from "../components/Images";
import { IconButton } from "../components/Buttons";
import { _C } from "../constants/Colors";
import { defaultStyles, height } from "../constants";
import { loginNowFb, loginNowGoogle } from "../utils/auth";
import { socialLogin } from "../store/actions/authActions";
import { connect } from "react-redux";
class LoginScreen extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <BackGround />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.fixed, styles.scrollView]}
        >
          <View
            style={[
              styles.container,
              { flex: 1, height: height },
              styles.cPadding,
            ]}
          >
            <Logo height={150} />
            <View style={styles.buttonGroup}>
              <IconButton
                onPress={() => this.handleLogin("Facebook")}
                text="Login With Facebook"
                iconName="facebook"
                backC="#3b5998"
              />
              <IconButton
                onPress={() => this.handleLogin("Google")}
                text="Login With Google"
                backC="#fff"
                image={<Google />}
              />
              <IconButton
                onPress={() => this.handleLogin("Twitter")}
                text="Login With Twitter"
                iconName="twitter"
                backC="#1C9EDA"
              />
            </View>
            <View style={[styles.bottomNote]}>
              <Feather
                style={[styles.icon, { width: 20 }]}
                name="alert-triangle"
              />
              <Text>
                Lorem Ipsum is simply dummy text of the printing and
                typesetting.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  handleLogin = async (platform) => {
    var others = {
      provider: platform,
      device_token: "623487108t268139r1476971t",
    };
    switch (platform) {
      case "Facebook":
        var data = await loginNowFb();
        if (data.access_token) {
          let finalFb = Object.assign(others, {
            token: data.data.id,
            email: data.data.email,
            name: data.data.name,
            access_token: data.access_token,
          });
          this.props.socialLogin(finalFb);
        } else {
          alert("Some Thing Went Wrong");
        }
        return false;
      case "Google":
        var data = await loginNowGoogle();
        let finalGo = Object.assign(others, {
          token: data.user.id,
          email: data.user.email,
          name: data.user.name,
          access_token: data.accessToken,
        });
        data.accessToken
          ? this.props.socialLogin(finalGo)
          : alert("Some Thing Went Wrong");
        return false;
      default:
        return {};
    }
  };
}
const mapStateToProps = (state) => state;
const mapDispatchToProps = { socialLogin };
const styles = StyleSheet.create({
  ...defaultStyles,
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
