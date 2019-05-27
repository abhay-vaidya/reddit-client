import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import withTheme from "../utils/Theme";

const IconText = ({
  iconName,
  title,
  theme,
  isSmall,
  addMargin,
  secondary
}) => {
  const styles = getStyles(theme, isSmall, addMargin, secondary);

  return (
    <View style={styles.postInfoContainer}>
      <Icon
        name={iconName}
        color={secondary ? theme.secondaryText : theme.primaryText}
        iconStyle={styles.postInfoIcon}
        size={isSmall ? 12 : 16}
      />
      <Text style={styles.postInfo}>{title}</Text>
    </View>
  );
};

const getStyles = (theme, isSmall, addMargin, secondary) =>
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
      color: secondary ? theme.secondaryText : theme.primaryText
    },
    postInfoIcon: {
      marginRight: 3
    }
  });

export default withTheme(IconText);
