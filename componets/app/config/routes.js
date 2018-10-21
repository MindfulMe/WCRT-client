import { createStackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Accounts from '../screens/Accounts';
import DetailedAccount from '../screens/DetailedAccount';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: () => null,
      },
    },
  },
  {
    headerMode: 'none',
  },
);

const AccountStack = createStackNavigator(
  {
    Accounts: {
      screen: Accounts,
      navigationOptions: {
        header: () => null,
      },
    },
    DetailedAccount: {
      screen: DetailedAccount,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
      }),
    },
  },
  {
    headerMode: 'screen',
  },
);

export default createStackNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    Account: {
      screen: AccountStack,
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);
