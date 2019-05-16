import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import PostList from "../components/PostList";
import { convertRawPosts } from "../utils/RedditDataUtil";

import { getSubredditPosts, getNextSubredditPosts } from "../redux/Subreddit";

class HomeScreen extends React.Component {
  state = {
    subreddit: "popular",
    sort: "best",
    search: ""
  };

  static navigationOptions = ({ navigation }) => ({
    title:
      typeof navigation.state.params === "undefined" ||
      typeof navigation.state.params.title === "undefined"
        ? "find"
        : navigation.state.params.title
  });

  getPosts = () => {
    const { subreddit, sort } = this.state;
    this.props.getSubredditPosts(subreddit, sort);
  };

  getNextPosts = () => {
    const { subreddit, sort } = this.state;
    const { posts } = this.props;

    const name = posts[posts.length - 1].name;
    this.props.getNextSubredditPosts(subreddit, sort, name);
  };

  componentDidMount() {
    this.props.navigation.setParams({ title: this.state.subreddit });
    this.getPosts();
  }

  _updateSearch = search => {
    this.setState({ search });
  };

  _handleRefresh = () => {
    this.getPosts();
  };

  _handleSearch = e => {
    const searchTerm = e.nativeEvent.text.trim();
    this.props.getSubredditPosts(searchTerm, this.state.sort);
    this.setState({ subreddit: searchTerm });
    this.props.navigation.setParams({ title: this.state.subreddit });
  };

  _getSearchComponent = () => {
    return (
      <SearchBar
        onSubmitEditing={this._handleSearch}
        onChangeText={this._updateSearch}
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
          handleRefresh={this._handleRefresh}
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
  let newPosts = convertRawPosts(state.posts);
  return {
    posts: newPosts,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSubredditPosts: (subreddit, sort) => {
      dispatch(getSubredditPosts(subreddit, sort));
    },
    getNextSubredditPosts: (subreddit, sort, lastPostName) => {
      dispatch(getNextSubredditPosts(subreddit, sort, lastPostName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
