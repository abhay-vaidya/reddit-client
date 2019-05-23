import React from "react";
import { StyleSheet, View } from "react-native";
import { SearchBar, Button } from "react-native-elements";
import withTheme from "../utils/Theme";
import Defaults from "../constants/Defaults";
import { connect } from "react-redux";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { PostList, Loading } from "../components";
import { convertRawPosts } from "../utils/RedditDataUtil";
import SortEnum from "../constants/Sorting";

import {
  getSubredditPosts,
  getNextSubredditPosts,
  setSubreddit
} from "../redux/Subreddit";

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
    const { subreddit, sort, loading } = this.props;
    const { posts } = this.props;
    const name = posts[posts.length - 1].name;

    !loading && this.props._getNextSubredditPosts(subreddit, sort, name);
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
    const { sort, subreddit } = this.props;
    this.props._setSubreddit(searchTerm);
    this.props._getSubredditPosts(searchTerm, sort).then(() => {
      this.props.navigation.setParams({ title: subreddit, sort });
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

  _onOpenSortActionSheet = () => {
    const {
      showActionSheetWithOptions,
      _getSubredditPosts,
      subreddit,
      navigation
    } = this.props;
    const options = [...Object.values(SortEnum), "Cancel"];
    const cancelButtonIndex = 6;
    const title = "Sort by...";

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title
      },
      buttonIndex => {
        const selectedSort = options[buttonIndex].toLowerCase();
        if (buttonIndex < options.length - 1) {
          _getSubredditPosts(subreddit, selectedSort).then(() => {
            navigation.setParams({
              title: subreddit,
              sort: selectedSort
            });
          });
        }
      }
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
