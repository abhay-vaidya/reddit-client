import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Image } from "react-native-elements";
import { withNavigation } from "react-navigation";

import Colors from "../constants/Colors";

class Post extends React.PureComponent {
  _getThumbnail = () => {
    const {
      thumbnail,
      postType,
      navigation,
      url,
      imageModalToggler
    } = this.props;

    const navigateToContent = () =>
      navigation.navigate("LinkContent", { uri: url });

    /* If there is no thumbnail return a default one with icon
       depending on if the type is a link or self post
    */
    const defaultThumb = (
      <TouchableOpacity onPress={navigateToContent}>
        <View style={styles.defaultThumb}>
          <Icon
            name={postType === "self" ? "subject" : "link"}
            color={Colors.secondaryText}
          />
        </View>
      </TouchableOpacity>
    );

    if (!thumbnail) {
      return defaultThumb;
    }

    /* If the type is an image, toggle the modal when it's pressed, otherwise
       navigate to the webview screen
    */
    const imageThumb = (
      <Image
        source={{
          uri: thumbnail
        }}
        style={styles.thumbnail}
      />
    );

    const thumbailPressHandler =
      postType === "pic" ? () => imageModalToggler(url) : navigateToContent;

    return (
      <TouchableOpacity onPress={thumbailPressHandler}>
        {imageThumb}
      </TouchableOpacity>
    );
  };

  navigateToComments = () => {
    this.props.navigation.navigate("Comments", { props: this.props });
  };

  render() {
    const { title, author, score, numComments, subreddit } = this.props;
    const thumbnailMarkup = this._getThumbnail();

    return (
      <TouchableOpacity onPress={this.navigateToComments} activeOpacity={0.5}>
        <View style={styles.postContainer}>
          {thumbnailMarkup}

          <View style={styles.postTextContainer}>
            <View>
              <Text style={styles.postTitle}>{title}</Text>
            </View>
            <View>
              <Text style={styles.postAuthor}>{author}</Text>
              <View style={styles.secondaryInfoContainer}>
                <Text style={styles.postInfo}>{subreddit}</Text>
                <Text style={styles.postInfo}>↑ {score}</Text>
                <Text style={styles.postInfo}>{numComments} Comments</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Post);

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.primaryBg,
    padding: 16
  },
  postTextContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  secondaryInfoContainer: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row"
  },
  postTitle: {
    fontWeight: "bold",
    marginBottom: 6
  },
  postAuthor: {
    color: Colors.secondaryText,
    fontSize: 12,
    marginBottom: 3
  },
  postInfo: {
    marginRight: 10,
    fontSize: 12
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 12
  },
  defaultThumb: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 12,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondaryBg
  }
});
