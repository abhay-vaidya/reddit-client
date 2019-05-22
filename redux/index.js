import GlobalReducer from "./Global";
import SubredditReducer from "./Subreddit";
import { combineReducers } from "redux";

export default combineReducers({
  global: GlobalReducer,
  subreddit: SubredditReducer
});
