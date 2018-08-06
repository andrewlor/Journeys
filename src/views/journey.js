import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Title2, Headline, Body } from 'react-native-ios-kit';
import { Actions } from 'react-native-router-flux';
import Topbar from './ui/topbar';

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
        <Topbar back/>
        <View style={style.journey}>
          <Title2>{journey.title}</Title2>
          <Headline style={{alignSelf: 'flex-start'}}>Mission Statement</Headline>
          <Body>{journey.mission_statement}</Body>
        </View>
        {this.renderJourneyLogs()}
      </View>
    );
  }
}

const style = StyleSheet.create({
  journey: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
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
