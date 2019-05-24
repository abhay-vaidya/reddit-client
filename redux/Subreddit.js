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

export const GET_POST_COMMENTS = "reddit-client/comments/LOAD";
export const GET_POST_COMMENTS_SUCCESS = "reddit-client/comments/LOAD_SUCCESS";
export const GET_POST_COMMENTS_FAIL = "reddit-client/comments/LOAD_FAIL";

// Reducer
export default function reducer(
  state = {
    subreddit: Defaults.subreddit,
    sort: Defaults.sort,
    posts: [],
    comments: [],
    loadingPosts: false,
    loadingComments: false
  },
  action
) {
  switch (action.type) {
    case SET_SUBREDDIT:
      return { ...state, subreddit: action.subreddit };
    case GET_POST_COMMENTS:
    case GET_SUBREDDIT_POSTS:
      return { ...state, loadingPosts: true };
    case GET_SUBREDDIT_POSTS_SUCCESS:
      return {
        ...state,
        loadingComments: false,
        loadingPosts: false,
        posts: action.payload.data.data.children
      };
    case GET_NEXT_SUBREDDIT_POSTS_SUCCESS:
      return {
        ...state,
        loadingComments: false,
        loadingPosts: false,
        posts: [...state.posts, ...action.payload.data.data.children]
      };
    case GET_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        loadingPosts: false,
        loadingComments: false,
        comments: action.payload.data[1].data.children
      };
    case GET_POST_COMMENTS_FAIL:
    case GET_SUBREDDIT_POSTS_FAIL:
    case GET_NEXT_SUBREDDIT_POSTS_FAIL:
      return {
        ...state,
        loadingPosts: false,
        loadingComments: false,
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

export function getNextSubredditPosts(subreddit, sort, lastPostId) {
  return {
    type: GET_NEXT_SUBREDDIT_POSTS,
    payload: {
      request: {
        url: `/r/${subreddit}/${sort}.json?after=${lastPostId}`
      }
    }
  };
}

export function getPostComments(subreddit, postId) {
  return {
    type: GET_POST_COMMENTS,
    payload: {
      request: {
        url: `/r/${subreddit}/comments/${postId}.json?limit=25`
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
