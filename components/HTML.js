import React from "react";
import { default as BaseHTML } from "react-native-render-html";
import Layout from "../constants/Layout";
import withTheme from "../utils/Theme";
import { WebBrowser } from "expo";
import { decode } from "he";

const navigateToContent = (_, href) => {
  WebBrowser.openBrowserAsync(href);
};

const HTML = ({ theme, html }) => {
  return (
    <BaseHTML
      html={decode(html)}
      baseFontStyle={{ color: theme.primaryText }}
      tagsStyles={{ a: { color: theme.externalLink } }}
      onLinkPress={navigateToContent}
      imagesMaxWidth={Layout.window.width}
    />
  );
};

export default withTheme(HTML);
