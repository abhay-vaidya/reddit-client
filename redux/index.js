import SubredditReducer from "./Subreddit";
import { combineReducers } from "redux";

export default combineReducers({
  subreddit: SubredditReducer
});
