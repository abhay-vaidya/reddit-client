import React from "react";
import { WebView } from "react-native";

export default ({ navigation }) => {
  return (
    <WebView
      source={{ uri: navigation.getParam("uri", "https://google.ca") }}
    />
  );
};
