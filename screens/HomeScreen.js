import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import PostList from "../components/PostList";
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
      typeof navigation.state.params === "undefined" ||
      typeof navigation.state.params.title === "undefined"
        ? "find"
        : navigation.state.params.title
  });

  _getPosts = () => {
    const { subreddit, sort } = this.props;
    this.props._getSubredditPosts(subreddit, sort);
  };

  getNextPosts = () => {
    const { subreddit, sort } = this.props;
    const { posts } = this.props;

    const name = posts[posts.length - 1].name;
    this.props._getNextSubredditPosts(subreddit, sort, name);
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

  _getSearchComponent = () => {
    return (
      <SearchBar
        onSubmitEditing={this.handleSearch}
        onChangeText={this.updateSearch}
        value={this.state.search}
        platform="ios"
        placeholder="Search for a subreddit..."
        containerStyle={{ backgroundColor: "transparent" }}
      />
    );
  };

  render() {
    const { posts, loading } = this.props;
    const { modalVisible } = this.state;
    const searchComponent = this._getSearchComponent();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

const mapStateToProps = state => {
  const { subreddit, sort, loading } = state;
  let newPosts = convertRawPosts(state.posts);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
