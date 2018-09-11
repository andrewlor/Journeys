import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { connect } from 'react-redux';
import { Title2, Headline, Body, DefaultTheme, Button, Icon } from 'react-native-ios-kit';
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
          <View style={[style.journey, {backgroundColor: DefaultTheme.footnoteBackgroundColor}]}>
            <Title2>Logs</Title2>
          </View>
          {journey.journey_logs.map((journeyLog) => {
             return (
               <View style={style.journey} key={journeyLog.id}>
                 <Headline>{journeyLog.created_at}</Headline>
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ProfilePicture uri={journey.user_image} size={50}/>
                <View style={{paddingLeft: 10}}>
                  <Title2>{journey.title}</Title2>
                  <Body>{journey.created_at} <Headline>{journey.username}</Headline></Body>
                </View>
              </View>
              <View style={{height: 10}}></View>
              <Headline>Mission Statement</Headline>
              <Body>{journey.mission_statement}</Body>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <View style={[style.journey, {flexDirection: 'row', alignItems: 'center'}]}>
                <Headline>Milestones</Headline>
                <View style={{flex: 1}}/>
                <Icon size={30} name='ios-arrow-forward' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.commitPeriods({ journeyId: this.props.journeyId })}>
              <View style={[style.journey, {flexDirection: 'row', alignItems: 'center'}]}>
                <Headline>Weekly Commitments</Headline>
                <View style={{flex: 1}}/>
                <Icon size={30} name='ios-arrow-forward' />
              </View>
            </TouchableOpacity>
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
