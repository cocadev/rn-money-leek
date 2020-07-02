import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { AsyncStorage } from "react-native";
import rootReducer from "./reducers";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "circles"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
const persistor = persistStore(store);
export { store, persistor };
