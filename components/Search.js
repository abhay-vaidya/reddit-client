import React from "react";
import { SearchBar } from "react-native-elements";
import { StyleSheet } from "react-native";
import withTheme from "../utils/Theme";

const Search = ({ value, onSubmit, onChange, theme }) => {
  const styles = getStyles(theme);

  return (
    <SearchBar
      onSubmitEditing={onSubmit}
      onChangeText={onChange}
      value={value}
      platform="ios"
      autoCorrect={false}
      inputStyle={styles.searchInput}
      inputContainerStyle={styles.searchInputContainer}
      placeholder="Search for a subreddit..."
      containerStyle={styles.searchContainer}
    />
  );
};

const getStyles = theme =>
  StyleSheet.create({
    searchContainer: {
      backgroundColor: "transparent"
    },
    searchInputContainer: {
      backgroundColor: theme.secondaryBg
    },
    searchInput: {
      color: theme.primaryText
    }
  });

export default withTheme(Search);
