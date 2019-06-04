import React from "react";
import { Icon } from "expo";
import withTheme from "../utils/Theme";

const TabBarIcon = ({ theme, name, focused }) => {
  return (
    <Icon.Ionicons
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? theme.primary : theme.secondaryBg}
    />
  );
};

export default withTheme(TabBarIcon);
