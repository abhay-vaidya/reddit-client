import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { Icon, Image } from "react-native-elements";
import IconText from "./IconText";
import withTheme from "../utils/Theme";
import { withNavigation } from "react-navigation";
import { formatNumber, formatUnixTime } from "../utils/Formatting";
import { WebBrowser } from "expo";

class Post extends React.PureComponent {
  _renderThumbnail = styles => {
    const { thumbnail, postType, url, imageModalToggler, theme } = this.props;

    const _navigateToContent = () => {
      WebBrowser.openBrowserAsync(url);
    };

    /* If there is no thumbnail return a default one with icon
       depending on if the type is a link or self post
    */
    if (!thumbnail) {
      return (
        <TouchableOpacity onPress={_navigateToContent}>
          <View style={styles.defaultThumb}>
            <Icon
              name={postType === "self" ? "subject" : "link"}
              color={theme.secondaryText}
            />
          </View>
        </TouchableOpacity>
      );
    }

    /* If the type is an image, toggle the modal when it's pressed, otherwise
       navigate to the webview screen
    */
    const imageThumb = (
      <Image
        source={{
          uri: thumbnail
        }}
        style={styles.thumbnail}
      />
    );

    const thumbailPressHandler =
      postType === "pic" ? () => imageModalToggler(url) : _navigateToContent;

    return (
      <TouchableOpacity onPress={thumbailPressHandler}>
        {imageThumb}
      </TouchableOpacity>
    );
  };

  _renderSinglePostInfo = (iconName, content) => {
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

  _renderPostInfo = (score, numComments, date, styles) => {
    const { subreddit, author, isGenericSubreddit } = this.props;

    const scoreElement = this._renderSinglePostInfo("arrow-upward", score);
    const commentsElement = this._renderSinglePostInfo(
      "chat-bubble-outline",
      numComments
    );
    const dateElement = this._renderSinglePostInfo("access-time", date);
    const additionalInfo = isGenericSubreddit
      ? `r/${subreddit}`
      : `u/${author}`;

    return (
      <View>
        <View style={styles.secondaryInfoContainer}>
          <Text style={styles.postAdditionalInfo}>{additionalInfo}</Text>
          {scoreElement}
          {commentsElement}
          {dateElement}
        </View>
      </View>
    );
  };

  navigateToPostDetails = () => {
    this.props.navigation.navigate("PostDetails", { props: this.props });
  };

  render() {
    const { title, created, score, numComments, theme } = this.props;
    const createdDate = formatUnixTime(created);
    const formattedScore = formatNumber(score);
    const formattedNumComments = formatNumber(numComments);
    const styles = getStyles(theme);
    const thumbnailElement = this._renderThumbnail(styles);

    const postInfoElement = this._renderPostInfo(
      formattedScore,
      formattedNumComments,
      createdDate,
      styles
    );

    return (
      <TouchableHighlight
        onPress={this.navigateToPostDetails}
        underlayColor={theme.secondaryBg}
      >
        <View style={styles.postContainer}>
          {thumbnailElement}
          <View style={styles.postTextContainer}>
            <View>
              <Text style={styles.postTitle}>{title}</Text>
            </View>
            {postInfoElement}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const getStyles = theme =>
  StyleSheet.create({
    postContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: theme.primaryBg,
      paddingHorizontal: 16,
      paddingVertical: 12
    },
    postTextContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between"
    },
    secondaryInfoContainer: {
      flex: 1,
      alignItems: "center",
      flexDirection: "row"
    },
    postTitle: {
      fontSize: 14,
      color: theme.primaryText,
      marginBottom: 6
    },
    postAdditionalInfo: {
      fontSize: 12,
      marginRight: 10,
      color: theme.secondaryText
    },
    thumbnail: {
      width: 55,
      height: 55,
      borderRadius: 5,
      marginRight: 16
    },
    defaultThumb: {
      width: 55,
      height: 55,
      borderRadius: 5,
      marginRight: 16,
      flex: 0,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.secondaryBg
    }
  });

export default withNavigation(withTheme(Post));
