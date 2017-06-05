import './Date';

import React, { PureComponent  } from 'react';
import {
  AppRegistry,
  Text,
  Button,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Week from './Week';
import Configuration from './Configuration';


class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Icon.Button name='gear' size={30} color="grey" backgroundColor= 'white' onPress={() => navigation.navigate('Config')}></Icon.Button>,
    title: 'Controle de F-Money',
  });

  render () {
    return <Week style={{ backgroundColor: '#50C1EA' }}/>;
  }
}

class ConfigScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Configuração',
  };

  render () {
    return <Configuration />;
  }
}

const orcamentoSMS = StackNavigator({
  Home:  {screen: HomeScreen},
  Config:  {screen: ConfigScreen},
})

AppRegistry.registerComponent('orcamentoSMS', () => orcamentoSMS);