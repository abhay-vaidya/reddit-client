import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import ImageModal from "./ImageModal";
import Post from "./Post";
import withTheme from "../utils/Theme";

class PostList extends React.Component {
  state = {
    modalVisible: false
  };

  _keyExtractor = item => item.id;

  _renderEmptyListPlaceholder = styles => {
    return (
      <Text style={styles.emptyListText}>
        {`Hmm... there's nothing here. 🧐\nTry another subreddit!`}
      </Text>
    );
  };

  _renderPostDivider = styles => () => <Divider style={styles.divider} />;

  toggleModal = url => {
    this.setState(prevState => {
      return { imageUrl: url, modalVisible: !prevState.modalVisible };
    });
  };

  renderPost = ({ item }) => (
    <Post
      imageModalToggler={this.toggleModal}
      isGenericSubreddit={this.props.isGenericSubreddit}
      {...item}
    />
  );

  render() {
    const {
      posts,
      loading,
      handleRefresh,
      searchComponent,
      handleEndReached,
      theme
    } = this.props;

    const { modalVisible, imageUrl } = this.state;
    const styles = getStyles(theme);
    const emptyListPlaceholder = this._renderEmptyListPlaceholder(styles);

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
          ItemSeparatorComponent={this._renderPostDivider(styles)}
          onEndReached={handleEndReached}
        />
      </View>
    );
  }
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryBg
    },
    search: {
      height: 40,
      margin: 10,
      backgroundColor: theme.secondaryBg,
      borderRadius: 5,
      padding: 10
    },
    emptyListText: {
      textAlign: "center",
      fontSize: 16
    },
    divider: {
      backgroundColor: theme.secondaryBg
    }
  });

export default withTheme(PostList);
