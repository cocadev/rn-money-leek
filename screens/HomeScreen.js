import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Search from "../components/Header/Search";
import { BackGround } from "../components/Images";
import { defaultStyles, height } from "../constants";
import { MTab, IconHeading, ACBox, FCBox } from "../components";
import { _C } from "../constants/Colors";
import { connect } from "react-redux";
import { getCircles } from "../store/actions/circlesActions";
class HomeScreen extends Component {
  async componentDidMount() {
    this.props.getCircles("active");
    this.props.getCircles("finished");
  }
  render() {
    const { activeCircles, finishedCircles } = this.props;
    return (
      <View style={[styles.container, { justifyContent: "flex-start" }]}>
        <BackGround />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.fixed, styles.scrollView]}
        >
          <Search />
          <MTab
            tabs={["Duration", "5 Months", "7 Months", "10 Months"]}
            active={2}
          />
          <MTab
            tabs={["Amount", "5000 EGP", "10,000 EGP", "15,000 EGP"]}
            active={2}
          />
          <View
            style={[
              styles.container,
              styles.mv20,
              { alignItems: "flex-start" },
            ]}
          >
            <IconHeading
              heading="Available Circles"
              image={require("../assets/images/available.png")}
            />
            <ACBox {...this.props} data={activeCircles} />
            <IconHeading
              heading="Finished Circles"
              image={require("../assets/images/finished.png")}
            />
            <FCBox {...this.props} data={finishedCircles} />
          </View>
        </ScrollView>
      </View>
    );
  }
  constructor() {
    super();
    this.state = {
      availableC: [
        { cPay: "7,000", perM: "1,000", freeS: 10 },
        { cPay: "7,000", perM: "1,000", freeS: 10 },
      ],
    };
  }
}
const styles = StyleSheet.create({
  ...defaultStyles,
});
const mapStateToProps = (state) => state.circles;
const mapDispatchToProps = { getCircles };
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
