import React, { Component } from "react";
import { _C } from "../constants/Colors";
import Splash from "./Splash";
import { connect } from "react-redux";
import { Notifications } from "expo";
import { setDeviceToken } from "../store/actions/authActions";
class AuthLoading extends Component {
  async componentDidMount() {
    const notificationToken = await Notifications.getExpoPushTokenAsync();
    this.props.setDeviceToken(notificationToken);
    this.checkUser();
  }
  checkUser = () => {
    const { navigation, welcomeUser, isLoggedIn } = this.props;
    if (welcomeUser) {
      navigation.navigate("Welcome");
    } else if (!isLoggedIn) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("Root");
    }
  };
  render() {
    return <React.Fragment>{this.state.loading && <Splash />}</React.Fragment>;
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
}
const mapStateToProps = (state) => state.auth;
const mapDispatchToProps = {
  setDeviceToken,
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
