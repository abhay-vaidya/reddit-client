import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Provider } from "react-redux";
import store from "./redux/Store";

import AppNavigator from "./navigation/AppNavigator";

export default class App extends React.Component {
  render() {
    return (
      <ActionSheetProvider>
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
            <AppNavigator />
          </View>
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
