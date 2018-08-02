import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { TabBar, Icon } from 'react-native-ios-kit';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { index } from '../actions';
import Settings from './settings';
import Main from './main'

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    }
  }

  renderContent() {
    switch(this.state.activeTab) {
      case 0:
        return <Main/>;
      default:
        return null;
    }
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: getStatusBarHeight()}}></View>
        <View style={style.topBar}>
          <Text style={style.title}>Journeys</Text>
        </View>
        {this.renderContent()}
        <TabBar
          tabs={[
            {
              icon: 'ios-paper-outline',
              title: 'All Journeys',
              onPress: () => this.setState({activeTab: 0}),
              isActive: this.state.activeTab === 0,
            },
            {
              icon: 'ios-add',
              title: 'New Journey',
              onPress: () => this.setState({activeTab: 1}),
              isActive: this.state.activeTab === 1,
            },
            {
              icon: 'ios-people',
              title: 'Me',
              onPress: () => this.setState({activeTab: 2}),
              isActive: this.state.activeTab === 2,
            },
          ]}
        />
        <TouchableOpacity
          onPress={() => this.props.navigator.push(settingsRoute)}
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
