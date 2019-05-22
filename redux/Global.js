// Constants
export const TOGGLE_THEME = "reddit-client/global/THEME";

// Reducer
export default function reducer(
  state = {
    darkTheme: false
  },
  action
) {
  switch (action.type) {
    case TOGGLE_THEME:
      return { ...state, darkTheme: !state.darkTheme };
    default:
      return state;
  }
}

// Action creators
export function toggleTheme() {
  return {
    type: TOGGLE_THEME
  };
}
