import React from "react";
import { WebView } from "react-native";

export default ({ navigation }) => {
  return (
    <WebView
      source={{ uri: navigation.getParam("url", "https://google.ca") }}
    />
  );
};
