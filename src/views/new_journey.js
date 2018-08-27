import React, { Component } from 'react';
import { Alert, TextInput, Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button, Title2, Headline, Body, Icon } from 'react-native-ios-kit';
import { Actions } from 'react-native-router-flux';

import { CLEAR_CREATED_JOURNEY } from '../constants';
import Topbar from './ui/topbar';
import { createJourney, index, myJourneys } from '../actions';

class NewJourney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      missionStatement: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createdJourney) {
      Actions.pop();
      this.props.index(this.props.authToken, this.props.client, this.props.uid);
      this.props.myJourneys(this.props.authToken, this.props.client, this.props.uid);
      this.props.clearCreatedJourney();
    }
  }

  _submit = () => {
    let title = this.state.title;
    let missionStatement = this.state.missionStatement;

    let errors = [];
    if (title.length < 1) errors.push('Please enter a title.');
    if (missionStatement.length < 1) errors.push('Please enter a mission statement.');
    if (missionStatement.split(' ').length < 10) errors.push('Your mission statement should be a bit longer.');

    if (errors.length > 0) {
      Alert.alert(
        errors[0],
        null,
        [
          {text: 'Ok'},
        ],
        { cancelable: false }
      );
    } else {
      this.props.createJourney(this.props.authToken, this.props.client, this.props.uid, title, missionStatement);
    }
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <Topbar down/>
        <ScrollView>
          <View style={{ height: 10 }}/>
          <View style={style.element}>
            <Headline>My Journey to ...</Headline>
            <TextInput
              placeholder='learn Ruby'
              autoCapitalize='none'
              onChangeText={(t) => this.setState({title: t})}
              style={style.input}
            />
          </View>
          <View style={style.element}>
            <Headline>Misson statement:</Headline>
            <TextInput
              placeholder='I want to learn to develop and maintain Ruby web apps.'
              autoCapitalize='none'
              onChangeText={(t) => this.setState({missionStatement: t})}
              style={style.input}
            />
          </View>
          <View style={style.element}>
            <Button
              rounded
              inverted
              onPress={this._submit}
            >
              Start Journey
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  input: {
    width: '100%',
    padding: 15,
    fontSize: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 5
  },
  element: {
    padding: 10,
    paddingHorizontal: 20
  },
});

const mapStateToProps = state => {
  return {
    authToken: state.authToken,
    client: state.client,
    uid: state.uid,
    createdJourney: state.createdJourney
  };
};

const mapDispatchToProps = dispatch => ({
  createJourney: (authToken, client, uid, title, missionStatement) => dispatch(createJourney(authToken, client, uid, title, missionStatement)),
  index: (authToken, client, uid) => dispatch(index(authToken, client, uid)),
  myJourneys: (authToken, client, uid) => dispatch(myJourneys(authToken, client, uid)),
  clearCreatedJourney: () => dispatch({ type: CLEAR_CREATED_JOURNEY })
});

export default connect(mapStateToProps, mapDispatchToProps)(NewJourney);
