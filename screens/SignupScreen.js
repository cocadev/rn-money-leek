import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { _C } from "../constants/Colors";
import { defaultStyles } from "../constants";
import { BackGround, Logo } from "../components/Images";
import { CheckBox, Button, Item, Picker } from "native-base";
import { InputBox, Radio } from "../components";
import { connect } from "react-redux";
import { signupNow } from "../store/actions/authActions";
import { Entypo } from "@expo/vector-icons";
export class SignupScreen extends Component {
  constructor(props) {
    super(props);
    var user = props.user ? props.user : {};
    this.state = {
      access_token: user.access_token,
      social_token: user.social_token,
      provider: user.provider,
      device_token: user.device_token,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      state: user.state,
      country: user.country,
      status: user.status,
      jobName: user.jobName,
      highestIncome: user.highestIncome,
      gotLoanInPast: user.gotLoanInPast,
      anyPendingInstallment: user.anyPendingInstallment,
      privacyPolicyAccept: user.privacyPolicyAccept,
    };
  }
  render() {
    const {
      name,
      email,
      age,
      gender,
      state,
      country,
      status,
      jobName,
      highestIncome,
      gotLoanInPast,
      anyPendingInstallment,
      privacyPolicyAccept,
    } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled
        keyboardVerticalOffset={50}
      >
        <BackGround />
        <ScrollView
          style={[styles.fixed, styles.scrollView]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Logo style={styles.logoSm} />
            <Text style={styles.title}>Complete Your Profile</Text>
            <View style={styles.formStart}>
              <InputBox
                onChangeText={this.handleChange.bind(this, "name")}
                label="Name"
                value={name}
              />
              <View style={styles.row}>
                <View style={styles.c2}>
                  <InputBox
                    onChangeText={this.handleChange.bind(this, "age")}
                    style={styles.mR10}
                    label="Age"
                    value={age}
                  />
                </View>
                <View style={styles.c2}>
                  <View
                    style={[
                      styles.row,
                      styles.nowrap,
                      styles.alCenter,
                      styles.bgP,
                      { justifyContent: "space-between" },
                    ]}
                  >
                    <Text style={styles.text}>Kind</Text>
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={
                          <Entypo
                            style={{
                              transform: [{ rotate: "-90deg" }],
                              color: "#fff",
                            }}
                            name="triangle-left"
                          />
                        }
                        style={{
                          width: 100,
                          height: 39,
                          borderBottomWidth: 1,
                          borderColor: "#fff",
                          color: "#fff",
                        }}
                        placeholder="Kind"
                        placeholderStyle={{ color: "#fff" }}
                        placeholderIconColor="#fff"
                        selectedValue={gender}
                        onValueChange={this.genderChange.bind(this)}
                        textStyle={{ color: "#fff" }}
                        headerBackButtonText="Back"
                        headerStyle={{ backgroundColor: "#333" }}
                        itemStyle={{ color: "red" }}
                      >
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                        <Picker.Item label="Others" value="Others" />
                      </Picker>
                    </Item>
                  </View>
                </View>
              </View>
              <InputBox
                onChangeText={this.handleChange.bind(this, "state")}
                value={state}
                label="State"
              />
              <InputBox
                onChangeText={this.handleChange.bind(this, "country")}
                value={country}
                label="Country"
              />
              <InputBox
                onChangeText={this.handleChange.bind(this, "status")}
                value={status}
                label="Status"
              />
              <InputBox
                onChangeText={this.handleChange.bind(this, "jobName")}
                value={jobName}
                label="Job"
              />
              <InputBox
                onChangeText={this.handleChange.bind(this, "email")}
                value={email}
                label="Email"
              />
              <InputBox
                label="What's your highest income per month?"
                width={{ width: "100%", flex: 0 }}
                value={highestIncome}
                onChangeText={this.handleChange.bind(this, "highestIncome")}
                keyboardType="numeric"
              />
              <Radio
                label="Are you got loan in the past ?"
                radios={["Yes", "No"]}
                active={gotLoanInPast}
                handleChange={(val) => this.setState({ gotLoanInPast: val })}
                value={gotLoanInPast}
                onChangeText={this.handleChange.bind(this, "gotLoanInPast")}
              />
              <Radio
                label="Are you have installments for any loan company ?"
                radios={["Yes", "No"]}
                active={anyPendingInstallment}
                handleChange={(val) =>
                  this.setState({ anyPendingInstallment: val })
                }
                value={anyPendingInstallment}
                onChangeText={this.handleChange.bind(
                  this,
                  "anyPendingInstallment"
                )}
              />
              <TouchableOpacity
                onPress={() => this.handlePrivacy()}
                style={[styles.row, styles.mv20]}
              >
                <CheckBox
                  color="#fff"
                  onPress={() => this.handlePrivacy()}
                  checked={privacyPolicyAccept}
                />
                <Text style={[styles.text, styles.mt0, styles.mL20]}>
                  Yes I have accept all the
                  <Text style={[styles.textY, styles.mt0]}>
                    {" "}
                    privacy & policy
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
            <Button
              onPress={() => this.handleSignup()}
              style={[styles.button, styles.mv20]}
              full={true}
            >
              <Text style={styles.buttonText}>Verify</Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  genderChange(value) {
    this.setState({
      gender: value,
    });
  }
  handlePrivacy = () => {
    const { privacyPolicyAccept } = this.state;
    this.setState({
      privacyPolicyAccept: !privacyPolicyAccept,
    });
  };
  handleChange = (state, val) => {
    this.setState({ [state]: val });
  };
  handleSignup = () => {
    console.warn(this.state);
    this.props.signupNow(this.state);
  };
}
const styles = StyleSheet.create({
  ...defaultStyles,
});
const mapStateToProps = (state) => state.auth;
const mapDispatchToProps = { signupNow };
export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
