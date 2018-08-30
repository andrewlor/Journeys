import React, { Component } from 'react';
import {
  Alert,
  TextInput,
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Picker
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Title2, Headline, Body, Icon } from 'react-native-ios-kit';
import { Actions } from 'react-native-router-flux';
import NumericInput from 'react-native-numeric-input';

import { CLEAR_CREATED_JOURNEY_LOG } from '../constants';
import { createJourneyLog, getJourney } from '../actions';

class NewCommitment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commits: [{}]
    };
  }

  componentDidMount() {
    if (this.props.commit_period) {
      this.setState({
        startdate: this.props.commit_period.startdate,
        enddate: this.props.commit_period.enddate,
        commits: this.props.commit_period.commits
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createdJourneyLog) {
      Actions.pop();
      this.props.getJourney(this.props.authToken, this.props.client, this.props.uid, this.props.journeyId);
      this.props.clearCreatedJourneyLog();
    }
  }
  
  _submit = () => {
    let log = this.state.log;

    let errors = [];
    if (log.length < 1) errors.push('Please enter a log.');
    if (log.split(' ').length < 10) errors.push('Your log should be a bit longer.');

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
      this.props.createJourneyLog(this.props.authToken, this.props.client, this.props.uid, this.props.journeyId, log);
    }
  }

  setCommit(obj, index) {
    let commits = this.state.commits;
    if (obj.description) commits[index].description = obj.description;
    if (obj.repetitions) commits[index].repetitions = obj.repetitions;
    this.setState({commits: commits});
  }

  addCommit() {
    let commits = this.state.commits;
    commits.push({});
    this.setState({commits: commits})
  }
  
  removeCommit(index) {
    let commits = this.state.commits;
    commits.splice(index, 1);
    this.setState({commits: commits});
  }

  renderCommitFields() {
    return (
      <View>
        {this.state.commits.map(
           (commit, index) => {
             return (
               <View key={index}>
                 <View style={style.element}>
                   <TextInput
                     value={commit.description ? commit.description : null}
                     placeholder='eg. Run 5km.'
                     onChangeText={(t) => this.setCommit({ description: t }, index)}
                     style={style.input}
                     underlineColorAndroid={'rgba(0,0,0,0)'}
                   />
                 </View>
                 <View style={[style.element, {flexDirection: 'row', alignItems: 'center', paddingTop: 0}]}>
                   <NumericInput
                     rounded
                     value={commit.repetitions ? commit.repetitions : null}
                     initValue={1}
                     minValue={1}
                     onChange={(x) => this.setCommit({ repetitions: x}, index)}
                   />
                   <Body style={{margin: 10}}>repetitions</Body>
                   <TouchableOpacity
                     onPress={() => this.removeCommit(index)}
                   >
                     <Icon size={30} name='ios-trash'/>
                   </TouchableOpacity>
                 </View>
               </View>
             );
           }
        )}
      </View>
    );
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Topbar down />
        <ScrollView>
          <View style={{ height: 10 }}/>
          {this.renderCommitFields()}
          <View style={style.element}>
            <Button
              rounded
              inverted
              onPress={() => {this.addCommit()}}
            >
              Add Commitment
            </Button>
          </View>
          <View style={style.element}>
            <Button
              rounded
              inverted
              onPress={this._submit}
            >
              Update Commitments
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
    createdJourneyLog: state.createdJourneyLog
  };
};

const mapDispatchToProps = dispatch => ({
  createJourneyLog: (authToken, client, uid, journeyId, log) => dispatch(createJourneyLog(authToken, client, uid, journeyId, log)),
  getJourney: (authToken, client, uid, journeyId) => dispatch(getJourney(authToken, client, uid, journeyId)),
  clearCreatedJourneyLog: () => dispatch({ type: CLEAR_CREATED_JOURNEY_LOG })
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCommitment);
