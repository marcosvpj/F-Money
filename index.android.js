/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

class Purchase extends Component {
  render() {
    return (
      <Text>Compra {this.props.message}</Text>
      );
  }
}

class ProcessPurchases extends Component {
  constructor(props) {
    super(props);

    this.state = {dataSource: []};
    this.messages = [];

    this.getMessages();
    this.update();
  }

  update() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.messages)
    };

    console.log(this.messages);
    console.log(this.state.dataSource);
  }

  getMessages() {
    var SmsAndroid = require('react-native-sms-android');

    var filter = {
      box: 'inbox',
      address: '11108',
      indexFrom: 0
      // maxCount: 10 // count of SMS to return each time
    };

    SmsAndroid.list(JSON.stringify(filter), (fail) => {
      console.log("OH Snap: " + fail)
    },
    (count, smsList) => {
      // console.log('Count: ', count);
      // console.log('List: ', smsList);
      var arr = JSON.parse(smsList);
      for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        // console.log("Index: " + i);
        // console.log("-->" + obj.body);
        this.messages.push({message: obj.body});
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <Text>Mensagens</Text>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.message}</Text>}/>
      </View>
      );
  }
}



export default class orcamentoSMS extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          Its ALIVE!!!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <ProcessPurchases></ProcessPurchases>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('orcamentoSMS', () => orcamentoSMS);
