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

import { CLEAR_CREATED_COMMITS } from '../constants';
import { createCommits, getJourney } from '../actions';
import { Spinner, InfoBubble } from './ui';

class NewCommitment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commits: [{description: ''}]
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createdCommits) {
      Actions.pop();
      this.props.getJourney(this.props.authToken, this.props.client, this.props.uid, this.props.journeyId);
      this.props.clearCreatedCommits();
    }
  }
  
  _submit = () => {
    let commits = this.state.commits;

    let errors = [];
    commits.forEach((commit) => {
      if (commit.description.length < 1) errors.push('Please enter a commit description.');
      if (commit.repetitions && commit.repetitions < 1) errors.push('Repetitions must be positive');
    });

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
      this.props.createCommits(
        this.props.authToken, this.props.client, this.props.uid,
        this.props.journeyId, this.props.commitPeriod.id, commits
      );
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
    commits.push({ description: '' });
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
                     value={commit.description}
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
                     onChange={(x) => this.setCommit({ repetitions: x }, index)}
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
    if (this.props.isLoading) return <Spinner />;
    return (
      <View style={{ flex: 1 }}>
        <Topbar down />
        <ScrollView>
          <View style={style.element}>
            <Title2>Commits for {this.props.commitPeriod.startdate} - {this.props.commitPeriod.enddate}</Title2>
          </View>
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
              Make Commitments
            </Button>
          </View>
        </ScrollView>
        <InfoBubble text='Make sure you aim low with your commitments, you will not beable to delete them after, but you can always add more later.' />
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
    createdCommits: state.createdCommits,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = dispatch => ({
  createCommits: (authToken, client, uid, journeyId, commitPeriodId, commits) => dispatch(createCommits(authToken, client, uid, journeyId, commitPeriodId, commits)),
  getJourney: (authToken, client, uid, journeyId) => dispatch(getJourney(authToken, client, uid, journeyId)),
  clearCreatedCommits: () => dispatch({ type: CLEAR_CREATED_COMMITS })
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCommitment);
