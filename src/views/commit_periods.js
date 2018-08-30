import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { DefaultTheme, Button, Body, Headline, Icon, Title2 } from 'react-native-ios-kit';
import { Actions } from 'react-native-router-flux';

import { formatRailsTimestamp } from '../helpers/date';
import Topbar from './ui/topbar';

class CommitPeriods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedIndex: 0
    };
  }

  journey() {
    return this.props.journeyCache[String(this.props.journeyId)]
  }

  renderCommits(commits) {
    if (commits.length > 0) {
      return (
        <View>
          {commits.map((commit) => {
             if (commit.repetitions > 1) {
               return (
                 <View key={commit.id}>
                   {Array.from(Array(commit.repetitions).keys()).map((index) => {
                      return (
                        <View style={{flexDirection: 'row', alignItems: 'center'}} key={index}>
                          <Icon size={30} name='ios-checkmark-circle-outline'/>
                          <Body style={{margin: 5}}>{commit.description} {index + 1}</Body>
                        </View>
                      );
                   })}
                 </View>
               );
             } else {
               return (
                 <View style={{flexDirection: 'row', alignItems: 'center'}} key={index}>
                   <Icon size={30} name='ios-checkmark-circle-outline'/>
                   <Body>{commit.description}</Body>
                 </View>
               );
             }
          })}
        </View>
      );
    } else {
      return <Headline>No commitments yet.</Headline>;
    }
  }

  renderCommitPeriods(journey) {
    if (journey.commit_periods.length > 0) {
      return (
        <View>
          {journey.commit_periods.map((commit_period, index) => {
             return (
               <TouchableOpacity key={commit_period.id} onPress={() => this.setState({ expandedIndex: index })}>
                 <View style={[style.journey, {flexDirection: 'row', alignItems: 'center'}]}>
                   <Headline>{formatRailsTimestamp(commit_period.startdate)} to {formatRailsTimestamp(commit_period.enddate)}</Headline>
                   <View style={{flex: 1}}/>
                  {this.state.expandedIndex == index ? <Icon size={30} name='ios-arrow-down' /> : <Icon size={30} name='ios-arrow-up' />}
                 </View>
               </TouchableOpacity>
             );
          })}
        </View>
      );
    } else {
      return (
        <View style={[style.journey, {backgroundColor: DefaultTheme.footnoteBackgroundColor}]}>
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
        <View style={[style.journey, {backgroundColor: DefaultTheme.footnoteBackgroundColor}]}>
          <Title2>Weekly Commitments</Title2>
        </View>
        {this.renderCommitPeriods(journey)}
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
    journeyCache: state.journeyCache
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitPeriods);
