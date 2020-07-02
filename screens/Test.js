import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import SocketIOClient from "socket.io-client";

export default class Play extends React.Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient("http://localhost:8000"); // replace 'environment.serverUrl' with your server url
    this.socket.emit("channel1", "Hi server"); // emits 'hi server' to your server

    // Listens to channel2 and display the data recieved
    this.socket.on("channel2", data => {
      console.log("Data recieved from server", data); //this will console 'channel 2'
    });
  }
  clicked = () => {
    const dataObj = {
      action: "click"
    };
    this.socket.emit("channel2", dataObj);
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> Socket.io with react native </Text>
        <TouchableOpacity onPress={() => this.clicked()}>
          <Text>Click</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
