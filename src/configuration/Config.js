import React, { Component  } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Config extends React.Component {
  async budget() {
    return await AsyncStorage.getItem('@orcamentoSMS:budget_semanal');
  }

  // static navigationOptions = ({ navigation }) => ({
  //   headerRight: <Icon.Button name='gear' size={30} color="grey" backgroundColor= 'white' onPress={() => navigation.navigate('Config')}></Icon.Button>,
  //   title: 'Controle de F-Money',
  // });

  // render () {
  //   return <Week style={{ backgroundColor: '#50C1EA' }}/>;
  // }
}