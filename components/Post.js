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

class Post extends React.PureComponent {
  _renderThumbnail = styles => {
    const {
      thumbnail,
      postType,
      navigation,
      url,
      imageModalToggler,
      theme
    } = this.props;

    const navigateToContent = () =>
      navigation.navigate("LinkContent", { uri: url });

    /* If there is no thumbnail return a default one with icon
       depending on if the type is a link or self post
    */
    const defaultThumb = (
      <TouchableOpacity onPress={navigateToContent}>
        <View style={styles.defaultThumb}>
          <Icon
            name={postType === "self" ? "subject" : "link"}
            color={theme.secondaryText}
          />
        </View>
      </TouchableOpacity>
    );

    if (!thumbnail) {
      return defaultThumb;
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
      postType === "pic" ? () => imageModalToggler(url) : navigateToContent;

    return (
      <TouchableOpacity onPress={thumbailPressHandler}>
        {imageThumb}
      </TouchableOpacity>
    );
  };

  navigateToPostDetails = () => {
    this.props.navigation.navigate("PostDetails", { props: this.props });
  };

  _renderPostInfo = (iconName, content) => {
    return (
      <IconText
        iconName={iconName}
        title={content}
        isSmall={true}
        addMargin={true}
      />
    );
  };

  render() {
    const {
      title,
      created,
      author,
      score,
      numComments,
      subreddit,
      theme
    } = this.props;
    const createdDate = formatUnixTime(created);
    const formattedScore = formatNumber(score);
    const formattedNumComments = formatNumber(numComments);
    const styles = getStyles(theme);
    const thumbnailElement = this._renderThumbnail(styles);

    const scoreElement = this._renderPostInfo("arrow-upward", formattedScore);
    const commentsElement = this._renderPostInfo(
      "mode-comment",
      formattedNumComments
    );
    const dateElement = this._renderPostInfo("access-time", createdDate);

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
            <View>
              <Text style={styles.postAuthor}>{author}</Text>
              <View style={styles.secondaryInfoContainer}>
                <Text style={styles.postSubreddit}>r/{subreddit}</Text>
                {scoreElement}
                {commentsElement}
                {dateElement}
              </View>
            </View>
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
      padding: 16
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
      color: theme.primaryText,
      fontWeight: "bold",
      marginBottom: 6
    },
    postSubreddit: {
      fontSize: 12,
      marginRight: 10,
      color: theme.primaryText
    },
    postAuthor: {
      color: theme.secondaryText,
      fontSize: 12,
      marginBottom: 3
    },
    thumbnail: {
      width: 60,
      height: 60,
      borderRadius: 5,
      marginRight: 12
    },
    defaultThumb: {
      width: 60,
      height: 60,
      borderRadius: 5,
      marginRight: 12,
      flex: 0,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.secondaryBg
    }
  });

export default withNavigation(withTheme(Post));
