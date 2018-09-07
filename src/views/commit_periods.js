import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { DefaultTheme, Button, Body, Headline, Icon, Title2 } from 'react-native-ios-kit';
import { Actions } from 'react-native-router-flux';

import Topbar from './ui/topbar';

class CommitPeriods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedIndex: 0
    };
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

  renderAddCommitsLink(commitPeriod) {
    return <Button onPress={() => { Actions.newCommitment({ commitPeriod: commitPeriod, journeyId: this.props.journeyId }) }}>Add commitments</Button>;
  }

  renderCommits(commit_period) {
    if (commit_period.commits.length > 0) {
      return (
        <View>
          {commit_period.commits.map((commit) => {
             if (commit.repetitions > 1) {
               return (
                 <View key={commit.id}>
                   {Array.from(Array(commit.repetitions).keys()).map((index) => {
                      return (
                        <View style={{flexDirection: 'row', alignItems: 'center'}} key={index}>
                          <Icon size={50} name='ios-checkmark-circle-outline'/>
                          <Body style={{margin: 10}}>{commit.description} {index + 1}</Body>
                        </View>
                      );
                   })}
                 </View>
               );
             } else {
               return (
                 <View style={{flexDirection: 'row', alignItems: 'center'}} key={commit.id}>
                   <Icon size={50} name='ios-checkmark-circle-outline'/>
                   <Body style={{margin: 10}}>{commit.description}</Body>
                 </View>
               );
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
        <ScrollView>
          <View style={[style.journey, {backgroundColor: DefaultTheme.footnoteBackgroundColor}]}>
            <Title2>Weekly Commitments</Title2>
          </View>
          {this.renderCommitPeriods(journey)}
        </ScrollView>
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
    journeyCache: state.journeyCache
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitPeriods);
