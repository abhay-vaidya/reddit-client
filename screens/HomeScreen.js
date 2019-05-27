import React from "react";
import { StyleSheet, View } from "react-native";
import { SearchBar, Button } from "react-native-elements";
import withTheme from "../utils/Theme";
import Defaults from "../constants/Defaults";
import { connect } from "react-redux";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { PostList, Loading } from "../components";
import { transformRawPosts } from "../utils/RedditDataUtil";
import { SORT_OPTIONS, TIME_RANGES } from "../constants/Sorting";

import { getSubredditPosts, getNextSubredditPosts } from "../redux/Subreddit";

@connectActionSheet
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const accentColour = params.theme
      ? params.theme.accent
      : Defaults.theme.accent;

    return {
      title: params.title ? params.title : Defaults.subreddit,
      headerLeft: (
        <Button
          type="clear"
          title={params.sort}
          onPress={params.sortHandler}
          icon={{
            name: "sort",
            size: 18,
            color: accentColour
          }}
          titleStyle={{
            color: accentColour,
            fontSize: 14
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
    const { subreddit, sort, theme } = this.props;
    this.props.navigation.setParams({
      title: subreddit,
      sort,
      sortHandler: this._onOpenSortActionSheet,
      theme
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
    const { posts, loadingPosts, theme } = this.props;
    const { modalVisible } = this.state;
    const styles = getStyles(theme);
    const searchComponent = this._getSearchComponent(styles);

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

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeScreen)
);
