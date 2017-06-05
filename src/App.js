import './Date';

import React from 'react';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';

import SummaryScreen from './summary/Screen';
import ConfigurationScreen from './configuration/Screen';

const orcamentoSMS = StackNavigator({
  Summary:  {screen: SummaryScreen},
  Config:  {screen: ConfigurationScreen},
})

AppRegistry.registerComponent('orcamentoSMS', () => orcamentoSMS);
