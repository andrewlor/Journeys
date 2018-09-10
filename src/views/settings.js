import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Headline, Body, Button } from 'react-native-ios-kit';
import { Actions } from 'react-native-router-flux';
import { logout } from '../actions';

class Settings extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.authToken) Actions.replace('login');
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{padding: 20, alignItems: 'center'}}>
          <Headline>{this.props.user.nickname}</Headline>
          <Body>{this.props.user.email}</Body>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <Button
            onPress={() => this.props.logout()}
            centered
            inverted
            rounded
          >Logout</Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.authToken,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
