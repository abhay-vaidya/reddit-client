import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import PostList from "../components/PostList";
import { convertRawPosts } from "../utils/RedditDataUtil";
import { getSubredditPosts } from "../redux/Subreddit";

class HomeScreen extends React.Component {
  state = {
    subreddit: "popular",
    sort: "best",
    search: ""
  };

  static navigationOptions = {
    title: "Home"
  };

  getPosts = () => {
    const { subreddit, sort } = this.state;
    this.props.getSubredditPosts(subreddit, sort);
  };

  componentDidMount() {
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
  };

  render() {
    const { posts, loading } = this.props;
    const { search, modalVisible, currentImage } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <SearchBar
          onSubmitEditing={this._handleSearch}
          onChangeText={this._updateSearch}
          value={search}
          platform="ios"
          placeholder="Search for a subreddit..."
        />
        <PostList
          modalVisible={modalVisible}
          posts={posts}
          loading={loading}
          handleRefresh={this._handleRefresh}
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
