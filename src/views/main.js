import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Headline, Body, Button, Icon, TabBar } from 'react-native-ios-kit';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { index } from '../actions';
import Journey from './journey';

class Main extends Component {

  componentDidMount() {
    this.props.index(this.props.authToken, this.props.client, this.props.uid);
  }

  pushJourney(id) {
    console.log(`PUSHING JOURNEY ${id}`)
    this.props.navigator.push({
      component: Journey,
      name: 'journey',
      passProps: { journeyId: id }
    })
  }

  renderJourneys() {
    if (this.props.journeys.length > 0) {
      return (
        <ScrollView contentContainerStyle={{padding: 0, margin: 0}}>
          {this.props.journeys.map((journey) => {
             return (
               <TouchableOpacity
                 key={journey.id}
                 onPress={() => this.pushJourney(journey.id)}>
                 <View style={style.journey} key={journey.id}>
                   <Headline>{journey.title}</Headline>
                   <Body>{journey.mission_statement}</Body>
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
    return (
      <View style={{flex: 1}}>
        {this.renderJourneys()}
      </View>
    );
  }
}

const style = StyleSheet.create({
  journey: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  }
});

const mapStateToProps = state => {
  return {
    authToken: state.authToken,
    client: state.client,
    uid: state.uid,
    journeys: state.indexJourneys
  };
};

const mapDispatchToProps = dispatch => ({
  index: (authToken, client, uid) => dispatch(index(authToken, client, uid))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
