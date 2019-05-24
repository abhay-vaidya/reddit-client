import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { commentColours } from "../constants/Colours";
import withTheme from "../utils/Theme";

class Comment extends React.PureComponent {
  _keyExtractor = item => item.id;

  renderComment = theme => ({ item }) => <Comment {...item} theme={theme} />;

  render() {
    const { author, body, score, replies, depth, theme } = this.props;
    const styles = getStyles(theme, depth);

    return (
      <View>
        <View style={styles.commentContainer}>
          <View style={styles.secondaryInfoContainer}>
            <Text style={styles.postInfo}>{author}</Text>
            <Text style={styles.postInfo}>↑ {score}</Text>
          </View>
          <Text>{body}</Text>
        </View>
        <FlatList
          data={replies}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderComment(theme)}
        />
      </View>
    );
  }
}

const getCommentColour = depth => commentColours[depth % commentColours.length];

const getStyles = (theme, depth) =>
  StyleSheet.create({
    commentContainer: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.primaryBg,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderLeftWidth: 3,
      marginLeft: 10 * depth,
      borderLeftColor: getCommentColour(depth),
      borderBottomWidth: 1,
      borderBottomColor: theme.secondaryBg
    },
    secondaryInfoContainer: {
      flex: 1,
      flexDirection: "row"
    },
    postInfo: {
      fontWeight: "bold",
      fontSize: 12,
      marginBottom: 3,
      marginRight: 6
    }
  });

export default withTheme(Comment);
