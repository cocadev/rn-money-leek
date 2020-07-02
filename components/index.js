import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { defaultStyles, width } from "../constants";
import { CheckBox } from "native-base";
import { _C } from "../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { toNumber } from "../utils";
import { navigate } from "../store/services/navigator";
const InputBox = (props) => {
  return (
    <View style={props.style}>
      <View style={[styles.bgP]}>
        <View style={styles.inputLeft}>
          <Text style={[styles.label, styles.textM]}>{props.label}</Text>
        </View>
        <TextInput
          {...props}
          placeholderTextColor="#48484a"
          style={[
            styles.InputBox,
            props.width !== undefined ? props.width : {},
          ]}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};

const Radio = (props) => {
  return (
    <View style={props.style}>
      <View style={[styles.bgP]}>
        <View style={styles.inputLeft}>
          <Text style={[styles.label, styles.textM]}>{props.label}</Text>
        </View>
        <View style={[styles.row, styles.mv10, { width: "100%" }]}>
          {props.radios !== undefined &&
            props.radios !== null &&
            props.radios.map((obj, key) => {
              return (
                <TouchableOpacity
                  onPress={() => props.handleChange(obj)}
                  style={styles.row}
                  key={key}
                >
                  <CheckBox
                    color="#fff"
                    backgroundColor="#fff"
                    borderColor="#fff"
                    checked={props.active == obj ? true : false}
                    onPress={() => props.handleChange(obj)}
                  />
                  <Text style={[styles.label, styles.mL20]}>{obj}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    </View>
  );
};

const MTab = ({ tabs, active }) => {
  return (
    <View
      style={[
        {
          height: 40,
          backgroundColor: _C.bBG,
          borderRadius: 10,
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "flex-start",
          marginVertical: 10,
        },
        styles.mh20,
      ]}
    >
      {tabs.map((obj, key) => (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: width / tabs.length - 10,
            height: "100%",
            backgroundColor: key + 1 == active && _C.yellow,
          }}
          key={key}
        >
          <Text
            style={{
              color: key + 1 == active ? _C.buttonText : "#fff",
              fontSize: 14,
            }}
          >
            {obj}
          </Text>
        </View>
      ))}
    </View>
  );
};
const IconHeading = ({ image, heading }) => {
  return (
    <View style={[styles.row, { alignItems: "center", marginVertical: 15 }]}>
      <View
        style={{
          backgroundColor: _C.bBG,
          height: 40,
          width: 40,
          borderRadius: 40 / 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            height: 20,
            width: 20,
          }}
          resizeMode="contain"
          source={image}
        />
      </View>
      <Text style={[styles.mh10, styles.titleL, { color: "#fff" }]}>
        {heading}
      </Text>
    </View>
  );
};
const ACBox = ({ data, navigation }) => {
  return data && data.length > 0 ? (
    data.map((obj, key) => {
      var users = obj.c_users - obj.members.length;
      return (
        <TouchableOpacity
          onPress={() =>
            navigate("ViewCircle", { data: obj, type: "Finished" })
          }
          key={key}
          style={[styles.column, styles.mv10, styles.abP]}
        >
          <View style={styles.column}>
            <Text style={styles.bTitle}>{toNumber(obj.c_amount)} EGP</Text>
            <Text style={styles.bText}>Circle Payout</Text>
          </View>
          <View style={[styles.row, styles.bS]}>
            <View style={[styles.row]}>
              <View style={[styles.column]}>
                <Text style={styles.bTitle}>
                  {toNumber(obj.c_instalment)} EGP
                </Text>
                <Text style={styles.bText}>Per Month</Text>
              </View>
              <View style={[styles.column, styles.mh10]}>
                <Text style={styles.bTitle}>{users}</Text>
                <Text style={styles.bText}>Free Slots</Text>
              </View>
            </View>
            <View style={styles.iconBg}>
              <Feather name="search" size={22} />
            </View>
          </View>
        </TouchableOpacity>
      );
    })
  ) : (
    <NoResults text="No Active Circle Available." />
  );
};
const FCBox = ({ data, navigation, type }) => {
  return data && data.length > 0 ? (
    data.map((obj, key) => {
      var users = obj.c_users - obj.members.length;
      return (
        <View
          key={key}
          style={[
            styles.column,
            styles.mv10,
            styles.abP,
            { paddingHorizontal: 0, paddingVertical: 0 },
          ]}
        >
          <View
            style={[styles.row, styles.bS, styles.bPad, { flexWrap: "nowrap" }]}
          >
            <View style={[styles.column]}>
              <View style={styles.column}>
                <Text style={styles.bTitle}>{toNumber(obj.c_amount)} EGP</Text>
                <Text style={styles.bText}>Circle Payout</Text>
              </View>
              <View style={styles.row}>
                <View style={[styles.column]}>
                  <Text style={styles.bTitle}>
                    {toNumber(obj.c_instalment)} EGP
                  </Text>
                  <Text style={styles.bText}>Per Month</Text>
                </View>
                <View style={[styles.column, styles.mh10]}>
                  <Text style={styles.bTitle}>{users}</Text>
                  <Text style={styles.bText}>Free Slots</Text>
                </View>
              </View>
            </View>
            <View style={styles.column}>
              <View style={[styles.row, { marginBottom: 10 }]}>
                <View style={styles.iconBg}>
                  <Feather name="user" size={22} />
                </View>
                <View style={styles.iconBg}>
                  <Feather name="user" size={22} />
                </View>
                <View style={styles.iconBg}>
                  <Feather name="user" size={22} />
                </View>
              </View>
              <View style={[styles.row, { marginBottom: 10 }]}>
                <View style={styles.iconBg}>
                  <Feather name="user" size={18} />
                </View>
                <View style={styles.iconBg}>
                  <Feather name="user" size={18} />
                </View>
                <View style={styles.iconBg}>
                  <Text style={{ fontSize: 18 }}>6+</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigate("ViewCircle", { data: obj, type: "Finished" })
            }
            style={styles.vieC}
          >
            <Text style={{ color: _C.buttonText, fontSize: 20 }}>
              View Circle
            </Text>
          </TouchableOpacity>
        </View>
      );
    })
  ) : (
    <NoResults text={`No ${type ? type : "Finished"} Circle Available.`} />
  );
};
const NoResults = (props) => {
  return (
    <View style={[styles.bgP, styles.noResultsP]}>
      <Image
        style={styles.noResultsImg}
        source={require("../assets/images/noResultsY.png")}
      />
      <Text style={styles.noResultsT}>{props.text}</Text>
    </View>
  );
};
export { InputBox, Radio, MTab, IconHeading, ACBox, FCBox };
const styles = StyleSheet.create({
  ...defaultStyles,
  inputLeft: {
    width: "auto",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  abP: {
    backgroundColor: _C.bBG,
    height: "auto",
    width: "100%",
    alignContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  bTitle: {
    color: "#fff",
    fontSize: 22,
  },
  bS: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  bText: {
    color: _C.yellow,
    fontSize: 14,
  },
  iconBg: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: _C.yellow,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  bPad: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 5,
  },
  vieC: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: _C.yellow,
  },
  noResultsP: {
    width: "100%",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  noResultsImg: {
    height: 80,
    width: 80,
    marginBottom: 10,
    marginTop: 20,
  },
  noResultsT: {
    fontSize: 22,
    color: _C.yellow,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
