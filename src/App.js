import './Date';

import React from 'react';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';

import SummaryScreen from './summary/Screen';
import WeekScreen from './week/Screen';
import ConfigurationScreen from './configuration/Screen';

const orcamentoSMS = StackNavigator({
  Summary:  {screen: SummaryScreen},
  Week:  {screen: WeekScreen},
  Config:  {screen: ConfigurationScreen},
})

AppRegistry.registerComponent('orcamentoSMS', () => orcamentoSMS);
