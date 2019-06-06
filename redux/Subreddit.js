import Defaults from "../constants/Defaults";

// -- CONSTANTS --
// Posts
export const GET_POSTS = "reddit-client/posts/LOAD";
export const GET_POSTS_SUCCESS = "reddit-client/posts/LOAD_SUCCESS";
export const GET_POSTS_FAIL = "reddit-client/posts/LOAD_FAIL";

export const GET_NEXT_POSTS = "reddit-client/posts/LOAD_NEXT";
export const GET_NEXT_POSTS_SUCCESS = "reddit-client/posts/LOAD_NEXT_SUCCESS";
export const GET_NEXT_POSTS_FAIL = "reddit-client/posts/LOAD_NEXT_FAIL";

// Comments
export const GET_COMMENTS = "reddit-client/comments/LOAD";
export const GET_COMMENTS_SUCCESS = "reddit-client/comments/LOAD_SUCCESS";
export const GET_COMMENTS_FAIL = "reddit-client/comments/LOAD_FAIL";

// -- REDUCER --
export default function reducer(
  state = {
    subreddit: Defaults.subreddit,
    sort: Defaults.sort,
    posts: [],
    comments: [],
    loadingPosts: false,
    loadingNextPosts: false,
    loadingComments: false
  },
  action
) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        subreddit: action.subreddit,
        sort: action.sort,
        loadingPosts: true,
        loadingNextPosts: false
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        loadingPosts: false,
        loadingNextPosts: false,
        posts: action.payload.data.data.children
      };
    case GET_NEXT_POSTS:
      return {
        ...state,
        loadingPosts: false,
        loadingNextPosts: true
      };
    case GET_NEXT_POSTS_SUCCESS:
      return {
        ...state,
        loadingPosts: false,
        loadingNextPosts: false,
        posts: [...state.posts, ...action.payload.data.data.children]
      };
    case GET_COMMENTS:
      return {
        ...state,
        loadingComments: true
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        loadingComments: false,
        comments: action.payload.data[1].data.children
      };
    case GET_POSTS_FAIL:
    case GET_NEXT_POSTS_FAIL:
      return {
        ...state,
        loadingPosts: false,
        loadingNextPosts: false,
        error: action.error
      };
    case GET_COMMENTS_FAIL:
      return {
        ...state,
        loadingComments: false,
        error: action.error
      };
    default:
      return state;
  }
}

// -- ACTION CREATORS --
export function getSubredditPosts(subreddit, sort, timeRange) {
  return {
    type: GET_POSTS,
    subreddit,
    sort,
    payload: {
      request: {
        url: `/r/${subreddit}/${sort}.json?${timeRange ? `t=${timeRange}` : ""}`
      }
    }
  };
}

export function getNextSubredditPosts(subreddit, sort, lastPostId, timeRange) {
  return {
    type: GET_NEXT_POSTS,
    subreddit,
    sort,
    payload: {
      request: {
        url: `/r/${subreddit}/${sort}.json?after=${lastPostId}&${
          timeRange ? `t=${timeRange}` : ""
        }`
      }
    }
  };
}

export function getPostComments(subreddit, postId) {
  return {
    type: GET_COMMENTS,
    payload: {
      request: {
        url: `/r/${subreddit}/comments/${postId}.json?showmore=false`
      }
    }
  };
}
