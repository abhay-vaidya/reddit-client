import React from "react";
import { StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";
import withTheme from "../utils/Theme";
import { connect } from "react-redux";
import PostList from "../components/PostList";
import Loading from "../components/Loading";
import { convertRawPosts } from "../utils/RedditDataUtil";

import {
  getSubredditPosts,
  getNextSubredditPosts,
  setSubreddit
} from "../redux/Subreddit";

class HomeScreen extends React.Component {
  state = {
    search: ""
  };

  static navigationOptions = ({ navigation }) => ({
    title:
      navigation.state.params && navigation.state.params.title
        ? navigation.state.params.title
        : "Home"
  });

  _getPosts = () => {
    const { subreddit, sort } = this.props;
    this.props._getSubredditPosts(subreddit, sort);
  };

  getNextPosts = () => {
    const { subreddit, sort, loading } = this.props;
    const { posts } = this.props;
    const name = posts[posts.length - 1].name;

    !loading && this.props._getNextSubredditPosts(subreddit, sort, name);
  };

  componentDidMount() {
    this.props.navigation.setParams({ title: this.props.subreddit });
    this._getPosts();
  }

  updateSearch = search => {
    this.setState({ search });
  };

  handleRefresh = () => {
    this._getPosts();
  };

  handleSearch = e => {
    const searchTerm = e.nativeEvent.text.trim().toLowerCase();
    this.props._setSubreddit(searchTerm);
    this.props._getSubredditPosts(searchTerm, this.props.sort).then(() => {
      this.props.navigation.setParams({ title: this.props.subreddit });
      this.setState({ search: "" });
    });
  };

  _getSearchComponent = styles => {
    return (
      <SearchBar
        onSubmitEditing={this.handleSearch}
        onChangeText={this.updateSearch}
        value={this.state.search}
        platform="ios"
        inputStyle={styles.searchInput}
        inputContainerStyle={styles.searchInputContainer}
        placeholder="Search for a subreddit..."
        containerStyle={styles.searchContainer}
      />
    );
  };

  render() {
    const { posts, loading, theme } = this.props;
    const { modalVisible } = this.state;
    const styles = getStyles(theme);
    const searchComponent = this._getSearchComponent(styles);

    if (loading) {
      return <Loading />;
    }

    return (
      <View style={styles.container}>
        <PostList
          modalVisible={modalVisible}
          posts={posts}
          loading={loading}
          handleRefresh={this.handleRefresh}
          searchComponent={searchComponent}
          handleEndReached={this.getNextPosts}
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
    searchContainer: {
      backgroundColor: "transparent"
    },
    searchInputContainer: {
      backgroundColor: theme.secondaryBg
    },
    searchInput: {
      color: theme.primaryText
    }
  });

const mapStateToProps = state => {
  const { subreddit, sort, loading, posts } = state.subreddit;
  let newPosts = convertRawPosts(posts);
  return {
    subreddit,
    sort,
    posts: newPosts,
    loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    _getSubredditPosts: (subreddit, sort) => {
      return dispatch(getSubredditPosts(subreddit, sort));
    },
    _getNextSubredditPosts: (subreddit, sort, lastPostName) => {
      return dispatch(getNextSubredditPosts(subreddit, sort, lastPostName));
    },
    _setSubreddit: subreddit => {
      dispatch(setSubreddit(subreddit));
    }
  };
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeScreen)
);
