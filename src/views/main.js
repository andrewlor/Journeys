import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Headline, Body, Button, Icon } from 'react-native-ios-kit';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { index } from '../actions';
import Settings from './settings'

class Main extends Component {

  componentDidMount() {
    this.props.index(this.props.authToken, this.props.client, this.props.uid);
  }

  renderJourneys() {
    if (this.props.journeys.length > 0) {
      return (
        <ScrollView contentContainerStyle={{padding: 0, margin: 0}}>
          {this.props.journeys.map((journey) => {
             return (
               <View style={style.journey} key={journey.id}>
                 <Headline>{journey.title}</Headline>
                 <Body>{journey.mission_statement}</Body>
               </View>
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
        <View style={{height: getStatusBarHeight()}}></View>
        <View style={style.topBar}>
          <Text style={style.title}>Journeys</Text>
        </View>
        {this.renderJourneys()}
        <TouchableOpacity
          onPress={() => this.props.navigator.push(settingsRoute)}
          style={style.icon}
        >
          <Icon
            name={'ios-settings'}
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
    padding: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'pacifico'
  },
  journey: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 20 + getStatusBarHeight(),
  }
});

const settingsRoute = {
  component: Settings,
  title: 'settings'
};

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
