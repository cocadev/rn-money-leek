import { CommonActions } from "@react-navigation/native";
let navigator;
export function setNavigator(nav) {
  navigator = nav;
}
export function navigate(routeName, params = {}) {
  if (navigator) {
    navigator.dispatch(
      CommonActions.navigate({
        name: routeName,
        params: params,
      })
    );
  }
}
export function goBack() {
  if (navigator) {
    navigator.dispatch(CommonActions.goBack());
  }
}
