import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from '../views/Main';
import DetailedView from '../views/DetailedView';

export default createAppContainer(createStackNavigator({
  Main,
  DetailedView,
}));
