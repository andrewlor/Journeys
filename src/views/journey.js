import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Title2, Headline, Body, Icon } from 'react-native-ios-kit';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Actions } from 'react-native-router-flux';

class Journey extends Component {
  
  renderJourneyLogs() {
    journey = this.props.journeys.find((j) => {return j.id == this.props.journeyId});
    if (journey.journey_logs.length > 0) {
      return (
        <ScrollView contentContainerStyle={{padding: 0, margin: 0}}>
          {journey.journey_logs.map((journeyLog) => {
             return (
               <TouchableOpacity key={journeyLog.id}>
                 <View style={style.journey}>
                   <Headline>{new Date(journeyLog.created_at).toLocaleDateString("en-US")}</Headline>
                   <Body>{journeyLog.log}</Body>
                 </View>
               </TouchableOpacity>
             );
          })}
        </ScrollView>
      );
    } else {
      return null;
    }
  }
  
  render() {
    let journey = this.props.journeys.find((j) => {return j.id == this.props.journeyId});
    return (
      <View style={{flex: 1}}>
        <View style={style.topBar}></View>
        <View style={style.journey}>
          <Title2>{journey.title}</Title2>
          <Headline>{journey.user.email} on {new Date(journey.created_at).toLocaleDateString("en-US")}</Headline>
          <Body>{journey.mission_statement}</Body>
        </View>
        {this.renderJourneyLogs()}
        <TouchableOpacity
          onPress={Actions.pop}
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
