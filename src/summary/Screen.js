import React, { Component  } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Weeks from './Weeks';

export default class SummaryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Icon.Button name='gear' size={30} color="grey" backgroundColor= 'white' onPress={() => navigation.navigate('Config')}></Icon.Button>,
    title: 'Controle de F-Money',
  });

  render () {
    return (
      <View style={styles.page}>
        <Weeks style={{ backgroundColor: '#50C1EA' }}/>
      </View>
    );
  }
}
        // <Button title='gear' onPress={() => this.props.navigation.navigate('Config', { user: 'Lucy' })}></Button>

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
});