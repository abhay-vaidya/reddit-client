import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import Post from "./Post";
import ImageModal from "./ImageModal";
import Colors from "../constants/Colors";

export default class PostList extends React.Component {
  state = {
    modalVisible: false
  };

  toggleModal = url => {
    this.setState(prevState => {
      return { imageUrl: url, modalVisible: !prevState.modalVisible };
    });
  };

  _keyExtractor = (item, index) => item.id + index;

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
          keyExtractor={this._keyExtractor}
          renderItem={this.renderPost}
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
  search: {
    height: 40,
    margin: 10,
    backgroundColor: Colors.paleGrey,
    borderRadius: 5,
    padding: 10
  }
});
