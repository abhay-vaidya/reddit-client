import React from "react";
import { Platform } from "react-native";
import { Button } from "react-native-elements";
import { createStackNavigator } from "react-navigation";
import { TabBarIcon } from "../components";

import store from "../redux/Store";
import { toggleTheme } from "../redux/Global";

import Defaults from "../constants/Defaults";
import { HomeScreen, WebScreen, PostDetailsScreen } from "../screens";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    LinkContent: WebScreen,
    PostDetails: PostDetailsScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Defaults.theme.primary,
        borderBottomWidth: 0
      },
      headerTintColor: Defaults.theme.accent,
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerRight: (
        <Button
          type="clear"
          onPress={() => store.dispatch(toggleTheme())}
          icon={{
            name: "brightness-medium",
            size: 18,
            color: Defaults.theme.accent
          }}
        />
      )
    }
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-home` : "md-home"}
    />
  )
};

export default HomeStack;
