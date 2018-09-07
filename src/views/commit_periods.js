import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { DefaultTheme, Button, Body, Headline, Icon, Title2 } from 'react-native-ios-kit';
import { Actions } from 'react-native-router-flux';

import { CLEAR_EDITED_COMMIT } from '../constants';
import Topbar from './ui/topbar';
import { editCommit, getJourney } from '../actions';
import Spinner from './ui/spinner';

class CommitPeriods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedIndex: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editedCommit) {
      this.props.getJourney(this.props.authToken, this.props.client, this.props.uid, this.props.journeyId);
      this.props.clearEditedCommit();
    }
  }

  _submit(commitId) {
    this.props.editCommit(this.props.authToken, this.props.client, this.props.uid, this.props.journeyId, commitId);
  }

  toggleExpansion(index) {
    if (index == this.state.expandedIndex) {
      this.setState({ expandedIndex: -1 })
    } else {
      this.setState({ expandedIndex: index })
    }
  }

  journey() {
    return this.props.journeyCache[String(this.props.journeyId)]
  }

  canEditJourney() {
    return this.props.uid === this.journey().user_email;
  }

  renderAddCommitsLink(commitPeriod) {
    if (this.canEditJourney()) {
      return <Button onPress={() => { Actions.newCommitment({ commitPeriod: commitPeriod, journeyId: this.props.journeyId }) }}>Add commitments</Button>;
    } else { return null; }
  }

  renderCommit(commit, completed, repetitionNumber) {
    let renderRepetitionNumber = repetitionNumber ? `(${repetitionNumber})` : null;
    if (completed) {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}} key={commit.id}>
          <Icon size={50} style={{ color: DefaultTheme.positiveColor }} name='ios-checkmark-circle'/>
          <Body style={{margin: 10}}>{commit.description} {renderRepetitionNumber}</Body>
        </View>
      );
    } else {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}} key={commit.id}>
          {this.canEditJourney() ?
           <TouchableOpacity
             onPress={() => this._submit(commit.id)}
             >
             <Icon size={50} name='ios-checkmark-circle-outline'/>
           </TouchableOpacity>
           :
           <Icon size={50} name='ios-checkmark-circle-outline'/>
          }
          <Body style={{margin: 10}}>{commit.description} {renderRepetitionNumber}</Body>
        </View>
      );
    }
      
  }

  renderCommits(commit_period) {
    if (commit_period.commits.length > 0) {
      return (
        <View>
          {commit_period.commits.sort((a, b) => { return a.id - b.id }).map((commit) => {
             if (commit.repetitions > 1) {
               return (
                 <View key={commit.id}>
                   {Array.from(Array(commit.repetitions).keys()).map((index) => {
                      return (
                        <View key={index}>
                          {this.renderCommit(commit, index < commit.repetitions_completed, index + 1)}
                        </View>
                      );
                   })}
                 </View>
               );
             } else {
               return this.renderCommit(commit, commit.repetitions === commit.repetitions_completed);
             }
          })}
          {this.renderAddCommitsLink(commit_period)}
        </View>
      );
    } else {
      return (
        <View>
          <Headline>No commitments yet.</Headline>
          {this.renderAddCommitsLink(commit_period)}
        </View>
      );
    }
  }

  renderCommitPeriods(journey) {
    if (journey.commit_periods.length > 0) {
      return (
        <View>
          {journey.commit_periods.map((commit_period, index) => {
             return (
               <View key={commit_period.id}>
                 <TouchableOpacity onPress={() => this.toggleExpansion(index)}>
                   <View style={[style.journey, {flexDirection: 'row', alignItems: 'center'}]}>
                     <Headline>{commit_period.startdate} to {commit_period.enddate}</Headline>
                     <View style={{flex: 1}}/>
                     {this.state.expandedIndex == index ? <Icon size={30} name='ios-arrow-down' /> : <Icon size={30} name='ios-arrow-up' />}
                   </View>
                 </TouchableOpacity>
                 {this.state.expandedIndex == index ? 
                  <View style={[style.journey, {backgroundColor: DefaultTheme.footnoteBackgroundColor}]}>
                    {this.renderCommits(commit_period)}
                  </View> : null }
               </View>
             );
          })}
        </View>
      );
    } else {
      return (
        <View>
          <Headline>No commitments yet.</Headline>
        </View>
      );
    }
  }
  
  render() {
    let journey = this.journey();
    return (
      <View style={{flex: 1}}>
        <Topbar back />
        {this.props.isLoading ?
         <Spinner/>
         :
         <ScrollView>
           <View style={[style.journey, {backgroundColor: DefaultTheme.footnoteBackgroundColor}]}>
             <Title2>Weekly Commitments</Title2>
           </View>
           {this.renderCommitPeriods(journey)}
         </ScrollView>
        }
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
    journeyCache: state.journeyCache,
    isLoading: state.isLoading,
    editedCommit: state.editedCommit
  };
};

const mapDispatchToProps = dispatch => ({
  editCommit: (authToken, client, uid, journeyId, commitId) => dispatch(editCommit(authToken, client, uid, journeyId, commitId)),
  clearEditedCommit: () => dispatch({type: CLEAR_EDITED_COMMIT}),
  getJourney: (authToken, client, uid, journeyId) => dispatch(getJourney(authToken, client, uid, journeyId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitPeriods);
