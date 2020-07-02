import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import HeaderBack from "../components/Header/HeaderBack";
import { BackGround } from "../components/Images";
import CirclesList from "../components/CirclesList";
import { defaultStyles, width, height } from "../constants";
import { _C } from "../constants/Colors";
import { connect } from "react-redux";
import { toNumber } from "../utils/index";
import { joinCircle } from "../store/actions/circlesActions";
import { getUser } from "../store/actions/authActions";
class ViewCircle extends Component {
  render() {
    const { route, auth } = this.props;
    const { data } = route.params;
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: "flex-start",
          },
        ]}
      >
        <BackGround />
        <HeaderBack isRight={false} title="Circle" {...this.props} />
        <View style={{ height: height }}>
          <View style={styles.priceBox}>
            <Text style={styles.priceText}>Circle Value</Text>
            <Text style={styles.priceTextP}>
              {toNumber(data.c_amount ? data.c_amount : 0)}
              <Text style={styles.priceTextY}> EGP</Text>
            </Text>
          </View>
          <View style={[styles.alCenter, { paddingVertical: 30 }]}>
            <CirclesList
              size={width - 100}
              symbolSize={50}
              items={data.c_users}
              data={data}
              members={data.members}
              onCircleJoin={(data) => this.handleCircleJoin(data)}
            />
          </View>
          {auth.account && auth.account.isCnicVerified == 0 ? (
            <View style={styles.boxP}>
              <Text style={styles.title}>National ID Required</Text>
              <Text style={[styles.text]}>
                To join this circle you need to have verified National ID.
              </Text>
              <Text style={[styles.text]}>
                Capture your National ID to be verified
              </Text>
              <View style={[styles.row, styles.btnG]}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("UploadCnic", {
                      type: "take",
                    })
                  }
                  style={[styles.button, styles.customizeBtn]}
                >
                  <Text style={styles.buttonText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("UploadCnic", {
                      type: "upload",
                    })
                  }
                  style={[styles.button, styles.customizeBtn]}
                >
                  <Text style={styles.buttonText}>Upload Photo</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
  async componentDidMount() {
    await this.props.getUser();
  }
  handleCircleJoin = async (data) => {
    if (!this.props.auth.account.isCnicVerified) {
      alert("Cnic Is Required To Join Circles");
      return false;
    }
    var data = await this.props.joinCircle(data.c_id);
  };
}
const mapStateToProps = (state) => state;
const mapDispatchToProps = { joinCircle, getUser };
export default connect(mapStateToProps, mapDispatchToProps)(ViewCircle);

const styles = StyleSheet.create({
  ...defaultStyles,
  priceBox: {
    backgroundColor: _C.bBG,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 30,
    color: _C.text,
  },
  priceTextY: {
    color: _C.yellow,
  },
  priceTextP: {
    fontSize: 45,
    color: _C.text,
  },
  boxP: {
    height: 250,
    width: width - 20,
    backgroundColor: _C.bBG,
    position: "absolute",
    bottom: 105,
    left: -40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  customizeBtn: {
    width: 160,
    paddingHorizontal: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  btnG: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: _C.text,
    fontSize: 18,
    textAlign: "center",
    marginVertical: 5,
  },
  title: {
    color: _C.yellow,
    fontSize: 30,
    textAlign: "center",
    marginVertical: 10,
  },
});
