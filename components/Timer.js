import React, { Component } from "react";
import { Text } from "react-native";
export default class Timer extends Component {
  render() {
    return <Text {...this.props}>{this.state.seconds}</Text>;
  }
  constructor(props) {
    super(props);
    this.state = {
      seconds: "00",
      minutes: props.time,
    };
    this.secondsRemaining;
    this.intervalHandle;
    this.handleChange = this.handleChange.bind(this);
    // method that triggers the countdown functionality
    this.startCountDown = this.startCountDown.bind(this);
    this.tick = this.tick.bind(this);
  }
  handleChange(event) {
    this.setState({
      minutes: event.target.value,
    });
  }
  tick() {
    var min = Math.floor(this.secondsRemaining / 60);
    var sec = this.secondsRemaining - min * 60;
    this.setState({
      minutes: min,
      seconds: sec,
    });
    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds,
      });
    }
    if (min < 10) {
      this.setState({
        value: "0" + min,
      });
    }
    if ((min === 0) & (sec === 0)) {
      clearInterval(this.intervalHandle);
      this.props.onFinish();
    }
    this.secondsRemaining--;
  }
  startCountDown() {
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.minutes;
    let remainingTime = time * 60;
    this.secondsRemaining = remainingTime;
  }
  componentDidMount() {
    this.startCountDown();
  }
}
