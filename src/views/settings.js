import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Headline, Body, Button, Icon } from 'react-native-ios-kit';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { logout } from '../actions';

class Settings extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.authToken) this.props.navigator.popN(2)
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: getStatusBarHeight()}}></View>
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
    authToken: state.authToken
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
