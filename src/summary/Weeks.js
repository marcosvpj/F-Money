import '../Date';
import React, { PureComponent  } from 'react';
import { Image, View, Text, ScrollView, StyleSheet, AsyncStorage, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import { Card, Grid, Col, Row, Button, Tile } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import config from '../config.json';

export default function CurrentStateIndicator({ state, style, navigation }: *) {
  class Week extends PureComponent {
    constructor(props) {
      super(props);
      this.navigation = this.props.navigation;
    }

    render () {
      let good_icon = (<Icon name='thumbs-up' size={30} color="#2ACB34" />);
      let bad_icon = (<Icon name='thumbs-down' size={30} color="#BA043D" />);
      let icon = this.props.total < this.props.budget ? good_icon : bad_icon;
      let params = this.props;

      let week_start = Date.prototype.getWeeksDays(this.props.n_week)[0].formatBR();
      let week_end = Date.prototype.getWeeksDays(this.props.n_week)[1].formatBR();

      let title = 'Semana ' + this.props.n_week + ' [' + week_start + ' - ' + week_end + ']';
      return (
        <Card
          onPress={() => this.navigation.navigate('Week', params)}
          title={ title }
          key={this.props.n_week}>
            <Grid>
              <Col style={{marginLeft: 15, width:40}}>{icon}<Text></Text></Col>
              <Col style={{marginBottom: 10}}>
                <Text>Transações: {this.props.purchases.length}</Text>
                <Text>Total R$ {this.props.total.toFixed(2)}</Text>
              </Col>
            </Grid>
                <Button
                  raised
                  icon={{name: 'description', size:30 }}
                  title='Detalhes'
                  onPress={() => this.navigation.navigate('Week', params)} />
        </Card>
      );
        // <TouchableNativeFeedback
        //   key={this.props.n_week}
        //   onPress={() => this.navigation.navigate('Week', params)}
        //   style={styles.week}>
        //   <View style={{flex:1, flexDirection: 'row'}}>
        //     <View style={{marginVertical:14, marginHorizontal:10}}>
        //       {icon}
        //     </View>
        //     <View style={{flex:1, marginVertical:10}}>
        //       <Text style={styles.message}>Semana {this.props.n_week} ({week_start} - {week_end})</Text>
        //       <Text style={styles.message}>Total R$ {this.props.total.toFixed(2)}</Text>
        //     </View>
        //   </View>
        // </TouchableNativeFeedback>
    }
  }

  class Weeks extends PureComponent  {
    constructor(props) {
      super(props);

      this.navigation = navigation;

      this.messages = Array();
      this.processed = Array();
      this.byWeek = [];

      this.state = {messages:this.messages, byWeek:this.byWeek, budget: parseFloat(config.DEFAULT_WEEK_BUDGET)};
      this.fetchData();
      this.loadConfigWeek();
    }

    async loadConfigWeek() {
      try {
        const value = await AsyncStorage.getItem('@orcamentoSMS:budget_semanal');
        if (value !== null){
          this.setState({budget: parseFloat(value)});
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    }

    async fetchData() {
      let update = false;
      console.log('week::fetchData');
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
              var purchase = this.parseMessage(obj.body);
              if (this.processed.indexOf(obj._id) != -1) {
                continue;
              }
              this.messages.push(purchase);
              this.processed.push(obj._id);
              // console.log(this.processed);

              if (!this.byWeek[purchase.week]) {
                this.byWeek[purchase.week] = {week:purchase.week, total:0, purchases:[]};
              }
              this.byWeek[purchase.week].purchases.push(purchase);
              this.byWeek[purchase.week].total += purchase.value;


              update = true;
            }
          }

          this.byWeek.sort(function(a, b){
            return new Date(a.date) - new Date(b.date);
          });
          this.setState({messages: this.messages, byWeek: this.byWeek});
          if (update)
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
      place = place.pop();

      return {card_number:card_number, value:value, date:date, place:place, week:date.getWeek(), message: m};
    }

    showWeeks() {
      var self = this;
      return this.state.byWeek.map(function(w, i) {
        return (
          <Week key={w.week}
            budget={self.state.budget}
            n_week={w.week}
            total={w.total}
            navigation={self.navigation}
            purchases={w.purchases} />
        );
      });
    }

    update() {
      this.loadConfigWeek();
      this.fetchData();
    }

    render() {
      setInterval(() => this.update(), 2000);

      return (
        <View style={{flex:1}}>
          <View style={styles.scroll}>
            <ScrollView style={{flex:1, paddingBottom:5}}>
              {this.showWeeks()}
            </ScrollView>
          </View>
        </View>
      );
    }
  }

  console.log('week');
  return (
    <Weeks/>
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
    height: 300,
  },
  week: {
    backgroundColor: 'rgba(0, 0, 0, .1)',
    borderRadius: 3,
    marginHorizontal:10,
    marginBottom:10,
    flex: 1, flexDirection: 'row',
  },
});