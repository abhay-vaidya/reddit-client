import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import Comment from "./Comment";
import withTheme from "../utils/Theme";

class CommentsList extends React.Component {
  _keyExtractor = postId => (_, index) => `${postId}-comment-${index}`;

  _getEmptyListPlaceholder = styles => {
    return <Text style={styles.emptyListText}>{`No comments!`}</Text>;
  };

  _renderComment = ({ item }) => <Comment {...item} />;

  render() {
    const { postId, comments, loadingComments, theme } = this.props;

    const styles = getStyles(theme);
    const emptyListPlaceholder = this._getEmptyListPlaceholder(styles);

    return (
      <View
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <FlatList
          data={comments}
          refreshing={loadingComments}
          keyExtractor={this._keyExtractor(postId)}
          renderItem={this._renderComment}
          ListEmptyComponent={emptyListPlaceholder}
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
    emptyListText: {
      textAlign: "center",
      fontSize: 16
    }
  });

export default withTheme(CommentsList);
