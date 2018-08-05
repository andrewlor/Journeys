import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Headline, Body, Button, Icon } from 'react-native-ios-kit';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { logout } from '../actions';
import { Actions } from 'react-native-router-flux';

class Settings extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.authToken) Actions.popTo('login')
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: getStatusBarHeight()}}></View>
        <View></View>
        <Button
          onPress={() => this.props.logout()}
          centered
          inverted
          rounded
        >Logout</Button>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.authToken,
    
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
