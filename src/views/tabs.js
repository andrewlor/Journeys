import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-ios-kit';
import TabNavigator from 'react-native-tab-navigator';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Actions } from 'react-native-router-flux';

import Topbar from './ui/topbar';
import { index } from '../actions';
import Settings from './settings';
import MyJourneys from './my_journeys';
import NewJourney from './new_journey';

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'my_journeys',
    }
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <Topbar title/>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'my_journeys'}
            title="My Journeys"
            renderIcon={() => <Icon name='ios-paper-outline' size={25} color='grey'/>}
            renderSelectedIcon={() => <Icon name='ios-paper-outline' size={25}/>}
            onPress={() => this.setState({ selectedTab: 'my_journeys' })}>
            <MyJourneys/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'add'}
            title="Add Journey"
            renderIcon={() => <Icon name='ios-add' size={25} color='grey'/>}
            renderSelectedIcon={() => <Icon name='ios-add' size={25}/>}
            onPress={() => {
                Actions.newJourney();
            }}>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'account'}
            title="Account"
            renderIcon={() => <Icon name='ios-person' size={25} color='grey'/>}
            renderSelectedIcon={() => <Icon name='ios-person' size={25}/>}
            onPress={() => this.setState({ selectedTab: 'account' })}>
            <Settings/>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const style = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 10,
    top: 20 + getStatusBarHeight(),
  }
});
