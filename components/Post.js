import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Image } from "react-native-elements";
import { withNavigation } from "react-navigation";
import ImageModal from "./ImageModal";

import Colors from "../constants/Colors";

class Post extends React.PureComponent {
  state = {
    modalVisible: false
  };

  _toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  _getThumbnail = () => {
    const { thumbnail, postType, navigation, url } = this.props;

    const navigateToContent = () => navigation.navigate("LinkContent", { url });

    /* If there is no thumbnail return a default one with icon
       depending on if the type is a link or self post
    */
    const defaultThumb = (
      <TouchableOpacity onPress={navigateToContent}>
        <View style={styles.defaultThumb}>
          <Icon
            name={postType === "self" ? "subject" : "link"}
            color={Colors.grey}
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
      postType === "pic" ? this._toggleModal : navigateToContent;

    return (
      <TouchableOpacity onPress={thumbailPressHandler}>
        {imageThumb}
      </TouchableOpacity>
    );
  };

  render() {
    const { title, author, score, numComments, url, subreddit } = this.props;
    const { modalVisible } = this.state;
    const thumbnailMarkup = this._getThumbnail();

    return (
      <View style={styles.postContainer}>
        <ImageModal
          modalVisible={modalVisible}
          toggleModal={this._toggleModal}
          url={url}
        />
        {thumbnailMarkup}

        <View style={styles.postTextContainer}>
          <View>
            <Text style={styles.postTitle}>{title}</Text>
            <Text style={styles.postAuthor}>{author}</Text>
          </View>
          <View style={styles.secondaryInfoContainer}>
            <Text style={styles.postInfo}>{subreddit}</Text>
            <Text style={styles.postInfo}>↑ {score}</Text>
            <Text style={styles.postInfo}>{numComments} Comments</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigation(Post);

const styles = StyleSheet.create({
  imageModal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.9)"
  },
  closeButton: {
    marginBottom: 20,
    alignSelf: "flex-end"
  },
  postContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    margin: 10,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowColor: "black",
    shadowOffset: { height: 2, width: 0 },
    borderRadius: 10
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
    color: Colors.grey,
    fontSize: 12
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
    backgroundColor: Colors.paleGrey
  }
});
