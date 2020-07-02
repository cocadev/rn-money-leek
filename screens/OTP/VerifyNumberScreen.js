import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { width } from "../../constants/Layout";
import { BackGround, Logo } from "../../components/Images";
import { defaultStyles, firebaseConfig } from "../../constants";
import { Button, View } from "native-base";
import { InputBox } from "../../components";
import * as firebase from "firebase/app";
import "firebase/auth";
import { connect } from "react-redux";
import { saveOtpToken } from "../../store/actions/authActions";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseAuthApplicationVerifier,
} from "expo-firebase-recaptcha";
firebase.initializeApp(firebaseConfig);
class VerifyNumberScreen extends Component {
  render() {
    console.warn(this.props);
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled
        keyboardVerticalOffset={50}
      >
        <BackGround />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.fixed, styles.scrollView]}
        >
          <View style={styles.container}>
            <Logo style={styles.logoSm} />
            <Image
              style={[styles.mv30, { width: width - 50 }]}
              resizeMode="contain"
              source={require("../../assets/images/auth/enterPhone.png")}
            />
            <Text style={[styles.titleY, styles.titleL]}>
              Verify Your Number
            </Text>
            <Text style={styles.text}>
              This will be your primary contact method
            </Text>
            <View style={{ width: "100%" }}>
              <InputBox
                label={this.state.cca2 + this.state.phoneCode}
                keyboardType="phone-pad"
                placeholder="010001000100"
                defaultValue={this.state.phoneNumber}
                onChangeText={(phone) => this.setState({ phoneNumber: phone })}
              />
            </View>
            <Button
              onPress={() => this.onPressSendVerificationCode()}
              style={[styles.button, styles.mt80]}
            >
              <Text style={styles.buttonText}>Next</Text>
            </Button>
            <FirebaseRecaptchaVerifierModal
              ref={(ref) => (this.recaptchaVerifier = ref)}
              firebaseConfig={firebase.app().options}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  constructor() {
    super();
    this.state = {
      cca2: "EG",
      phoneCode: "+20",
      phoneNumber: "",
      verificationId: "",
    };
    recaptchaVerifier: FirebaseAuthApplicationVerifier;
  }
  onPressSendVerificationCode = async () => {
    const phoneNumber = this.state.phoneCode + this.state.phoneNumber;
    // const phoneNumber = "+17542278234";
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    await phoneProvider
      .verifyPhoneNumber(phoneNumber, this.recaptchaVerifier)
      .then((res) => {
        this.props.saveOtpToken({ token: res, phone: phoneNumber });
      })
      .catch((err) => alert(err.message));
  };
}

const styles = StyleSheet.create({
  ...defaultStyles,
});
const mapStateToProps = (state) => state.auth;
const mapDispatchToProps = { saveOtpToken };
export default connect(mapStateToProps, mapDispatchToProps)(VerifyNumberScreen);
