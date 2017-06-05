import React, { Component  } from 'react';
import { View, StyleSheet, Button, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        <ScrollView>
          {
            this.purchases.map(function(w, i) {
              return (<Text key={i.toString()} style={styles.itens}>{w.date.formatBR()} - R$ {w.value.toFixed(2)}{'\n'}{w.place}</Text>)
            })
          }
        </ScrollView>
      </View>
    );
        // <Button title='gear' onPress={() => this.props.navigation.navigate('Config', { user: 'Lucy' })}></Button>
  }
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