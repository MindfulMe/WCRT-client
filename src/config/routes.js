import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from '../screens/Home';
import Accounts from '../screens/Accounts';
import DetailedAccount from '../screens/DetailedAccount';
import RealMap from '../screens/Map';
import Pay from '../screens/Pay';
import Glance from '../screens/Glance';
import OrdersBag from '../screens/OrdersBag';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: () => null,
      },
    },
    RealMap: {
      screen: RealMap,
      navigationOptions: {
        header: () => null,
      },
    },
    Pay: {
      screen: Pay,
      navigationOptions: {
        header: () => null,
      },
    },
    Glance: {
      screen: Glance,
      navigationOptions: {
        header: () => null,
      },
    },
    OrdersBag: {
      screen: OrdersBag,
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

export default createAppContainer(createStackNavigator(
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
));
