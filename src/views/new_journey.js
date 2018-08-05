import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Title2, Headline, Body, Icon } from 'react-native-ios-kit';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Actions } from 'react-native-router-flux';

class NewJourney extends Component {
  
  render() {
    return (
      <View style={{flex: 1}}>
      </View>
    );
  }
}

const style = StyleSheet.create({
  topBar: {
    marginTop: getStatusBarHeight(),
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  },
  journey: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: getStatusBarHeight(),
  }
});

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewJourney);
