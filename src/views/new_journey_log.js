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

import { createJourney, index } from '../actions';

class NewJourneyLog extends Component {
  constructor() {
    super();
    this.state = {
      log: '',
      data: null,
      unit: null
    };
  }

  _onPress = () => {
    this.props.clearNewMember();
    Actions.pop();
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Topbar down />
        <ScrollView>
          <View style={{ height: 10 }}/>
          <View style={style.element}>
            <Headline>Log Entry</Headline>
            <TextInput
              placeholder='Today I did ...'
              autoCapitalize='none'
              onChangeText={(t) => this.setState({log: t})}
              style={style.input}
            />
          </View>
          <View style={style.element}>
            <Headline>Data</Headline>
            <TextInput
              keyboardType='numeric'
              autoCapitalize='none'
              onChangeText={(t) => this.setState({data: t})}
              style={style.input}
            />
          </View>
          <View style={style.element}>
            <Headline>Unit</Headline>
            <Picker
              selectedValue={this.state.unit}
              onValueChange={(val, idx) => this.setState({unit: val})}>
              <Picker.Item label="km" value="km" />
              <Picker.Item label="mi" value="mi" />
              <Picker.Item label="lbs" value="lbs" />
              <Picker.Item label="kg" value="kg" />
            </Picker>
          </View>
          <View style={style.element}>
            <Button
              rounded
              inverted
              onPress={this._submit}
            >
              Add Log
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
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewJourneyLog);
