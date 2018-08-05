import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-ios-kit';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { index } from '../actions';
import Settings from './settings';
import Main from './main'
import { Actions } from 'react-native-router-flux';
import TabNavigator from 'react-native-tab-navigator';

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'main',
    }
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: getStatusBarHeight()}}></View>
        <View style={style.topBar}>
          <Text style={style.title}>Journeys</Text>
        </View>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'main'}
            title="My Journeys"
            renderIcon={() => <Icon name='ios-paper-outline' size={25} color='grey'/>}
            renderSelectedIcon={() => <Icon name='ios-paper-outline' size={25}/>}
            onPress={() => this.setState({ selectedTab: 'main' })}>
            <Main/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'add'}
            title="Add Journey"
            renderIcon={() => <Icon name='ios-add' size={25} color='grey'/>}
            renderSelectedIcon={() => <Icon name='ios-add' size={25}/>}
            onPress={() => this.setState({ selectedTab: 'add' })}>
            <Main/>
          </TabNavigator.Item>
        </TabNavigator>
        <TouchableOpacity
          onPress={Actions.settings}
          style={style.icon}
        >
          <Icon
            name={'ios-settings'}
            size={30}
            color={'blue'}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const settingsRoute = {
  component: Settings,
  title: 'settings'
}

const style = StyleSheet.create({
  topBar: {
    padding: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'pacifico'
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 20 + getStatusBarHeight(),
  }
});
