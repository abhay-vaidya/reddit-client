import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Layout from "../constants/Layout";
import { Divider } from "react-native-elements";
import HTML from "react-native-render-html";
import Colors from "../constants/Colors";
import { decode } from "he";

export default ({ navigation }) => {
  const {
    title,
    author,
    score,
    numComments,
    subreddit,
    selftext
  } = navigation.getParam("props", {});

  navigateToContent = (_, href) => {
    navigation.navigate("LinkContent", { uri: href });
  };

  return (
    <ScrollView>
      <View style={styles.postContainer}>
        <View style={styles.postTextContainer}>
          <Text style={styles.postTitle}>{title}</Text>
          <Text style={styles.postAuthor}>{author}</Text>
          {selftext && (
            <HTML
              html={decode(selftext)}
              onLinkPress={navigateToContent}
              imagesMaxWidth={Layout.window.width}
            />
          )}
          <Divider style={styles.divider} />
          <View style={styles.secondaryInfoContainer}>
            <Text style={styles.postInfo}>{`r/${subreddit}`}</Text>
            <Text style={styles.postInfo}>↑ {score}</Text>
            <Text style={styles.postInfo}>{numComments} Comments</Text>
          </View>
          <Divider style={styles.divider} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    margin: 10
  },
  postTextContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  divider: {
    marginVertical: 10
  },
  secondaryInfoContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "flex-end",
    flexDirection: "row"
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 6
  },
  postAuthor: {
    color: Colors.secondaryText,
    fontSize: 16,
    marginBottom: 10
  },
  postInfo: {
    marginRight: 10,
    fontSize: 18
  }
});
