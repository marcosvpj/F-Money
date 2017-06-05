import React, { Component  } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Configuration from './Configuration';

export default class ConfigurationScreen extends React.Component {
  static navigationOptions = {
    title: 'Configuração',
  };

  render () {
    return <Configuration />;
  }
}