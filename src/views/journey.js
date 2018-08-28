import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Title2, Headline, Body, DefaultTheme, Button } from 'react-native-ios-kit';
import { Actions } from 'react-native-router-flux';
import Topbar from './ui/topbar';

import { getJourney } from '../actions';
import Spinner from './ui/spinner';

class Journey extends Component {

  componentDidMount() {
    if (!this.props.journeyCache[String(this.props.journeyId)]) {
      this.props.getJourney(this.props.authToken, this.props.client, this.props.uid, this.props.journeyId);
    }
  }

  journey() {
    return this.props.journeyCache[String(this.props.journeyId)]
  }

  canEditJourney() {
    return this.props.uid === this.journey().user_email;
  }
  
  renderJourneyLogs(journey) {
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

  renderTopBar() {
    if (this.canEditJourney()) {
      return (
        <Topbar
          back
          rightButtonPress={() => Actions.newJourneyLog({journeyId: this.props.journeyId})}
          rightButtonIcon="ios-create"
        />
      );
    } else {
      return <Topbar back />;
    }
  }

  renderAddCommitmentsLink() {
    return this.canEditJourney() ? <Button onPress={Actions.newCommitment}>Add commitments</Button> : null;
  }

  renderCommitments(journey) {
    if (journey.commit_periods.length > 1) {
      <View>
        {journey.commit_periods.map((commit_period) => {
           return (
             <View style={style.journey} key={commit_period.id}>
               <Headline>{new Date(commit_period.startdate).toLocaleDateString("en-CA", {month: 'long', day: 'numeric', year: 'numeric' })} to {new Date(commit_period.enddate).toLocaleDateString("en-CA", {month: 'long', day: 'numeric', year: 'numeric' })}</Headline>
               <Body>{commit_period.commits}</Body>
             </View>
           );
        })}
      </View>
    } else {
      return (
        <View style={[style.journey, {backgroundColor: DefaultTheme.footnoteBackgroundColor}]}>
          <Headline>No commitments yet.</Headline>
          {this.renderAddCommitmentsLink()}
        </View>
      );
    }
  }
  
  render() {
    let journey = this.journey();
    if (this.props.isLoading) {
      return <Spinner/>;
    } else if (journey) {
      return (
        <View style={{flex: 1}}>
          {this.renderTopBar()}
          <ScrollView contentContainerStyle={{padding: 0, margin: 0}}>
            <View style={style.journey}>
              <Title2>{journey.title}</Title2>
              <Body>Started on {new Date(journey.created_at).toLocaleDateString("en-CA", {month: 'long', day: 'numeric', year: 'numeric' })}</Body>
              <View style={{height: 10}}></View>
              <Headline>Mission Statement: <Body>{journey.mission_statement}</Body></Headline>
            </View>
            {this.renderCommitments(journey)}
            {this.renderJourneyLogs(journey)}
          </ScrollView>
        </View>
      );
    } else {
      return null;
    }
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
    authToken: state.authToken,
    client: state.client,
    uid: state.uid,
    isLoading: state.isLoading,
    journeyCache: state.journeyCache
  };
};

const mapDispatchToProps = dispatch => ({
  getJourney: (authToken, client, uid, journeyId) => dispatch(getJourney(authToken, client, uid, journeyId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Journey);
