import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Headline, Body, Button } from 'react-native-ios-kit';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { index, logout } from '../actions';

class Main extends Component {

  componentDidMount() {
    this.props.index(this.props.authToken, this.props.client, this.props.uid);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.authToken) this.props.navigator.pop()
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
        <Button
          onPress={this.props.logout}
          centered
          rounded
          inverted
        >Logout</Button>
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
  }
});

const nextRoute = {
//  component: Journey,
//  title: 'journey'
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
  index: (authToken, client, uid) => dispatch(index(authToken, client, uid)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
