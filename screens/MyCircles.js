import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import HeaderBack from "../components/Header/HeaderBack";
import { BackGround } from "../components/Images";
import { defaultStyles } from "../constants";
import { ACBox, FCBox } from "../components";
import { _C } from "../constants/Colors";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { connect } from "react-redux";
import { getCircles } from "../store/actions/circlesActions";
const FirstRoute = ({ data }, props) => (
  <View style={[styles.scene, styles.mt40]}>
    <ACBox {...props} data={data} />
  </View>
);

const SecondRoute = ({ data }, props) => (
  <View style={[styles.scene, styles.mt40]}>
    <FCBox {...props} type="Archived" data={data} />
  </View>
);
const initialLayout = { width: Dimensions.get("window").width };
class MyCircles extends Component {
  componentDidMount() {
    this.props.getCircles("my_active");
    this.props.getCircles("my_finished");
  }
  render() {
    const { routes, index } = this.state;
    const { myActiveCircles, myFinishedCircles } = this.props;
    const renderScene = ({ route }) => {
      switch (route.key) {
        case "first":
          return <FirstRoute {...this.props} data={myActiveCircles} />;
        case "second":
          return <SecondRoute {...this.props} data={myFinishedCircles} />;
        default:
          return null;
      }
    };
    return (
      <View style={[styles.container, { justifyContent: "flex-start" }]}>
        <BackGround />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.fixed, styles.scrollView]}
        >
          <HeaderBack isRight={false} title="My Circles" {...this.props} />
          <View style={[styles.cPadding]}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={(val) => this.setState({ index: val })}
              renderTabBar={(props) => (
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
        { key: "first", title: "Active Circles" },
        { key: "second", title: "Archive Circles" },
      ],
      index: 0,
    };
  }
}
const styles = StyleSheet.create({
  ...defaultStyles,
  scene: {
    flex: 1,
  },
  transparentBack: {
    backgroundColor: "transparent",
  },
  tabBarStyles: {
    backgroundColor: _C.bBG,
    paddingHorizontal: 15,
    borderRadius: 40,
    paddingVertical: 10,
  },
  activeBg: {
    backgroundColor: _C.yellow,
  },
  mt40: {
    marginTop: 40,
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
    marginBottom: 25,
  },
});
const mapStateToProps = (state) => state.circles;
const mapDispatchToProps = { getCircles };
export default connect(mapStateToProps, mapDispatchToProps)(MyCircles);
