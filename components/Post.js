import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { Icon, Image } from "react-native-elements";
import withTheme from "../utils/Theme";
import { withNavigation } from "react-navigation";
import { formatNumber, formatUnixTime } from "../utils/Formatting";

class Post extends React.PureComponent {
  _getThumbnail = styles => {
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

  render() {
    const { title, created, score, numComments, subreddit, theme } = this.props;
    const createdDate = formatUnixTime(created);
    const formattedScore = formatNumber(score);
    const formattedNumComments = formatNumber(numComments);
    const styles = getStyles(theme);
    const thumbnailMarkup = this._getThumbnail(styles);

    return (
      <TouchableHighlight
        onPress={this.navigateToPostDetails}
        underlayColor={theme.secondaryBg}
      >
        <View style={styles.postContainer}>
          {thumbnailMarkup}

          <View style={styles.postTextContainer}>
            <View>
              <Text style={styles.postTitle}>{title}</Text>
            </View>
            <View>
              <Text style={styles.postSubreddit}>r/{subreddit}</Text>
              <View style={styles.secondaryInfoContainer}>
                <Icon
                  name="arrow-upward"
                  color={theme.primaryText}
                  iconStyle={styles.postInfoIcon}
                  size={12}
                />
                <Text style={styles.postInfo}>{formattedScore}</Text>
                <Icon
                  name="mode-comment"
                  color={theme.primaryText}
                  iconStyle={styles.postInfoIcon}
                  size={12}
                />
                <Text style={styles.postInfo}>{formattedNumComments}</Text>
                <Icon
                  name="access-time"
                  color={theme.primaryText}
                  iconStyle={styles.postInfoIcon}
                  size={12}
                />
                <Text style={styles.postInfo}>{createdDate}</Text>
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
      color: theme.secondaryText,
      fontSize: 12,
      marginBottom: 3
    },
    postInfo: {
      color: theme.primaryText,
      marginRight: 12,
      fontSize: 12
    },
    postInfoIcon: {
      marginRight: 3
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
