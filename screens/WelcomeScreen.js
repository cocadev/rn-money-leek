import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { Logo, BackGround } from "../components/Images";
import AppIntroSlider from "react-native-app-intro-slider";
import { _C } from "../constants/Colors";
import { connect } from "react-redux";
import { welcomeDone } from "../store/actions/authActions";
const slides = [
  {
    key: "s1",
    image: <Logo style={{ height: 150 }} />,
    title: "Lorem Ipsum is simply dummy text",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    key: "s2",
    image: <Logo style={{ height: 150 }} />,
    title: "Lorem Ipsum is simply dummy text",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    key: "s3",
    image: <Logo style={{ height: 150 }} />,
    title: "Lorem Ipsum is simply dummy text",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];
class WelcomeScreen extends Component {
  _renderItem = (props) => {
    const { title, image, text } = props.item;
    return (
      <React.Fragment>
        <View style={[styles.container]}>
          {image}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </React.Fragment>
    );
  };
  onDone = () =>
    this.setState({ wizardComplete: true }, () => {
      this.props.welcomeDone();
    });
  render() {
    return (
      <React.Fragment>
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          bottomButton
          onDone={() => this.onDone()}
          activeDotStyle={{ backgroundColor: "#fff" }}
          buttonStyle={[{ justifyContent: "flex-start" }, styles.button]}
          buttonTextStyle={styles.buttonText}
        />
        <BackGround />
      </React.Fragment>
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      wizardComplete: false,
    };
  }
}
const mapStateToProps = (state) => state.auth;
const mapDispatchToProps = {
  welcomeDone,
};
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: _C.button,
    padding: 5,
    paddingHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    color: _C.buttonText,
  },
  title: {
    color: _C.title,
    fontSize: 21,
    fontWeight: "bold",
    marginVertical: 30,
    textAlign: "center",
  },
  text: {
    color: _C.text,
    fontSize: 19,
    textAlign: "center",
    paddingHorizontal: 20,
    textAlign: "center",
  },
});
