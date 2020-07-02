import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import headerIcon from "../assets/images/paymentSettings.png";
import HeaderBack from "../components/Header/HeaderBack";
import { BackGround } from "../components/Images";
import { Entypo } from "@expo/vector-icons";
import { defaultStyles } from "../constants";
import { _C } from "../constants/Colors";
class PaymentScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={[styles.container, { justifyContent: "flex-start" }]}>
        <BackGround />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.fixed, styles.scrollView]}
        >
          <HeaderBack
            isRight={true}
            image={headerIcon}
            isBack={false}
            title="Payments"
            rightClick={() => navigation.navigate("PaymentSettings")}
          />
          <View style={[styles.cPadding]}>
            <View style={styles.bBHeadingP}>
              <Text style={styles.bBHeading}>Transaction History</Text>
              <View style={styles.divider} />
            </View>
            <View style={styles.mv20}>
              {this.state.paymentHistory.map((obj, key) => (
                <TouchableOpacity key={key}>
                  <PaymentBox {...obj} />
                </TouchableOpacity>
              ))}
              <View>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Load More</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  constructor() {
    super();
    this.state = {
      paymentHistory: [
        { time: "07:45 pm", date: "10-01-2020", price: "10,00", type: "" },
        { time: "09:39 am", date: "05-01-2020", price: "500", type: "-" },
        { time: "07:45 pm", date: "10-01-2020", price: "10,00", type: "" },
        { time: "09:39 am", date: "05-01-2020", price: "500", type: "-" },
        { time: "07:45 pm", date: "10-01-2020", price: "10,00", type: "" },
        { time: "09:39 am", date: "05-01-2020", price: "500", type: "-" }
      ]
    };
  }
}
const PaymentBox = ({ time, date, price, type }) => {
  return (
    <View style={styles.pBox}>
      <View style={[styles.column, { justifyContent: "center" }]}>
        <View>
          <Text style={styles.nText}>Date : {date}</Text>
        </View>
        <View>
          <Text style={styles.nText}>Time : {time}</Text>
        </View>
      </View>
      <Text style={styles.price}>{price} EGP</Text>
      <View style={styles.rate}>
        <Entypo
          style={[
            styles.rateIcon,
            {
              transform: [{ rotate: type + "90deg" }],
              color: type ? _C.red : _C.green
            }
          ]}
          name="triangle-left"
        />
      </View>
    </View>
  );
};
export default PaymentScreen;

const styles = StyleSheet.create({
  ...defaultStyles,
  bBHeadingP: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  bBHeading: {
    fontSize: 25,
    color: _C.text,
    marginBottom: 5
  },
  divider: {
    height: 2,
    width: "30%",
    backgroundColor: _C.text
  },
  pBox: {
    position: "relative",
    backgroundColor: _C.bBG,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    borderColor: _C.yellow,
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 15
  },
  price: {
    fontSize: 25,
    color: _C.text,
    fontWeight: "bold"
  },
  rate: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    backgroundColor: _C.bBG,
    borderWidth: 1,
    borderColor: _C.yellow,
    position: "absolute",
    right: -(35 / 2),
    top: "50%",
    alignItems: "center",
    justifyContent: "center"
  },
  rateIcon: {
    fontSize: 30
  }
});
