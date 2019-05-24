import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Layout from "../constants/Layout";
import HTML from "react-native-render-html";
import { withNavigation } from "react-navigation";
import { decode } from "he";
import { commentColours } from "../constants/Colours";
import withTheme from "../utils/Theme";

class Comment extends React.PureComponent {
  _keyExtractor = item => item.id;

  renderComment = theme => ({ item }) => <Comment {...item} theme={theme} />;

  _navigateToContent = (_, href) => {
    this.props.navigation.navigate("LinkContent", { uri: href });
  };

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
          <HTML
            html={decode(body)}
            baseFontStyle={{ color: theme.primaryText }}
            onLinkPress={this._navigateToContent}
            imagesMaxWidth={Layout.window.width}
          />
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
      color: theme.primaryText,
      fontWeight: "bold",
      fontSize: 12,
      marginBottom: 3,
      marginRight: 6
    }
  });

export default withNavigation(withTheme(Comment));
