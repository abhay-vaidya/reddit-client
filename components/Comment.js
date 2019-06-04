import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import HTML from "./HTML";
import IconText from "./IconText";
import { withNavigation } from "react-navigation";
import { commentColours } from "../constants/Colours";
import { formatNumber, formatUnixTime } from "../utils/Formatting";
import withTheme from "../utils/Theme";

class Comment extends React.PureComponent {
  _keyExtractor = item => item.id;

  _renderComment = ({ item }) => <Comment {...item} theme={this.props.theme} />;

  _renderCommentInfo = (iconName, content) => {
    return (
      <IconText
        iconName={iconName}
        title={content}
        isSmall={true}
        addMargin={true}
        secondary={true}
      />
    );
  };

  render() {
    const { author, body, score, replies, depth, created, theme } = this.props;
    const formattedScore = formatNumber(score);
    const createdDate = formatUnixTime(created);
    const scoreElement = this._renderCommentInfo(
      "arrow-upward",
      formattedScore
    );
    const dateElement = this._renderCommentInfo("access-time", createdDate);

    const styles = getStyles(theme, depth);

    return (
      <View>
        <View style={styles.commentContainer}>
          <View style={styles.commentInnerContainer}>
            <View style={styles.secondaryInfoContainer}>
              <Text style={styles.commentAuthor}>{author}</Text>
              {scoreElement}
              {dateElement}
            </View>
            {body && <HTML html={body} />}
          </View>
        </View>
        <FlatList
          data={replies}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderComment}
          extraData={this.props}
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
      flexDirection: "row",
      marginTop: 12
    },
    commentAuthor: {
      color: theme.primaryText,
      fontWeight: "bold",
      fontSize: 12,
      marginRight: 6
    }
  });

export default withNavigation(withTheme(Comment));
