import './Date';

import React, { PureComponent  } from 'react';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import SimplePage from './SimplePage';
import Purchases from './Purchases';
import Week from './Week';
import Configuration from './Configuration';

// class ProcessPurchases extends PureComponent  {
//   constructor(props) {
//     super(props);
//     console.log('ProcessPurchases::constructor');
//     console.log(this.props.messages);

//     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

//     this.state = {
//       dataSource: ds.cloneWithRows(this.props.messages)
//     };
//   }

//   render() {
//     console.log('ProcessPurchases::render');
//     return (
//       <View style={{flex: 1, paddingTop: 22}}>
//         <Text>Mensagens</Text>
//         <ListView
//           enableEmptySections={true}
//           dataSource={this.state.dataSource}
//           renderRow={(rowData) => <Text>{rowData.message}</Text>}/>
//       </View>
//       );
//   }
// }



export default class orcamentoSMS extends PureComponent  {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    index: 0,
    routes: [
      // { key: '1', title: 'Inicio' },
      { key: '2', title: 'Semana' },
      { key: '3', title: 'Todas' },
      { key: '4', icon: 'gear' },
    ],
  };

  _renderIcon = ({ route }) => {
    return <Icon name={route.icon} size={30} color="white" />;
  };

  _handleChangeTab = index => {
    this.setState({ index });
    console.log(index);
  }

  _renderHeader = props => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        renderIcon={this._renderIcon}
        labelStyle={styles.label}/>
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return (
          <SimplePage
            state={this.state}
            style={{ backgroundColor: '#673ab7' }}/>
        );
      case '2':
        return (
          <Week
            state={this.state}
            style={{ backgroundColor: '#50C1EA' }}/>
        );
      case '3':
        return (
          <Purchases
            state={this.state}
            style={{ backgroundColor: '#4caf50' }}/>
        );
      case '4':
        return (
          <Configuration
            state={this.state}
            style={{ backgroundColor: '#ff4081' }}/>
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  tabbar: {
    backgroundColor: '#222',
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    color: '#fff',
    fontWeight: '400',
  },
});

AppRegistry.registerComponent('orcamentoSMS', () => orcamentoSMS);
