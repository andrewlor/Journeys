import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Headline, Body, Button, Icon, TabBar } from 'react-native-ios-kit';
import { getStatusBarHeight } from 'react-native-status-bar-height';

class Journey extends Component {
  render() {
    let journey = this.props.journeys.find((j) => {return j.id == this.props.journeyId})
    return (
      <View style={{flex: 1}}>
        <View style={style.topBar}></View>
        <View style={style.journey}>
          <Headline>{journey.title}</Headline>
          <Body>{journey.mission_statement}</Body>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigator.pop()}
          style={style.icon}
        >
          <Icon
            name={'ios-arrow-back'}
            size={30}
            color={'blue'}
          />
        </TouchableOpacity>
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
    journeys: state.indexJourneys
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Journey);
