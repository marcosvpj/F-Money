import React, { PureComponent  } from 'react';
import { View, Text, StyleSheet, AsyncStorage, TextInput, Button } from 'react-native';

import config from '../config.json';
import Config, { budget } from './Config';


export default function screen() {
  class ConfigurationScreen extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {week_budget:config.DEFAULT_WEEK_BUDGET};
      this.loadWeekBudget();
    }

    async loadWeekBudget () {
      console.log('config::loadBudget');
      let value = await AsyncStorage.getItem('@orcamentoSMS:budget_semanal');
      this.state.week_budget = value;
      this.forceUpdate();
    }

    updateConfig(value) {
      this.state.week_budget = value.text;
      console.log('this.state');
      console.log(this.state);
    }

    async salveConfig() {
      console.log('config::salva');
      try {
        await AsyncStorage.setItem('@orcamentoSMS:budget_semanal', this.state.week_budget);
      } catch (error) {
        console.log(error);
      }
    }

    saveBudget() {
      console.log('save budget');
      console.log(this.state);
      // this.salveConfig();
      AsyncStorage.setItem('@orcamentoSMS:budget_semanal', this.state.week_budget);
    }

    render() {
      return (
        <View>
          <Text>Valor limite para gastos por semana:</Text>
          <TextInput
            style={{height: 40}}
            defaultValue={this.state.week_budget}
            keyboardType='numeric'
            onChangeText={(text) => this.updateConfig({text})}
            onEndEditing={() => this.saveBudget()}/>

          <Text>Saldo:</Text>
        </View>
      );
    }
  }

  console.log('config::screen');
  console.log(Config);
  console.log(budget);
  return (<ConfigurationScreen/>);
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, .1)',
    borderRadius: 3,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
});