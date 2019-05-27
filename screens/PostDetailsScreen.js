import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Divider, Icon } from "react-native-elements";
import withTheme from "../utils/Theme";
import { getPostComments } from "../redux/Subreddit";
import { transformRawComments } from "../utils/RedditDataUtil";
import { CommentsList, HTML, Loading } from "../components";
import { formatNumber, formatUnixTime } from "../utils/Formatting";

class PostDetailsScreen extends React.Component {
  componentDidMount() {
    const { subreddit, id } = this._getPostDetails();
    this.props._getPostComments(subreddit, id);
  }

  _getPostDetails = () => {
    return this.props.navigation.getParam("props", {});
  };

  render() {
    const { theme, comments, loadingComments } = this.props;

    const {
      title,
      author,
      score,
      numComments,
      subreddit,
      selftext,
      created,
      id
    } = this._getPostDetails();

    const styles = getStyles(theme);
    const createdDate = formatUnixTime(created);
    const formattedScore = formatNumber(score);
    const formattedNumComments = formatNumber(numComments);

    if (loadingComments) {
      return <Loading />;
    }

    return (
      <ScrollView style={styles.postDetailsContainer}>
        <View style={styles.postContainer}>
          <View style={styles.postTextContainer}>
            <Text style={styles.postTitle}>{title}</Text>
            <Text style={styles.postAuthor}>{author}</Text>
            {selftext && <HTML html={selftext} />}
            <Divider />
            <View style={styles.secondaryInfoContainer}>
              <Text style={styles.postInfo}>{`r/${subreddit}`}</Text>
              <View style={styles.postInfoContainer}>
                <Icon
                  name="arrow-upward"
                  color={theme.primaryText}
                  iconStyle={styles.postInfoIcon}
                  size={16}
                />
                <Text style={styles.postInfo}>{formattedScore}</Text>
              </View>
              <View style={styles.postInfoContainer}>
                <Icon
                  name="mode-comment"
                  color={theme.primaryText}
                  iconStyle={styles.postInfoIcon}
                  size={16}
                />
                <Text style={styles.postInfo}>{formattedNumComments}</Text>
              </View>
              <View style={styles.postInfoContainer}>
                <Icon
                  name="access-time"
                  color={theme.primaryText}
                  iconStyle={styles.postInfoIcon}
                  size={16}
                />
                <Text style={styles.postInfo}>{createdDate}</Text>
              </View>
            </View>
          </View>
          <CommentsList
            comments={comments}
            loadingComments={loadingComments}
            postId={id}
          />
        </View>
      </ScrollView>
    );
  }
}

const getStyles = theme =>
  StyleSheet.create({
    postDetailsContainer: {
      backgroundColor: theme.primaryBg
    },
    postContainer: {
      flex: 1,
      flexDirection: "column",
      paddingHorizontal: 16,
      paddingVertical: 20,
      backgroundColor: theme.primaryBg
    },
    postTextContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between"
    },
    secondaryInfoContainer: {
      flex: 1,
      paddingVertical: 12,
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row"
    },
    postTitle: {
      fontWeight: "bold",
      fontSize: 16,
      marginBottom: 6,
      color: theme.primaryText
    },
    postAuthor: {
      color: theme.secondaryText,
      fontSize: 16,
      marginBottom: 10
    },
    postInfoContainer: {
      flex: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    postInfo: {
      fontSize: 16,
      color: theme.primaryText
    },
    postInfoIcon: {
      marginRight: 3
    }
  });

const mapStateToProps = state => {
  const { comments, loadingComments } = state.subreddit;
  const transformedComments = transformRawComments(comments);
  return {
    comments: transformedComments,
    loadingComments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    _getPostComments: (subreddit, postId) => {
      return dispatch(getPostComments(subreddit, postId));
    }
  };
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostDetailsScreen)
);
