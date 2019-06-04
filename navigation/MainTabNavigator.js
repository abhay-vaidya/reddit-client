import { createStackNavigator } from "react-navigation";
import { HomeScreen, PostDetailsScreen } from "../screens";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  PostDetails: PostDetailsScreen
});

export default HomeStack;
