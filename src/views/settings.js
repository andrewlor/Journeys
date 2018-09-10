import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { Headline, Body, Button } from 'react-native-ios-kit';
import { Actions } from 'react-native-router-flux';

import { logout } from '../actions';
import ProfilePicture from './ui/profile_picture';

class Settings extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.authToken) Actions.replace('login');
  }
  
  render() {
    if (!this.props.user) return null;
    return (
      <View style={{flex: 1}}>
        <View style={{padding: 20, alignItems: 'center'}}>
          <ProfilePicture uri={this.props.user.image.url}/>
          <View style={{height: 20}}/>
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
