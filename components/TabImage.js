import * as React from "react";
import { Image, View, Text } from "react-native";
import { _C } from "../constants/Colors";
export default TabImage = ({ image, imageF, focused, title }) => (
  <View
    style={{
      height: 40,
      position: "relative",
      padding: 5,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {title === "Profile" ? (
      <Image
        resizeMode="cover"
        style={{
          height: 30,
          width: 30,
          borderRadius: 15,
          borderColor: focused ? _C.yellow : "#fff",
          borderWidth: 2,
        }}
        source={require("../assets/images/user.png")}
      />
    ) : (
      <Image
        resizeMode="contain"
        style={{ height: 30, width: 30 }}
        source={focused ? image : imageF}
      />
    )}
    {title && (
      <Text
        style={{
          color: focused ? _C.yellow : "#fff",
          fontSize: 14,
          marginTop: 3,
        }}
      >
        {title}
      </Text>
    )}
  </View>
);
