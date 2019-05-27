import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import withTheme from "../utils/Theme";

const IconText = ({ iconName, title, theme, isSmall, addMargin }) => {
  const styles = getStyles(theme, isSmall, addMargin);

  return (
    <View style={styles.postInfoContainer}>
      <Icon
        name={iconName}
        color={theme.primaryText}
        iconStyle={styles.postInfoIcon}
        size={isSmall ? 12 : 16}
      />
      <Text style={styles.postInfo}>{title}</Text>
    </View>
  );
};

const getStyles = (theme, isSmall, addMargin) =>
  StyleSheet.create({
    postInfoContainer: {
      flex: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginRight: addMargin ? 10 : 0
    },
    postInfo: {
      fontSize: isSmall ? 12 : 16,
      color: theme.primaryText
    },
    postInfoIcon: {
      marginRight: 3
    }
  });

export default withTheme(IconText);
