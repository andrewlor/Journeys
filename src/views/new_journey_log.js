import React, { Component } from 'react';
import {
  Alert,
  TextInput,
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Picker,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Title2, Headline, Body, Icon } from 'react-native-ios-kit';
import { Actions } from 'react-native-router-flux';
import { ImagePicker, Permissions } from 'expo';
import FlexImage from 'react-native-flex-image';

import { Spinner, InfoBubble } from './ui';
import { CLEAR_CREATED_JOURNEY_LOG } from '../constants';
import { createJourneyLog, getJourney } from '../actions';

class NewJourneyLog extends Component {
  constructor() {
    super();
    this.state = {
      log: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createdJourneyLog) {
      Actions.pop();
      this.props.getJourney(this.props.authToken, this.props.client, this.props.uid, this.props.journeyId);
      this.props.clearCreatedJourneyLog();
    }
  }

  _pickPhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true
      });
      if (!result.cancelled) this.setState({imageBase64: result.base64, imagePath: result.uri});
    }
  }
  
  _submit = () => {
    let log = this.state.log;
    let imageBase64 = this.state.imageBase64;

    let errors = [];
    if (log.length < 1) errors.push('Please enter a log.');

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
      this.props.createJourneyLog(this.props.authToken, this.props.client, this.props.uid, this.props.journeyId, log, imageBase64);
    }
  }

  renderDataPointFields() {
    if (this.state.renderDataPointFields) {
      return (
        <View style={style.element}>
          <TextInput
            placeholder='5'
            keyboardType='numeric'
            autoCapitalize='none'
            onChangeText={(t) => this.setState({data: t})}
            style={[style.input, { height: 150, padding: 5 }]}
          />
          <Picker
            selectedValue={this.state.unit}
            onValueChange={(val, idx) => this.setState({unit: val})}>
            <Picker.Item label="km" value="km" />
            <Picker.Item label="mi" value="mi" />
            <Picker.Item label="lbs" value="lbs" />
            <Picker.Item label="kg" value="kg" />
          </Picker>
        </View>
      );
    } else {
      return (
        <View style={style.element}>
          <Button
            rounded
            inverted
            onPress={() => this.setState({renderDataPointFields: true})}
          >
            Add Data Point
          </Button>
        </View>
      );
    }
  }
  
  render() {
    if (this.props.isLoading) return <Spinner />;
    return (
      <View style={{ flex: 1 }}>
        <Topbar down />
        <ScrollView>
          <View style={{ height: 10 }}/>
          <View style={style.element}>
            <TextInput
              multiline
              placeholder='Today I did ...'
              autoCapitalize='none'
              onChangeText={(t) => this.setState({log: t})}
              style={[style.input, { height: 150, padding: 5 }]}
              underlineColorAndroid={'rgba(0,0,0,0)'}
            />
          </View>
          {this.state.imagePath ?
           <View>
             <View style={style.element}>
               <FlexImage
                 source={{uri: this.state.imagePath}}
               />
             </View>
             <View style={style.element}>
               <Button
                 onPress={this._pickPhoto}
               >Edit Photo</Button>
             </View>
           </View>
           :
           <View style={style.element}>
             <Button
               onPress={this._pickPhoto}
             >Add Photo</Button>
           </View>}
          <View style={style.element}>
            <Button
              rounded
              inverted
              onPress={this._submit}
            >
              Submit Journey Log
            </Button>
          </View>
        </ScrollView>
        <InfoBubble text='Write a short description of any experiences you are having along your journey. This can include the completing of commitments, making progress or challanges you are facing.' />
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
    createdJourneyLog: state.createdJourneyLog,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = dispatch => ({
  createJourneyLog: (authToken, client, uid, journeyId, log, image) => dispatch(createJourneyLog(authToken, client, uid, journeyId, log, image)),
  getJourney: (authToken, client, uid, journeyId) => dispatch(getJourney(authToken, client, uid, journeyId)),
  clearCreatedJourneyLog: () => dispatch({ type: CLEAR_CREATED_JOURNEY_LOG })
});

export default connect(mapStateToProps, mapDispatchToProps)(NewJourneyLog);
