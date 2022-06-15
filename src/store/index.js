import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const init = {
  keyword: "",
  role: "",
  user: false,
  addOns: []
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case "SET_ADDONS":
      return {
        ...state,
        addOns: action.payload
      };
    case "SET_KEYWORD":
      return {
        ...state,
        keyword: action.payload
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload
      };
    case "SET_ROLE":
      return {
        ...state,
        role: action.payload
      };

    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["addOns", "user", "role"]
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistore = persistStore(store);

const StateProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={"Loading..."} persistor={persistore}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export { store, StateProvider };
