import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-ios-kit';
import TabNavigator from 'react-native-tab-navigator';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Actions } from 'react-native-router-flux';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import { Spinner, Topbar } from '../ui';
import { index, logout } from '../actions';
import Settings from './account/settings';
import MyJourneys from './journeys/my_journeys';
import NewJourney from './journeys/new_journey';
import Quotes from './misc/quotes';
import AllJourneys from './journeys/all_journeys';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'all_journeys',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authError) {
      this.props.logout();
      Actions.replace('login');
      alert('There was an authentication error. Please log in and try again.');
    }
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <Topbar title/>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'all_journeys'}
            title="All Journeys"
            renderIcon={() => <Icon name='ios-globe' size={25} color='grey'/>}
            renderSelectedIcon={() => <Icon name='ios-globe' size={25}/>}
            onPress={() => this.setState({ selectedTab: 'all_journeys' })}>
            <AllJourneys/>
          </TabNavigator.Item>
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
            selected={this.state.selectedTab === 'quotes'}
            title="Quotes"
            renderIcon={() => <Icon name='ios-quote' size={25} color='grey'/>}
            renderSelectedIcon={() => <Icon name='ios-quote' size={25}/>}
            onPress={() => this.setState({ selectedTab: 'quotes' })}>
            <Quotes/>
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
        <View style={style.spacer}/>
      </View>
    );
  }
}

const style = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 10,
    top: 20 + getStatusBarHeight(),
  },
  spacer: {
    backgroundColor: 'white',
    ...ifIphoneX({
      height: 20
    })
  }
});

const mapStateToProps = state => {
  return {
    authError: state.authError
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
