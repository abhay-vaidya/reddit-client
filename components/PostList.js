import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import Post from "./Post";
import Colors from "../constants/Colors";

const _keyExtractor = (item, index) => item.id + index;

export default ({
  posts,
  loading,
  handleRefresh,
  searchComponent,
  handleEndReached
}) => {
  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <FlatList
        data={posts}
        refreshing={loading}
        onRefresh={handleRefresh}
        keyExtractor={_keyExtractor}
        renderItem={({ item }) => <Post {...item} />}
        ListHeaderComponent={searchComponent}
        onEndReached={handleEndReached}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {},
  search: {
    height: 40,
    margin: 10,
    backgroundColor: Colors.paleGrey,
    borderRadius: 5,
    padding: 10
  },
  imageModal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "rgba(0,0,0,0.9)"
  },
  closeButton: {
    marginBottom: 20,
    alignSelf: "flex-end"
  }
});
