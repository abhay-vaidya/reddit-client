import React from "react";
import { default as BaseHTML } from "react-native-render-html";
import Layout from "../constants/Layout";
import withTheme from "../utils/Theme";
import { withNavigation } from "react-navigation";
import { decode } from "he";

const _navigateToContent = navigation => (_, href) => {
  navigation.navigate("LinkContent", { uri: href });
};

const HTML = ({ theme, html, navigation }) => {
  return (
    <BaseHTML
      html={decode(html)}
      baseFontStyle={{ color: theme.primaryText }}
      tagsStyles={{ a: { color: theme.externalLink } }}
      onLinkPress={_navigateToContent(navigation)}
      imagesMaxWidth={Layout.window.width}
    />
  );
};

export default withNavigation(withTheme(HTML));
