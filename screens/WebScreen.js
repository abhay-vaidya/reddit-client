import React from "react";
import { WebView } from "react-native";
import { Loading } from "../components";

const _getLoadingComponent = () => {
  return <Loading />;
};

export default ({ navigation }) => {
  return (
    <WebView
      startInLoadingState={true}
      source={{ uri: navigation.state.params.uri }}
      renderLoading={_getLoadingComponent}
    />
  );
};
