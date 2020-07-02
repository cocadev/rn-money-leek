import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { _C } from "../constants/Colors";
import { defaultStyles } from "../constants";
import { BackGround, Logo } from "../components/Images";
import HeaderBack from "../components/Header/HeaderBack";
export class Terms extends Component {
  render() {
    return (
      <View style={[styles.container, { justifyContent: "flex-start" }]}>
        <BackGround />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.fixed, styles.scrollView]}
        >
          <HeaderBack
            isRight={false}
            title="Terms And Conditions"
            {...this.props}
          />
          <View style={[styles.cPadding]}>
            {this.state.terms.map((obj, key) => (
              <Term {...obj} key={key} />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
  constructor() {
    super();
    this.state = {
      terms: [
        {
          title: "What is Lorem Ipsum?",
          text:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
          title: "What is Lorem Ipsum?",
          text:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
          title: "What is Lorem Ipsum?",
          text:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      ]
    };
  }
}
const Term = ({ title, text }) => {
  return (
    <View style={styles.termP}>
      <Text style={styles.head}>{title}</Text>
      <Text style={styles.para}>{text}</Text>
    </View>
  );
};
export default Terms;
const styles = StyleSheet.create({
  ...defaultStyles,
  termP: {
    marginVertical: 20
  },
  head: {
    color: _C.text,
    fontSize: 25,
    marginVertical: 10
  },
  para: {
    color: _C.text,
    fontSize: 16,
    marginVertical: 10
  }
});
