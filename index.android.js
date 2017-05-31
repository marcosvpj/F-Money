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
  ScrollView
} from 'react-native';

Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

class ProcessPurchases extends Component {
  constructor(props) {
    super(props);
    console.log('ProcessPurchases::constructor');
    console.log(this.props.messages);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.messages)
    };
  }

  // async fetchData() {
  //   console.log('ProcessPurchases::fetchData');
  //   this.messages = await this.props.messages;
  //   if (this.props.messages) {
  //     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //     dataSource = ds.cloneWithRows(this.props.messages);

  //     this.setState({messages: this.props.messages, dataSource:dataSource});
  //   }
  // }

  // componentDidMount() {
  //   console.log('ProcessPurchases::componentDidMount');
  //   this.fetchData().done()
  // }

  // componentWillUpdate() {
  //   console.log('componentDidUpdate');
  //   this.fetchData().done()
  // }

  render() {
    console.log('ProcessPurchases::render');
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
  constructor(props) {
    super(props)

    this.messages = Array();

    this.state = {messages:this.messages};
    this.fetchData();
  }

  async fetchData() {
    console.log('fetchData');
    var SmsAndroid = require('react-native-sms-android');
    var filter = {
      box: 'inbox',
      address: '11108',
      indexFrom: 0
      // , maxCount: 2
    };

    SmsAndroid.list(
      JSON.stringify(filter), (fail) => {
        console.log("OH Snap: " + fail)
      },
      (count, smsList) => {
        var arr = JSON.parse(smsList);
        for (var i = 0; i < arr.length; i++) {
          var obj = arr[i];
          if (obj.body.match(/ITAU DEBITO/g)) {
            this.messages.push({message: obj.body});
          }
        }
        this.setState({messages: this.messages});
        this.forceUpdate();
      }
    );
  }

  parseMessage(m) {
    var card_number = m.match(/\d\d\d\d/g);
    var value = m.match(/(R\$ \d*,\d*)/g);
    var date = m.match(/(\d\d\/\d\d \d\d:\d\d:\d\d)/g).toString();
    date = new Date(2017, date.substring(3,5), date.substring(0,2));
    var place = m.match(/Local: (.*\. )/g);

    return {card_number:card_number, value:value, date:date, place:place};
  }

  formatDate(date) {
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
  }

  showMessages() {
    var self = this;
    return this.state.messages.map(function(m, i){
      var data = self.parseMessage(m.message);
          // <Text style={styles.message}>{m.message}</Text>
      return(
        <View key={i}>
          <Text style={styles.message}>
            Cartão final: {data.card_number}{'\n'}
            {data.date.getWeek()} {self.formatDate(data.date)}{'\n'}
            {data.value}{'\n'}
            {data.place}
          </Text>
        </View>
      );
    });
  }

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
          Shake or press menu button for dev menu{'\n'}
        </Text>
        <ScrollView>
        {this.showMessages()}
        </ScrollView>
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
  message: {
    color: '#333333',
    marginBottom: 5,  
    marginLeft: 15,
  },
});

AppRegistry.registerComponent('orcamentoSMS', () => orcamentoSMS);
