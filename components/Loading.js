import React from "react";
import { View, ActivityIndicator } from "react-native";
import withTheme from "../utils/Theme";

const Loading = ({ theme }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.primaryBg,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <ActivityIndicator />
    </View>
  );
};

export default withTheme(Loading);
