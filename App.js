import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { connect } from "react-redux";
import { Platform, StatusBar, Image } from "react-native";
import { setNavigator } from "./store/services/navigator";
import Expo, { SplashScreen } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/material";
import { StyleProvider } from "native-base";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { FontAwesome, Zocial } from "@expo/vector-icons";
import Splash from "./screens/Splash";
import PaymentSettings from "./screens/PaymentSettings";
import AuthLoading from "./screens/AuthLoading";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ViewCircle from "./screens/ViewCircle";
import VerifyNumberScreen from "./screens/OTP/VerifyNumberScreen";
import EnterOtpScreen from "./screens/OTP/EnterOtpScreen";
import Terms from "./screens/Terms";
import Settings from "./screens/Settings";
import MyCircles from "./screens/MyCircles";
import UploadCnicScreen from "./screens/UploadCnicScreen";
import Logout from "./screens/Logout";
const Stack = createStackNavigator();
const RootC = (props) => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        _loadAssetsAsync();
        SplashScreen.preventAutoHide();
        setInitialNavigationState(await getInitialState());
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);
  const nullHeader = {
    header: () => {
      null;
    },
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return <Splash />;
  } else {
    // console.warn(props);
    return (
      <StyleProvider style={getTheme(material)}>
        <NavigationContainer
          ref={(containerRef) => setNavigator(containerRef)}
          initialState={initialNavigationState}
        >
          {Platform.OS === "ios" && (
            <StatusBar barStyle="default" hidden={true} />
          )}
          <Stack.Navigator>
            <Stack.Screen
              name="AuthLoading"
              component={AuthLoading}
              options={nullHeader}
            />
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={nullHeader}
            />
            <React.Fragment>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={nullHeader}
              />
              <Stack.Screen
                name="Logout"
                component={Logout}
                options={nullHeader}
              />
              <Stack.Screen
                name="VerifyNumber"
                component={VerifyNumberScreen}
                options={nullHeader}
              />
              <Stack.Screen
                name="EnterOtp"
                component={EnterOtpScreen}
                options={nullHeader}
              />
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={nullHeader}
              />
            </React.Fragment>
            <Stack.Screen
              name="Root"
              options={nullHeader}
              component={BottomTabNavigator}
            />
            <Stack.Screen
              name="ViewCircle"
              options={nullHeader}
              component={ViewCircle}
            />
            <Stack.Screen
              name="PaymentSettings"
              component={PaymentSettings}
              options={nullHeader}
            />
            <Stack.Screen
              name="MyCircles"
              component={MyCircles}
              options={nullHeader}
            />
            <Stack.Screen name="Terms" component={Terms} options={nullHeader} />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={nullHeader}
            />
            <Stack.Screen
              name="UploadCnic"
              component={UploadCnicScreen}
              options={nullHeader}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StyleProvider>
    );
  }
};
const _loadAssetsAsync = async () => {
  const imageAssets = cacheImages([
    require("./assets/images/logo.png"),
    require("./assets/images/background.png"),
    "https://i.imgur.com/kq8NisK.png",
  ]);
  await Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });
  const fontAssets = cacheFonts([FontAwesome.font, Zocial.font]);
  await Promise.all([...imageAssets, ...fontAssets]);
};
function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}
const mapStateToProps = (state) => {
  return { ...state };
};
const Root = connect(mapStateToProps)(RootC);
export default App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Root />
    </PersistGate>
  </Provider>
);
