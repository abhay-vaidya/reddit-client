import React from "react";
import { light } from "../constants/Colours";
import hoistNonReactStatic from "hoist-non-react-statics";

export const ThemeContext = React.createContext(light);

export default (withTheme = Component => {
  const WrappedComponent = props => {
    return (
      <ThemeContext.Consumer>
        {state => <Component {...props} theme={state.theme} />}
      </ThemeContext.Consumer>
    );
  };

  // Copy static properties such as navigationOptions into new component
  hoistNonReactStatic(WrappedComponent, Component);
  return WrappedComponent;
});
