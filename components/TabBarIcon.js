import React from "react";
import { Icon } from "expo";
import withTheme from "../utils/Theme";

class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={
          this.props.focused
            ? this.props.theme.primary
            : this.props.theme.secondaryBg
        }
      />
    );
  }
}

export default withTheme(TabBarIcon);
