import React, { PureComponent  } from 'react';
import { View, Text, StyleSheet, AsyncStorage, TextInput, Button } from 'react-native';

import config from './config.json';

state = {week_budget:config.DEFAULT_WEEK_BUDGET};

function loadWeekBudget () {
  console.log('load config');
  AsyncStorage.getItem('@orcamentoSMS:budget_semanal')
  .then( function(value) {
    state.week_budget = value;
  })
  .catch(function (reason) {
      console.error('An error occurred', reason);
  });
}

function updateConfig(value) {
  state.week_budget = value.text;
}

async function salveConfig() {
  try {
    await AsyncStorage.setItem('@orcamentoSMS:budget_semanal', state.week_budget);
  } catch (error) {
    console.log(error);
  }
}

function saveBudget() {
  salveConfig();
}

export default function screen() {
  loadWeekBudget();

  return (
    <View style={styles.page}>
      <Text>Valor limite para gastos por semana:</Text>
      <TextInput
        style={{height: 40}}
        defaultValue={state.week_budget}
        keyboardType='numeric'
        onChangeText={(text) => updateConfig({text})}
        onEndEditing={saveBudget}/>
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