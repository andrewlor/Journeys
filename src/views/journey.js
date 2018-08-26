import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Title2, Headline, Body, DefaultTheme } from 'react-native-ios-kit';
import { Actions } from 'react-native-router-flux';
import Topbar from './ui/topbar';

class Journey extends Component {
  
  renderJourneyLogs() {
    journey = this.props.journeys.find((j) => {return j.id == this.props.journeyId});
    if (journey.journey_logs.length > 0) {
      return (
        <View>
          {journey.journey_logs.map((journeyLog) => {
             return (
               <View style={style.journey} key={journeyLog.id}>
                 <Headline>{new Date(journeyLog.created_at).toLocaleDateString("en-CA", {month: 'long', day: 'numeric', year: 'numeric' })}</Headline>
                 <Body>{journeyLog.log}</Body>
               </View>
             );
          })}
        </View>
      );
    } else {
      return (
        <View style={[style.journey, {backgroundColor: DefaultTheme.footnoteBackgroundColor}]}>
          <Headline>No logs yet.</Headline>
        </View>
      );
    }
  }
  
  render() {
    let journey = this.props.journeys.find((j) => {return j.id == this.props.journeyId});
    return (
      <View style={{flex: 1}}>
        <Topbar
          back
          rightButtonPress={() => Actions.newJourneyLog({journeyId: this.props.journeyId})}
          rightButtonIcon="ios-create"
        />
        <ScrollView contentContainerStyle={{padding: 0, margin: 0}}>
          <View style={style.journey}>
            <Title2>{journey.title}</Title2>
            <Headline>Started on {new Date(journey.created_at).toLocaleDateString("en-CA", {month: 'long', day: 'numeric', year: 'numeric' })}</Headline>
            <View style={{height: 10}}></View>
            <Headline>Mission Statement: <Body>{journey.mission_statement}</Body></Headline>
          </View>
          {this.renderJourneyLogs()}
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  journey: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: DefaultTheme.dividerColor,
    backgroundColor: 'white'
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
