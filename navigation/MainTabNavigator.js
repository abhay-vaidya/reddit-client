import React from "react";
import { Platform } from "react-native";
import { Button } from "react-native-elements";
import { createStackNavigator } from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";

import store from "../redux/Store";
import { toggleTheme } from "../redux/Global";

import { light } from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import ContentScreen from "../screens/WebScreen";
import CommentsScreen from "../screens/CommentsScreen";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    LinkContent: ContentScreen,
    Comments: CommentsScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: light.primary
      },
      headerTintColor: light.accent,
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
            color: light.accent
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
