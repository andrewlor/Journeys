import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';
import { Headline, Body, Button } from 'react-native-ios-kit';
import { Actions } from 'react-native-router-flux';

import { CLEAR_EDITED_JOURNEY } from '../../constants';
import { editJourney, getJourney } from '../../actions';
import { Spinner } from '../../ui';

class EditJourneyScreen extends Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      missionStatement: props.missionStatement
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editedJourney) {
      Actions.pop();
      this.props.getJourney(this.props.authToken, this.props.client, this.props.uid, this.props.journeyId);
      this.props.clearEditJourney();
    }
  }
  
  _submit = () => {
    let missionStatement = this.state.missionStatement;

    let errors = [];
    if (missionStatement.length < 1) errors.push('Please enter a mission statement.');

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
      this.props.editJourney(this.props.authToken, this.props.client, this.props.uid, this.props.journeyId, missionStatement);
    }
  }
  
  render() {
    if (this.props.isLoading) return <Spinner />;
    return (
      <View style={style.background}>
        <Topbar down />
        <View style={style.element}>
          <Headline>Misson statement:</Headline>
          <TextInput
            multiline
            placeholder='I want to learn to develop and maintain Ruby web apps.'
            autoCapitalize='none'
            value={this.state.missionStatement}
            onChangeText={(t) => this.setState({missionStatement: t})}
            style={[style.input, { height: 150, padding: 5 }]}
            underlineColorAndroid={'rgba(0,0,0,0)'}
          />
        </View>
        <View style={style.element}>
          <Button
            rounded
            inverted
            onPress={this._submit}
          >
            Update Journey
          </Button>
        </View>
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
    marginVertical: 5,
    textAlignVertical: 'top'
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
    editedJourney: state.editedJourney,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = dispatch => ({
  getJourney: (authToken, client, uid, journeyId) => dispatch(getJourney(authToken, client, uid, journeyId)),
  editJourney: (authToken, client, uid, id, ms) => dispatch(editJourney(authToken, client, uid, id, ms)),
  clearEditJourney: () => dispatch({ type: CLEAR_EDITED_JOURNEY })
});

export default connect(mapStateToProps, mapDispatchToProps)(EditJourneyScreen);
