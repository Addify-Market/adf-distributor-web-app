import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import thunk from "redux-thunk";
const init = {
  keyword: "",
  role: "",
  user: false,
  addons: [],
  addon: { fetching: false, fetched: false },
  distributor: {},
  links: [],
  nft: { fetching: false, fetched: false },
  link: { fetching: false, fetched: false },
  nfts: { list: [], fetching: false, fetched: false },
  linkId:"",
  linkCreated: false
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case "SET_ADDONS":
      return {
        ...state,
        addons: action.payload
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
    case "DISTRIBUTOR_INFO":
      return {
        ...state,
        distributor: action.data
      };
    case "FETCH_ADDONS":
      return {
        ...state,
        addons: action.data
      };
    case "FETCH_LINKS":
      return {
        ...state,
        links: action.data
      };
    case "ADDON_DETAILS":
      return {
        ...state,
        addon: { ...action.data, fetching: false, fetched: true }
      };
    case "NFT_DETAILS":
      return {
        ...state,
        nft: { ...action.data, fetching: false, fetched: true }
      };
    case "WALLET_NFTS":
      return {
        ...state,
        nfts: { list: action.data, fetching: false, fetched: true }
      };
    case "LINK_CREATED":
      return {
        ...state,
        linkCreated: true
      };
      case "LINK_DETAILS":
      return {
        ...state,
        link: { ...action.data, fetching: false, fetched: true }
      };
      case "LINK_ID":
      return {
        ...state,
        linkId: action.data 
      };
      case 'UPDATE_LINK_STATUS':
        const { status, value } = action.data;
          // field_name can be first_name, last_name, phone_number
        console.log('status',state,"value",value)
        const newState = Object.assign(state, { [status]: value });
          // Update new state as desired
        return {
          ...state,
          link: newState
        };
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["distributor", "user", "role"]
};

const persistedReducer = persistReducer(persistConfig, reducer);
const enhancers = [applyMiddleware(thunk)];
const store = createStore(persistedReducer, undefined, compose(...enhancers));

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
