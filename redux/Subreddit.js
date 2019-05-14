// Constants
export const GET_SUBREDDIT_POSTS = "reddit-client/posts/LOAD";
export const GET_SUBREDDIT_POSTS_SUCCESS = "reddit-client/posts/LOAD_SUCCESS";
export const GET_SUBREDDIT_POSTS_FAIL = "reddit-client/posts/LOAD_FAIL";

// Reducer
export default function reducer(
  state = {
    posts: [],
    loading: false
  },
  action
) {
  switch (action.type) {
    case GET_SUBREDDIT_POSTS:
      return { ...state, loading: true };
    case GET_SUBREDDIT_POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.payload.data };
    case GET_SUBREDDIT_POSTS_FAIL:
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
