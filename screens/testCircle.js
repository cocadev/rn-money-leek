import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "react-native-circular-action-menu";
import Icon from "react-native-vector-icons/Ionicons";

class ViewCircle extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <ActionButton
            endDegree={600}
            startDegree={270}
            // endDegree={600}
            // startDegree={270}
            buttonColor="rgba(231,76,60,1)"
            active={true}
          >
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="New Task"
              onPress={() => console.log("notes tapped!")}
              active={true}
            >
              <Text>1</Text>
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="New Task"
              onPress={() => console.log("notes tapped!")}
              active={true}
            >
              <Text>2</Text>
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="New Task"
              onPress={() => console.log("notes tapped!")}
              active={true}
            >
              <Text>3</Text>
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="New Task"
              onPress={() => console.log("notes tapped!")}
              active={true}
            >
              <Text>4</Text>
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="New Task"
              onPress={() => console.log("notes tapped!")}
              active={true}
            >
              <Text>5</Text>
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="New Task"
              onPress={() => console.log("notes tapped!")}
              active={true}
            >
              <Text>6</Text>
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="New Task"
              onPress={() => console.log("notes tapped!")}
              active={true}
            >
              <Text>7</Text>
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="New Task"
              onPress={() => console.log("notes tapped!")}
              active={true}
            >
              <Text>8</Text>
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="New Task"
              onPress={() => console.log("notes tapped!")}
              active={true}
            >
              <Text>9</Text>
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="New Task"
              onPress={() => console.log("notes tapped!")}
              active={true}
            >
              <Text>10</Text>
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="New Task"
              onPress={() => console.log("notes tapped!")}
              active={true}
            >
              <Text>11</Text>
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="New Task"
              onPress={() => console.log("notes tapped!")}
              active={true}
            >
              <Text>12</Text>
            </ActionButton.Item>
          </ActionButton>
        </View>
      </View>
    );
  }
  constructor(props) {
    super(props);
  }
}
export default ViewCircle;
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
