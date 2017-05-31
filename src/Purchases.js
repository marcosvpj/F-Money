import React, { PureComponent  } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

class Purchases extends PureComponent  {
  constructor(props) {
    super(props)

    this.messages = Array();

    this.state = {messages:this.messages};
    this.fetchData();

    this.byWeek = [];
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
            // this.messages.push({message: obj.body});
            var purchase = this.parseMessage(obj.body);
            this.messages.push(purchase);

            if (!this.byWeek[purchase.week]) {
              this.byWeek[purchase.week] = {week:purchase.week, total:0, purchases:[]};
            }
            this.byWeek[purchase.week].purchases.push(purchase);
            this.byWeek[purchase.week].total += purchase.value;
          }
        }
        console.log(this.byWeek);
        this.setState({messages: this.messages});
        this.forceUpdate();
      }
    );
  }

  parseMessage(m) {
    var card_number = m.match(/\d\d\d\d/g);

    var value = m.match(/(R\$ \d*,\d*)/g).toString();
    value = value.trim();
    value = value.substring(2, value.length);
    value = value.trim();
    value = value.replace(',', '.');
    value = parseFloat(value);

    var date = m.match(/(\d\d\/\d\d \d\d:\d\d:\d\d)/g).toString();
    date = new Date(2017, date.substring(3,5), date.substring(0,2));

    var place = m.match(/Local: (.*\. )/g);

    return {card_number:card_number, value:value, date:date, place:place, week:date.getWeek(), message: m};
  }

  showMessages() {
    var self = this;
    return this.state.messages.map(function(m, i){
      let cartao = m.card_number ? 'Cartão: '+m.card_number : '';
      return(
        <View key={i}>
          <Text style={styles.message}>
            {m.date.formatBR()}{'\n'}
            {m.place} {cartao}{'\n'}
            R$ {m.value}{'\n'}
          </Text>
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.showMessages()}
      </ScrollView>
    );
  }
}

export default function CurrentStateIndicator({ state, style }: *) {
  return (
    <View style={[styles.page, style]}>
      <View>
        <Purchases />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
});