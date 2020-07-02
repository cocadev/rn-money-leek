import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import headerIcon from "../assets/images/paymentSettings.png";
import HeaderBack from "../components/Header/HeaderBack";
import { BackGround } from "../components/Images";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { defaultStyles } from "../constants";
import { _C } from "../constants/Colors";
const tab1Boxes = [
  {
    title: "Cash Collection",
    text: "Not Used",
    image: require("../assets/images/payment/money.png")
  },
  {
    title: "Credit Collection",
    text: "Not Used",
    image: require("../assets/images/payment/creditCard.png")
  }
];
const tab2Boxes = [
  {
    title: "Cash Collection",
    text: "Not Used",
    image: require("../assets/images/payment/money-red.png")
  },
  {
    title: "Bank Transfer",
    text: "Not Used",
    image: require("../assets/images/payment/bank.png")
  }
];
const FirstRoute = () => (
  <View style={[styles.scene, styles.mt40]}>
    {tab1Boxes.map((obj, key) => (
      <TouchableOpacity key={key}>
        <BoxPayment {...obj} color={_C.yellow} />
      </TouchableOpacity>
    ))}
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, styles.mt40]}>
    {tab2Boxes.map((obj, key) => (
      <TouchableOpacity key={key}>
        <BoxPayment {...obj} color={_C.red} />
      </TouchableOpacity>
    ))}
  </View>
);
const BoxPayment = ({ image, title, text, color }) => {
  return (
    <View style={[styles.payBoxP, { borderColor: color }]}>
      <View style={[styles.circleP, { borderColor: color }]}>
        <View style={styles.circle}>
          <Image
            source={image}
            style={styles.circleIcon}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.column}>
        <Text style={styles.title}>{title}</Text>
        <Text style={{ color: color }}>{text}</Text>
      </View>
    </View>
  );
};
const initialLayout = { width: Dimensions.get("window").width };

class PaymentSettings extends Component {
  render() {
    const { routes, index } = this.state;
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute
    });
    return (
      <View style={[styles.container, { justifyContent: "flex-start" }]}>
        <BackGround />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.fixed, styles.scrollView]}
        >
          <HeaderBack
            isRight={false}
            image={headerIcon}
            title="Payment Settings"
            {...this.props}
          />
          <View style={[styles.cPadding]}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={val => this.setState({ index: val })}
              renderTabBar={props => (
                <TabBar
                  {...props}
                  renderLabel={({ route, focused, color }, key) => (
                    <View
                      style={[styles.tabBarStyles, focused && styles.activeBg]}
                    >
                      <Text style={{ color: focused ? _C.black : _C.white }}>
                        {route.title}
                      </Text>
                    </View>
                  )}
                  style={styles.transparentBack}
                  indicatorStyle={styles.transparentBack}
                />
              )}
              initialLayout={initialLayout}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
  constructor() {
    super();
    this.state = {
      routes: [
        { key: "first", title: "Pay In Method" },
        { key: "second", title: "Pay Out Method" }
      ],
      index: 0
    };
  }
}
export default PaymentSettings;
const circleC = 60;
const circleH = circleC / 2;
const styles = StyleSheet.create({
  ...defaultStyles,
  scene: {
    flex: 1,
    paddingHorizontal: circleH
  },
  transparentBack: {
    backgroundColor: "transparent"
  },
  tabBarStyles: {
    backgroundColor: _C.bBG,
    paddingHorizontal: 15,
    borderRadius: 40,
    paddingVertical: 10
  },
  activeBg: {
    backgroundColor: _C.yellow
  },
  mt40: {
    marginTop: 40
  },
  payBoxP: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    backgroundColor: _C.bBG,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: _C.yellow,
    paddingLeft: 50,
    marginBottom: 25
  },
  circleP: {
    height: circleC,
    width: circleC,
    borderRadius: circleH,
    backgroundColor: _C.bBG,
    borderColor: _C.yellow,
    borderWidth: 2,
    position: "absolute",
    left: -circleH,
    alignItems: "center",
    justifyContent: "center"
  },
  circleIcon: {
    height: circleC - 20,
    width: circleC - 20
  }
});
