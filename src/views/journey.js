import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, Switch, Image, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Title2, Headline, Body, DefaultTheme, Button, Icon } from 'react-native-ios-kit';
import { Actions } from 'react-native-router-flux';
import FlexImage from 'react-native-flex-image';
import Swipeout from 'react-native-swipeout';

import { CLEAR_ACTION_COMPLETED_FLAG } from '../constants';
import { getJourney, deleteJourneyLog } from '../actions';
import { Topbar, Spinner } from './ui';

class Journey extends Component {

  _getJourney = () => {
    this.props.getJourney(this.props.authToken, this.props.client, this.props.uid, this.props.journeyId);
  }

  componentDidMount() {
    if (!this.props.journeyCache[String(this.props.journeyId)]) {
      this._getJourney();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.actionCompleted) {
      this.props.getJourney(this.props.authToken, this.props.client, this.props.uid, this.props.journeyId);
      this.props.clearActionCompletedFlag();
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
             const swipeoutBtns = [
               {
                 text: 'Delete',
                 onPress: () => { this.props.deleteJourneyLog(this.props.authToken, this.props.client, this.props.uid, this.props.journeyId, journeyLog.id) },
                 backgroundColor: 'red'
               }
             ];
             return (
               <Swipeout key={journeyLog.id} right={swipeoutBtns} disable={!this.canEditJourney()}>
                 <View style={style.journey}>
                   <Headline>{journeyLog.created_at}</Headline>
                   <Body>{journeyLog.log}</Body>
                   {journeyLog.image.url ?
                    <FlexImage
                      source={{uri: journeyLog.image.url}}
                      style={{marginTop: 10}}
                    />
                    : null }
                 </View>
               </Swipeout>
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

  editJourney = (ms) => {
    Actions.editJourney({missionStatement: ms, journeyId: this.props.journeyId});
  }
  
  render() {
    let journey = this.journey();
    if (this.props.isLoading) return <Spinner />;
    if (journey) {
      return (
        <View style={{flex: 1}}>
          {this.renderTopBar()}
          <ScrollView
            contentContainerStyle={{padding: 0, margin: 0}}
            refreshControl={
              <RefreshControl
                refreshing={this.props.isLoading}
                           onRefresh={this._getJourney}
              />
            }
          >
            <View style={style.journey}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ProfilePicture uri={journey.user_image} size={50}/>
                <View style={{paddingHorizontal: 20, paddingRight: 40}}>
                  <Title2>{journey.title}</Title2>
                  <Body>{journey.created_at} <Headline>{journey.username}</Headline></Body>
                </View>
              </View>
              <View style={{height: 10}}></View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Headline>Mission Statement</Headline>
                <View style={{flex:1}}/>
                {this.canEditJourney() ? <Button onPress={() => this.editJourney(journey.mission_statement)}>Edit</Button> : null}
              </View>
              <Body>{journey.mission_statement}</Body>
            </View>
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
    journeyCache: state.journeyCache,
    actionCompleted: state.actionCompleted
  };
};

const mapDispatchToProps = dispatch => ({
  getJourney: (authToken, client, uid, journeyId) => dispatch(getJourney(authToken, client, uid, journeyId)),
  deleteJourneyLog: (authToken, client, uid, journeyId, id) => dispatch(deleteJourneyLog(authToken, client, uid, journeyId, id)),
  clearActionCompletedFlag: () => dispatch({ type: CLEAR_ACTION_COMPLETED_FLAG })
});

export default connect(mapStateToProps, mapDispatchToProps)(Journey);
