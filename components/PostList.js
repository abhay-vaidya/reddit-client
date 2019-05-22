import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import Post from "./Post";
import ImageModal from "./ImageModal";
import Colors from "../constants/Colors";

export default class PostList extends React.Component {
  state = {
    modalVisible: false
  };

  _keyExtractor = item => item.id;

  _getEmptyListPlaceholder = () => {
    return (
      <Text style={styles.emptyListText}>
        {`Hmm... there's nothing here. 🧐\nTry another subreddit!`}
      </Text>
    );
  };

  _getPostDivider = () => <Divider />;

  toggleModal = url => {
    this.setState(prevState => {
      return { imageUrl: url, modalVisible: !prevState.modalVisible };
    });
  };

  renderPost = ({ item }) => (
    <Post imageModalToggler={this.toggleModal} {...item} />
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
    const emptyListPlaceholder = this._getEmptyListPlaceholder();

    return (
      <View
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <ImageModal
          modalVisible={modalVisible}
          toggleModal={this.toggleModal}
          url={imageUrl}
        />
        <FlatList
          data={posts}
          refreshing={loading}
          onRefresh={handleRefresh}
          onEndReachedThreshold={0.5}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderPost}
          ListHeaderComponent={searchComponent}
          ListEmptyComponent={emptyListPlaceholder}
          ItemSeparatorComponent={this._getPostDivider}
          onEndReached={handleEndReached}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBg
  },
  search: {
    height: 40,
    margin: 10,
    backgroundColor: Colors.secondaryBg,
    borderRadius: 5,
    padding: 10
  },
  emptyListText: {
    textAlign: "center",
    fontSize: 16
  }
});
