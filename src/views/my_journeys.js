import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Title2, Headline, Body, Button, Icon, DefaultTheme } from 'react-native-ios-kit';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Journey from './journey';
import { Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';

import { CLEAR_ACTION_COMPLETED_FLAG } from '../constants';
import { myJourneys, deleteJourney } from '../actions';
import { Spinner } from './ui';

class MyJourneys extends Component {

  _getJourneys = () => {
    this.props.myJourneys(this.props.authToken, this.props.client, this.props.uid);
  }

  componentDidMount() {
    this._getJourneys();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.actionCompleted) {
      this.props.myJourneys(this.props.authToken, this.props.client, this.props.uid);
      this.props.clearActionCompletedFlag();
    }
  }

  pushJourney(id) {
    Actions.journey({journeyId: id});
  }

  renderJourneys() {
    if (this.props.isLoading) return <Spinner />;
    if (this.props.journeys.length > 0) {
      return (
        <ScrollView
          contentContainerStyle={{padding: 0, margin: 0}}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isLoading}
                         onRefresh={this._getJourneys}
            />
          }
        >
          <View>
            {this.props.journeys.map((journey) => {
               const swipeoutBtns = [
                 {
                   text: 'Delete',
                   onPress: () => { this.props.deleteJourney(this.props.authToken, this.props.client, this.props.uid, journey.id) },
                   backgroundColor: 'red'
                 }
               ];
               return (
                 <Swipeout right={swipeoutBtns} key={journey.id}>
                   <TouchableOpacity
                     onPress={() => this.pushJourney(journey.id)}>
                     <View style={style.journey} key={journey.id}>
                       <Title2>{journey.title}</Title2>
                       <Body>{journey.created_at}</Body>
                     </View>
                   </TouchableOpacity>
                 </Swipeout>
               );
            })}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={[style.journey, {backgroundColor: DefaultTheme.footnoteBackgroundColor}]}>
          <Headline>No journeys yet.</Headline>
        </View>
      );
    }
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderJourneys()}
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
    authToken: state.authToken,
    client: state.client,
    uid: state.uid,
    isLoading: state.isLoading,
    journeys: state.myJourneys,
    actionCompleted: state.actionCompleted
  };
};

const mapDispatchToProps = dispatch => ({
  myJourneys: (authToken, client, uid) => dispatch(myJourneys(authToken, client, uid)),
  deleteJourney: (authToken, client, uid, id) => dispatch(deleteJourney(authToken, client, uid, id)),
  clearActionCompletedFlag: () => dispatch({ type: CLEAR_ACTION_COMPLETED_FLAG })
});

export default connect(mapStateToProps, mapDispatchToProps)(MyJourneys);
