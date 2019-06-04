import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Provider } from "react-redux";
import store from "./redux/Store";

import AppNavigator from "./navigation/AppNavigator";
import { initializeMoment } from "./utils/Formatting";
import { light, dark } from "./constants/Colours";
import { ThemeContext } from "./utils/Theme";

export default class App extends React.Component {
  state = {
    isDark: false,
    theme: light
  };

  componentDidMount() {
    initializeMoment();
  }

  _handleThemeToggle = () => {
    this.setState(({ isDark }) => ({
      theme: isDark ? light : dark,
      isDark: !isDark
    }));
  };

  render() {
    return (
      <ActionSheetProvider>
        <Provider store={store}>
          <ThemeContext.Provider value={{ theme: this.state.theme }}>
            <View style={styles.container}>
              {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
              <AppNavigator
                screenProps={{
                  theme: this.state.theme,
                  handleThemeToggle: this._handleThemeToggle
                }}
              />
            </View>
          </ThemeContext.Provider>
        </Provider>
      </ActionSheetProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
