import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { _C } from "../constants/Colors";
import defaultStyles from "../constants/index";
export default function CirclesList(props) {
  const { size, symbolSize } = props;
  const circles = [];
  function itemPlace(size, symbolSize, items, index) {
    var deg = (360 / items) * index;
    const angleRad = degToRad(deg);
    const radius = size / 2;
    const center = radius;
    const x = radius * Math.cos(angleRad) + center - symbolSize / 2;
    const y = radius * Math.sin(angleRad) + center - symbolSize / 2;
    return { x: x, y: y };
  }
  for (let i = 0; i < props.items; i++) {
    var place = itemPlace(size, symbolSize, props.items, i);
    circles.push(
      <View
        key={i}
        style={[
          s.symbol,
          {
            width: symbolSize,
            height: symbolSize,
            borderRadius: symbolSize / 2,
            left: place.x,
            top: place.y,
          },
        ]}
      >
        {props.members[i] ? (
          <TouchableOpacity>
            <Feather name="user" size={22} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => props.onCircleJoin(props.data)}>
            <Feather name="search" size={22} />
          </TouchableOpacity>
        )}
        <Text
          style={{
            position: "absolute",
            bottom: -20,
            fontSize: 18,
            color: "#fff",
          }}
        >
          {i + 1}
        </Text>
      </View>
    );
  }
  var outerCircle = symbolSize + 35;
  return (
    <View
      style={[
        s.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <View
        style={[
          s.circleIn,
          {
            width: size - outerCircle,
            height: size - outerCircle,
            borderRadius: size - outerCircle / 2,
            top: outerCircle / 2 + 8,
            left: outerCircle / 2,
          },
        ]}
      >
        <Text style={s.circleCaption}>
          Start Date: <Text style={s.month}>April</Text>
        </Text>
      </View>
      {circles}
    </View>
  );
}

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}
const s = StyleSheet.create({
  ...defaultStyles,
  circle: {
    backgroundColor: "transparent",
  },
  circleIn: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: _C.yellow,
    borderWidth: 2,
  },
  circleCaption: {
    fontSize: 25,
    color: _C.text,
  },
  symbol: {
    backgroundColor: _C.yellow,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  month: {
    color: _C.yellow,
  },
});
