import { light, dark } from "../constants/Colours";
import Defaults from "../constants/Defaults";

// Constants
export const TOGGLE_THEME = "reddit-client/global/THEME";

// Reducer
export default function reducer(
  state = {
    isDark: Defaults.isDark,
    theme: Defaults.theme
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
