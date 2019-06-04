import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { Search } from "../components";
import Defaults from "../constants/Defaults";
import { connect } from "react-redux";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { PostList, Loading } from "../components";
import { transformRawPosts } from "../utils/RedditDataUtil";
import { SORT_OPTIONS, TIME_RANGES } from "../constants/Sorting";

import { getSubredditPosts, getNextSubredditPosts } from "../redux/Subreddit";

@connectActionSheet
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { params = {} } = navigation.state;
    const { theme, handleThemeToggle } = screenProps;

    return {
      title: params.title ? params.title : Defaults.subreddit,
      headerStyle: {
        backgroundColor: theme.primary,
        borderBottomWidth: 0
      },
      headerTintColor: theme.accent,
      headerLeft: (
        <Button
          type="clear"
          title={params.sort}
          onPress={params.sortHandler}
          icon={{
            name: "sort",
            size: 18,
            color: theme.accent
          }}
          titleStyle={{
            color: theme.accent,
            fontSize: 14
          }}
        />
      ),
      headerRight: (
        <Button
          type="clear"
          onPress={handleThemeToggle}
          icon={{
            name: "brightness-medium",
            size: 18,
            color: theme.accent
          }}
        />
      )
    };
  };

  state = {
    search: ""
  };

  _getPosts = () => {
    const { subreddit, sort } = this.props;
    this.props._getSubredditPosts(subreddit, sort);
  };

  getNextPosts = () => {
    const { subreddit, sort, loadingPosts } = this.props;
    const { posts } = this.props;
    const name = posts[posts.length - 1].name;

    !loadingPosts && this.props._getNextSubredditPosts(subreddit, sort, name);
  };

  componentDidMount() {
    const { subreddit, sort } = this.props;
    this.props.navigation.setParams({
      title: subreddit,
      sort,
      sortHandler: this._onOpenSortActionSheet
    });
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
    const { sort } = this.props;
    this.props._getSubredditPosts(searchTerm, sort).then(() => {
      this.props.navigation.setParams({ title: searchTerm, sort });
      this.updateSearch("");
    });
  };

  _renderSearchComponent = () => {
    return (
      <Search
        onSubmit={this.handleSearch}
        onChange={this.updateSearch}
        value={this.state.search}
      />
    );
  };

  _onOpenTimeRangeActionSheet = sortName => {
    const {
      showActionSheetWithOptions,
      _getSubredditPosts,
      subreddit,
      navigation
    } = this.props;
    const options = [...TIME_RANGES, "Cancel"];
    const cancelButtonIndex = TIME_RANGES.length;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: "Sort by..."
      },
      buttonIndex => {
        if (buttonIndex < options.length - 1) {
          const selectedTimeRange = TIME_RANGES[buttonIndex].toLowerCase();
          _getSubredditPosts(subreddit, sortName, selectedTimeRange).then(
            () => {
              navigation.setParams({
                title: subreddit,
                sort: `${sortName}/${selectedTimeRange}`
              });
            }
          );
        }
      }
    );
  };

  _onOpenSortActionSheet = () => {
    const {
      showActionSheetWithOptions,
      _getSubredditPosts,
      subreddit,
      navigation
    } = this.props;
    const options = [...SORT_OPTIONS.map(option => option.name), "Cancel"];
    const cancelButtonIndex = SORT_OPTIONS.length;
    const title = "Sort by...";

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title
      },
      buttonIndex => {
        if (buttonIndex < options.length - 1) {
          const selectedSort = SORT_OPTIONS[buttonIndex];
          const sortName = selectedSort.name.toLowerCase();
          if (selectedSort.hasTimeRange) {
            this._onOpenTimeRangeActionSheet(sortName);
          } else {
            _getSubredditPosts(subreddit, sortName).then(() => {
              navigation.setParams({
                title: subreddit,
                sort: sortName
              });
            });
          }
        }
      }
    );
  };

  render() {
    const { posts, loadingPosts, subreddit } = this.props;
    const { modalVisible } = this.state;
    const styles = getStyles();
    const searchComponent = this._renderSearchComponent();
    const isGenericSubreddit = subreddit.match(/^(popular|all)$/) !== null;

    if (loadingPosts) {
      return <Loading />;
    }

    return (
      <View style={styles.container}>
        <PostList
          modalVisible={modalVisible}
          posts={posts}
          loading={loadingPosts}
          handleRefresh={this.handleRefresh}
          searchComponent={searchComponent}
          handleEndReached={this.getNextPosts}
          isGenericSubreddit={isGenericSubreddit}
        />
      </View>
    );
  }
}

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1
    }
  });

const mapStateToProps = state => {
  const { subreddit, sort, loadingPosts, posts } = state.subreddit;
  let newPosts = transformRawPosts(posts);
  return {
    subreddit,
    sort,
    posts: newPosts,
    loadingPosts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    _getSubredditPosts: (subreddit, sort, timeRange) => {
      return dispatch(getSubredditPosts(subreddit, sort, timeRange));
    },
    _getNextSubredditPosts: (subreddit, sort, lastPostName, timeRange) => {
      return dispatch(
        getNextSubredditPosts(subreddit, sort, lastPostName, timeRange)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
