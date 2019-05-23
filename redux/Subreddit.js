import Defaults from "../constants/Defaults";

// Constants
export const SET_SUBREDDIT = "reddit-client/subreddit/SET";
export const GET_SUBREDDIT_POSTS = "reddit-client/posts/LOAD";
export const GET_SUBREDDIT_POSTS_SUCCESS = "reddit-client/posts/LOAD_SUCCESS";
export const GET_SUBREDDIT_POSTS_FAIL = "reddit-client/posts/LOAD_FAIL";

export const GET_NEXT_SUBREDDIT_POSTS = "reddit-client/posts/LOAD_NEXT";
export const GET_NEXT_SUBREDDIT_POSTS_SUCCESS =
  "reddit-client/posts/LOAD_NEXT_SUCCESS";
export const GET_NEXT_SUBREDDIT_POSTS_FAIL =
  "reddit-client/posts/LOAD_NEXT_FAIL";

// Reducer
export default function reducer(
  state = {
    subreddit: Defaults.subreddit,
    sort: Defaults.sort,
    posts: [],
    loading: false
  },
  action
) {
  switch (action.type) {
    case SET_SUBREDDIT:
      return { ...state, subreddit: action.subreddit };
    case GET_SUBREDDIT_POSTS:
      return { ...state, loading: true };
    case GET_SUBREDDIT_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload.data.data.children
      };
    case GET_NEXT_SUBREDDIT_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.payload.data.data.children]
      };
    case GET_SUBREDDIT_POSTS_FAIL:
    case GET_NEXT_SUBREDDIT_POSTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

// Action creators
export function getSubredditPosts(subreddit, sort) {
  return {
    type: GET_SUBREDDIT_POSTS,
    payload: {
      request: {
        url: `/r/${subreddit}/${sort}.json`
      }
    }
  };
}

export function getNextSubredditPosts(subreddit, sort, lastPostName) {
  return {
    type: GET_NEXT_SUBREDDIT_POSTS,
    payload: {
      request: {
        url: `/r/${subreddit}/${sort}.json?after=${lastPostName}`
      }
    }
  };
}

export function setSubreddit(subreddit) {
  return {
    type: SET_SUBREDDIT,
    subreddit
  };
}
