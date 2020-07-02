import * as React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabImage from "../components/TabImage";
import HomeScreen from "../screens/HomeScreen";
import PaymentScreen from "../screens/PaymentScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";
export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: "#000",
          alignItems: "center",
          height: 80
        },
        tabStyle: {
          height: 80
        }
      }}
      initialRouteName={INITIAL_ROUTE_NAME}
      keyboardHidesTabBar={true}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: () => null,
          tabBarIcon: ({ focused }) => (
            <TabImage
              focused={focused}
              title="Home"
              image={require("../assets/images/tabs/activeHome.png")}
              imageF={require("../assets/images/tabs/Home.png")}
            />
          )
        }}
      />
      <BottomTab.Screen
        name="Payments"
        component={PaymentScreen}
        options={{
          title: () => null,
          tabBarIcon: ({ focused }) => (
            <TabImage
              focused={focused}
              title="Payments"
              image={require("../assets/images/tabs/activePayments.png")}
              imageF={require("../assets/images/tabs/Payments.png")}
            />
          )
        }}
      />
      <BottomTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: () => null,
          tabBarIcon: ({ focused }) => (
            <TabImage
              focused={focused}
              title="Notification"
              image={require("../assets/images/tabs/activeNotification.png")}
              imageF={require("../assets/images/tabs/Notification.png")}
            />
          )
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: () => null,
          tabBarIcon: ({ focused }) => (
            <TabImage
              focused={focused}
              title="Profile"
              image={{ uri: "https://i.imgur.com/kq8NisK.png" }}
              imageF={{ uri: "https://i.imgur.com/kq8NisK.png" }}
            />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}
// 78 63
function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "How to get started";
    case "Links":
      return "Links to learn more";
  }
}
