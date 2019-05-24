import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import Layout from "../constants/Layout";
import { Divider } from "react-native-elements";
import HTML from "react-native-render-html";
import withTheme from "../utils/Theme";
import { decode } from "he";
import { getPostComments } from "../redux/Subreddit";
import { transformRawComments } from "../utils/RedditDataUtil";
import CommentsList from "../components/CommentsList";
import Loading from "../components/Loading";

class PostDetailsScreen extends React.Component {
  componentDidMount() {
    const { subreddit, id } = this._getPostDetails();
    this.props._getPostComments(subreddit, id);
  }

  _getPostDetails = () => {
    return this.props.navigation.getParam("props", {});
  };

  _navigateToContent = (_, href) => {
    navigation.navigate("LinkContent", { uri: href });
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
      id
    } = this._getPostDetails();

    const styles = getStyles(theme);

    if (loadingComments) {
      return <Loading />;
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.postContainer}>
          <View style={styles.postTextContainer}>
            <Text style={styles.postTitle}>{title}</Text>
            <Text style={styles.postAuthor}>{author}</Text>
            {selftext && (
              <HTML
                html={decode(selftext)}
                baseFontStyle={{ color: theme.primaryText }}
                onLinkPress={this._navigateToContent}
                imagesMaxWidth={Layout.window.width}
              />
            )}
            <Divider style={styles.divider} />
            <View style={styles.secondaryInfoContainer}>
              <Text style={styles.postInfo}>{`r/${subreddit}`}</Text>
              <Text style={styles.postInfo}>↑ {score}</Text>
              <Text style={styles.postInfo}>{numComments} Comments</Text>
            </View>
            <Divider style={styles.divider} />
            <CommentsList
              comments={comments}
              loadingComments={loadingComments}
              postId={id}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.primaryBg
    },
    postContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: theme.primaryBg,
      padding: 16,
      margin: 10
    },
    postTextContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between"
    },
    divider: {
      marginVertical: 10
    },
    secondaryInfoContainer: {
      flex: 1,
      justifyContent: "space-around",
      alignItems: "flex-end",
      flexDirection: "row"
    },
    postTitle: {
      fontWeight: "bold",
      fontSize: 20,
      marginBottom: 6,
      color: theme.primaryText
    },
    postAuthor: {
      color: theme.secondaryText,
      fontSize: 16,
      marginBottom: 10
    },
    postInfo: {
      marginRight: 10,
      fontSize: 18,
      color: theme.primaryText
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
