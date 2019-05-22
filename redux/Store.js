import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import { createStore, applyMiddleware, compose } from "redux";
import Reducer from "./";

const client = axios.create({
  baseURL: "https://www.reddit.com",
  responseType: "json"
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  Reducer,
  composeEnhancers(applyMiddleware(axiosMiddleware(client)))
);

export default store;
