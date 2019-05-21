import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import Post from "./Post";
import ImageModal from "./ImageModal";
import Colors from "../constants/Colors";

export default class PostList extends React.Component {
  state = {
    modalVisible: false
  };

  _toggleModal = url => {
    this.setState({ imageUrl: url, modalVisible: !this.state.modalVisible });
  };

  _keyExtractor = (item, index) => item.id + index;

  _renderPost = ({ item }) => (
    <Post imageModalToggler={this._toggleModal} {...item} />
  );
  render() {
    const {
      posts,
      loading,
      handleRefresh,
      searchComponent,
      handleEndReached
    } = this.props;
    const { modalVisible, imageUrl } = this.state;
    return (
      <View
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <ImageModal
          modalVisible={modalVisible}
          toggleModal={this._toggleModal}
          url={imageUrl}
        />
        <FlatList
          data={posts}
          refreshing={loading}
          onRefresh={handleRefresh}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderPost}
          ListHeaderComponent={searchComponent}
          onEndReached={handleEndReached}
        />
      </View>
    );
  }
}

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
