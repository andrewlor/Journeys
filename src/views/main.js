import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
//import Title from '../Text/Title.js';
//import JourneyPartial from '../Partials/Journey.js';
//import Journey from './Journey.js';

export default class Main extends Component {
  
  selectJourney = (title, author) => {
    let route = nextRoute;
    route.passProps = {
      title: title,
      author: author
    };
    this.props.navigator.push(route);
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={style.topBar}>
          <Text style={style.title}>Journeys</Text>
        </View>
        <ScrollView contentContainerStyle={{padding: 0, margin: 0}}>
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  topBar: {
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'pacifico'
  }
});

const nextRoute = {
//  component: Journey,
//  title: 'journey'
};
