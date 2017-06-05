import React, { Component  } from 'react';
import { View, StyleSheet, AsyncStorage, TextInput, Button, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Configuration from './Configuration';

export default class ConfigurationScreen extends React.Component {
  static navigationOptions = {
    title: 'Configuração',
  };

  render () {
    return (
        <View style={styles.page}>
            <Configuration />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
});