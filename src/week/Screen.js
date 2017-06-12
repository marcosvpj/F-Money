import React, { Component  } from 'react';
import { View, StyleSheet, Button, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Timeline from 'react-native-timeline-listview'

export default class WeekScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Semana '+navigation.state.params.n_week,
  });

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.n_week = params.n_week;
    this.purchases = params.purchases;
    this.total = params.total;
    this.timeline = [];
    //   {key:'1', time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
    //   {key:'2', time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
    //   {key:'3', time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
    //   {key:'4', time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
    //   {key:'5', time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
    // ];

    this.timeline = this.purchases.map(function(w, i) {
      return {time: w.date.formatBR(), title: 'R$ '+ w.value.toFixed(2), description: w.place}
    });

    console.log(params);
    console.log(params.purchases);
  }

  render () {

    let week_start = Date.prototype.getWeeksDays(this.n_week)[0].formatBR();
    let week_end = Date.prototype.getWeeksDays(this.n_week)[1].formatBR();

    return (
      <View style={styles.page}>
        <View style={{marginVertical:10}}>
          <Text>Semana {this.n_week} ({week_start} - {week_end})</Text>
          <Text>Transações {this.purchases.length}</Text>
          <Text>Total R$ {this.total.toFixed(2)}</Text>
        </View>
        <Timeline data={this.timeline} />
      </View>
    );
        // <Button title='gear' onPress={() => this.props.navigation.navigate('Config', { user: 'Lucy' })}></Button>
  }
        // <ScrollView>
        //   {
        //     this.purchases.map(function(w, i) {
        //       return (<Text key={i.toString()} style={styles.itens}>{w.date.formatBR()} - R$ {w.value.toFixed(2)}{'\n'}{w.place}</Text>)
        //     })
        //   }
        // </ScrollView>
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  itens: {
    marginBottom: 5,
  }
});