import React, { Component } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { _C } from "../../constants/Colors";
import { defaultStyles, width } from "../../constants";
import { BackGround, Logo } from "../../components/Images";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { Button } from "native-base";
import { connect } from "react-redux";
import { saveOtpToken, loginNow } from "../../store/actions/authActions";
import * as firebase from "firebase/app";
import { TouchableOpacity } from "react-native-gesture-handler";
import Timer from "../../components/Timer";
const time = "0.5";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseAuthApplicationVerifier,
} from "expo-firebase-recaptcha";
export class EnterOtpScreen extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <BackGround />
        <Logo style={styles.logoSm} />
        <Image
          style={[{ width: width - 50 }]}
          resizeMode="contain"
          source={require("../../assets/images/auth/enterOtp.png")}
        />
        <View style={{ width: "100%", paddingRight: 5 }}>
          <Text style={[styles.titleY, { textAlign: "left" }]}>
            ENTER VERIFICATION CODE
          </Text>
          <View style={[styles.row, { justifyContent: "space-between" }]}>
            <Text style={[styles.text, { textAlign: "left" }]}>
              Please Check Your Mobile SMS
            </Text>
            {!this.state.timer ? (
              <TouchableOpacity onPress={() => this.resendCode()}>
                <Text style={styles.text}>Resend</Text>
              </TouchableOpacity>
            ) : (
              <Timer
                style={styles.text}
                time={this.state.timer}
                onFinish={() => this.setState({ timer: 0 })}
              />
            )}
          </View>
        </View>
        <OTPInputView
          style={[styles.bgP, { height: 70, paddingVertical: 20 }]}
          pinCount={6}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          autoFocusOnLoad={false}
          onCodeChanged={(code) => this.setState({ code: code })}
        />
        <Button
          onPress={() => this.handleOtp()}
          style={[styles.button, styles.mt20]}
          full={true}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </Button>
        <FirebaseRecaptchaVerifierModal
          ref={(ref) => (this.recaptchaVerifier = ref)}
          firebaseConfig={firebase.app().options}
        />
      </View>
    );
  }
  constructor() {
    super();
    this.state = {
      code: "",
      timer: "0.5",
    };
    recaptchaVerifier: FirebaseAuthApplicationVerifier;
  }
  handleOtp = async () => {
    const verificationCode = this.state.code;
    const verificationId = this.props.otpToken;
    if (verificationCode.length < 6) {
      return false;
    }
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    await firebase
      .auth()
      .signInWithCredential(credential)
      .then((res) => this.handleSuccess(res))
      .catch((err) => {
        if (
          err.message ==
          "The SMS code has expired. Please re-send the verification code to try again."
        ) {
          alert("The SMS code has expired.");
        } else {
          console.warn(err);
          alert("The SMS code you entered is wrong.");
        }
      });
  };
  onPressSendVerificationCode = async (phone) => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    await phoneProvider
      .verifyPhoneNumber(phone, this.recaptchaVerifier)
      .then((res) => {
        this.props.saveOtpToken({ token: res, phone: phone }, false);
      })
      .catch((err) => alert(err.message));
  };
  resendCode = async () => {
    await this.onPressSendVerificationCode(this.props.phoneNumber);
    this.setState({ timer: time });
  };
  handleSuccess = () => {
    this.props.loginNow();
  };
}
const styles = StyleSheet.create({
  ...defaultStyles,
  borderStyleBase: {
    width: 30,
    height: 40,
  },
  underlineStyleBase: {
    width: 30,
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: "#fff",
  },
});
const mapStateToProps = (state) => state.auth;
const mapDispatchToProps = { saveOtpToken, loginNow };
export default connect(mapStateToProps, mapDispatchToProps)(EnterOtpScreen);
