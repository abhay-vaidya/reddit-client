import React from "react";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import { createStackNavigator } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ContentScreen from "../screens/WebScreen";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    LinkContent: ContentScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.headerBackground
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold"
      }
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
