import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ImageModal from "./ImageModal";

import Colors from "../constants/Colors";

export default class Post extends React.Component {
  state = {
    modalVisible: false
  };

  _toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  _getThumbnail = () => {
    const { thumbnail, isImage, url } = this.props;
    const defaultThumb = <View style={styles.defaultThumb} />;

    if (!thumbnail) {
      return defaultThumb;
    }

    const image = (
      <Image
        source={{
          uri: url
        }}
        style={styles.thumbnail}
      />
    );

    return isImage ? (
      <TouchableOpacity onPress={this._toggleModal}>{image}</TouchableOpacity>
    ) : (
      image
    );
  };

  render() {
    const { title, author, score, numComments, url } = this.props;
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
            <Text style={styles.postUpvotes}>↑ {score}</Text>
            <Text style={styles.postComments}>{numComments} Comments</Text>
          </View>
        </View>
      </View>
    );
  }
}

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
  postUpvotes: {
    marginRight: 10
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
    backgroundColor: Colors.paleGrey
  }
});
