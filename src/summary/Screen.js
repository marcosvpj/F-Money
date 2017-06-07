import React, { Component  } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Weeks from './Weeks';

import { Tile, Button } from 'react-native-elements';

export default class SummaryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: <Text style={styles.hideText} ></Text>,
    // headerRight: <Icon.Button name='gear' size={30} color="grey" backgroundColor= 'white' onPress={() => navigation.navigate('Config')}></Icon.Button>,
    // title: 'Controle de F-Money',
  });

  render () {
    let caption = 'Budget Semanal: R$ '+ 320.0.toFixed(2);
    caption += '\n' + 'Saldo disponível: R$ '+ 5000.0.toFixed(2);

    return (
      <View style={{flex:1}}>
        <View>
          <Tile
            height={Dimensions.get('window').height * .25}
            imageSrc={require('./title.jpg')}
            title="F-Money"
            featured
            caption={caption}
            captionStyle={styles.budget} />
        </View>
        <View style={styles.page}>
          <Weeks navigation={this.props.navigation} style={{ backgroundColor: '#50C1EA' }}/>
        </View>
        <View style={{paddingTop:5, justifyContent: 'center', alignItems: 'center', borderColor: "#e3e3e3", borderRadius: 3, borderWidth: 1, }}>
          <Icon name='gear'
            type='font-awesome'
            color='grey'
            size={30} style={{marginBottom:5}}
            onPress={() => this.props.navigation.navigate('Config')} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  budget: {
    backgroundColor: 'rgba(0, 0, 0, .3)',
    borderRadius: 3,
    padding: 10,
  },
  hideText:{ display:"none" }
});
// <Text style={styles.budget}>Budget Semanal: R$ {this.state.budget.toFixed(2)}</Text>
