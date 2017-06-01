import React, { PureComponent  } from 'react';
import { View, Text, StyleSheet, AsyncStorage, TextInput, Button } from 'react-native';

import config from './config.json';

export default function CurrentStateIndicator({ state, style }: *) {
  class Configuration extends PureComponent  {
    constructor(props) {
      super(props);
      console.log('Configuration');

      this.state = {week_budget:config.DEFAULT_WEEK_BUDGET};

      this.loadConfig();
    }

    async loadConfig() {
      try {
        const value = await AsyncStorage.getItem('@orcamentoSMS:budget_semanal');
        if (value !== null){
          this.setState({week_budget: value});
          console.log(value);
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    }

    async salveConfig(value) {
      console.log('salveConfig');
      console.log(value);
      try {
        await AsyncStorage.setItem('@orcamentoSMS:budget_semanal', value.text);
      } catch (error) {
        // Error saving data
        console.log(error);
      }
    }

    render() {
      return (
        <View>
          <TextInput
            style={{height: 40}}
            defaultValue={this.state.week_budget}
            keyboardType='numeric'
            onChangeText={(text) => this.salveConfig({text})}/>
        </View>
      );
    }
  }

  return (
    <View style={[styles.page, style]}>
      <Configuration/>
      <View style={styles.container}>
        <Text style={styles.text}>
          Configuração
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
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