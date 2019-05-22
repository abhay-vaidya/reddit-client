import { light, dark } from "../constants/Colors";

// Constants
export const TOGGLE_THEME = "reddit-client/global/THEME";

// Reducer
export default function reducer(
  state = {
    isDark: false,
    theme: light
  },
  action
) {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.isDark ? light : dark,
        isDark: !state.isDark
      };
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
