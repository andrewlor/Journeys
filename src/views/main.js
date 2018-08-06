import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Title2, Headline, Body, Button, Icon } from 'react-native-ios-kit';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { index } from '../actions';
import Journey from './journey';
import { Actions } from 'react-native-router-flux';

class Main extends Component {

  componentDidMount() {
    this.props.index(this.props.authToken, this.props.client, this.props.uid);
  }

  pushJourney(id) {
    console.log(`PUSHING JOURNEY ${id}`)
    Actions.journey({journeyId: id})
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
                   <Title2>{journey.title}</Title2>
                   <Headline>{new Date(journey.created_at).toLocaleDateString("en-US")}</Headline>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    backgroundColor: 'white'
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
