import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import HTML from "./HTML";
import { withNavigation } from "react-navigation";
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
          <View style={styles.commentInnerContainer}>
            <View style={styles.secondaryInfoContainer}>
              <Text style={styles.commentAuthor}>{author}</Text>
              <Text style={styles.commentScore}>↑ {score}</Text>
            </View>
            {body && <HTML html={body} />}
          </View>
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
      backgroundColor: theme.primaryBg,
      paddingVertical: 12,
      paddingRight: 12,
      marginLeft: 10 * depth,
      borderTopWidth: 1,
      borderTopColor: theme.secondaryBg
    },
    commentInnerContainer: {
      flex: 1,
      flexDirection: "column",
      borderLeftWidth: depth > 0 ? 3 : 0,
      borderLeftColor: getCommentColour(depth),
      backgroundColor: theme.primaryBg,
      paddingLeft: 12
    },
    secondaryInfoContainer: {
      flex: 1,
      flexDirection: "row"
    },
    commentAuthor: {
      color: theme.primaryText,
      fontWeight: "bold",
      fontSize: 12,
      marginBottom: 3,
      marginRight: 6
    },
    commentScore: {
      color: theme.secondaryText,
      fontSize: 12,
      marginBottom: 3
    }
  });

export default withNavigation(withTheme(Comment));
