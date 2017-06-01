import React, { PureComponent  } from 'react';
import { View, Text, StyleSheet, AsyncStorage, TextInput, Button } from 'react-native';

import config from './config.json';

  class Configuration extends PureComponent  {
    constructor(props) {
      super(props);

      this.state = {week_budget:config.DEFAULT_WEEK_BUDGET};
      this.loadConfig();
    }

    async loadConfig() {
      try {
        const value = await AsyncStorage.getItem('@orcamentoSMS:budget_semanal');
        if (value !== null){
          this.setState({week_budget: value});
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    }

    updateConfig(value) {
      this.setState({week_budget: value.text});
      this.forceUpdate();
    }

    async salveConfig() {
      try {
        await AsyncStorage.setItem('@orcamentoSMS:budget_semanal', this.state.week_budget);
      } catch (error) {
        // Error saving data
        console.log(error);
      }
    }

    saveBudget = () => {
      this.salveConfig();
    }

    render() {
      return (
        <View>
          <TextInput
            style={{height: 40}}
            defaultValue={this.state.week_budget}
            keyboardType='numeric'
            onChangeText={(text) => this.updateConfig({text})}
            onEndEditing={this.saveBudget}/>
        </View>
      );
    }
  }
export default function CurrentStateIndicator({ state, style }: *) {

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