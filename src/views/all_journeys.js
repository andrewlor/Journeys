import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Title2, Headline, Body, Button, Icon, DefaultTheme } from 'react-native-ios-kit';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Journey from './journey';
import { Actions } from 'react-native-router-flux';

import { index } from '../actions';
import Spinner from './ui/spinner';

class AllJourneys extends Component {

  componentDidMount() {
    this.props.index(this.props.authToken, this.props.client, this.props.uid);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.journeys && nextProps.newMember) {
      setTimeout(() => Actions.welcome(), 750);
    }
  }

  pushJourney(id) {
    Actions.journey({journeyId: id});
  }

  renderJourneys() {
    if (this.props.isLoading) {
      return (
        <Spinner/>
      );
    } else if (this.props.journeys.length > 0) {
      return (
        <ScrollView contentContainerStyle={{padding: 0, margin: 0}}>
          <View>
            {this.props.journeys.map((journey) => {
               return (
                 <TouchableOpacity
                   key={journey.id}
                   onPress={() => this.pushJourney(journey.id)}>
                   <View style={style.journey} key={journey.id}>
                     <Title2>{journey.title}</Title2>
                     <Body>Started on {journey.created_at} by {journey.user_email}</Body>
                   </View>
                 </TouchableOpacity>
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
    journeys: state.indexJourneys,
    newMember: state.newMember
  };
};

const mapDispatchToProps = dispatch => ({
  index: (authToken, client, uid) => dispatch(index(authToken, client, uid))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllJourneys);
