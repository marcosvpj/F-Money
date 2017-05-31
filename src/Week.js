import React, { PureComponent  } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';


class Week extends PureComponent  {
  constructor(props) {
    super(props)

    this.messages = Array();
    this.byWeek = [];

    this.state = {messages:this.messages, byWeek:this.byWeek, budget: 320.00};
    this.fetchData();

  }

  async fetchData() {
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
        this.setState({messages: this.messages, byWeek: this.byWeek});
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

  showWeeks() {
    var self = this;
    return this.state.byWeek.map(function(w, i){
      return(
        <View key={i} style={styles.week}>
          <Text style={styles.message}>Semana {w.week}</Text>
          <Text style={styles.message}>Total R$ {w.total.toFixed(2)}</Text>
        </View>
      );
    });
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Text style={styles.budget}>Budget Semanal: R$ {this.state.budget.toFixed(2)}</Text>
        <View style={styles.scroll}>
          <ScrollView style={styles.scroll}>
            {this.showWeeks()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default function CurrentStateIndicator({ state, style }: *) {
  return (
    <View style={[styles.page, style]}>
      <Week />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    height: 300
  },
  week: {
    backgroundColor: 'rgba(0, 0, 0, .1)',
    borderRadius: 3,
    padding: 5,
    marginHorizontal:10,
    marginBottom:10,
  },
  budget: {
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, .1)',
    borderRadius: 3,
    padding: 20,
    margin: 10,
  },
});