import React, { Component } from "react";
import { _C } from "../constants/Colors";
import Splash from "./Splash";
import { connect } from "react-redux";
import { logout } from "../store/actions/authActions";
class Logout extends Component {
  componentDidMount() {
    this.checkUser();
  }
  checkUser = () => {
    const { logout } = this.props;
    logout();
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
  logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
