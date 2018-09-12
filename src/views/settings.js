import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageStore } from 'react-native';
import { connect } from 'react-redux';
import { Headline, Body, Button } from 'react-native-ios-kit';
import { Actions } from 'react-native-router-flux';
import { ImagePicker, Permissions } from 'expo';

import { logout, uploadProfilePicture } from '../actions';
import ProfilePicture from './ui/profile_picture';
import Spinner from './ui/spinner';

class Settings extends Component {

  componentWillReceiveProps(nextProps) {
    if (!nextProps.authToken) Actions.replace('login');
  }

  _pickPhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        quality: 0
      });
      if (!result.cancelled) this.props.uploadProfilePicture(this.props.authToken, this.props.client, this.props.uid, result.base64);
    }
  }

  render() {
    if (!this.props.user) return null;
    if (this.props.isLoading) return <Spinner/>;
    return (
      <View style={{flex: 1}}>
        <View style={{padding: 20, alignItems: 'center'}}>
          <ProfilePicture uri={this.props.user.image.url}/>
          <Button
            onPress={this._pickPhoto}
            style={{marginTop: 5}}
          >Edit</Button>
          <View style={{height: 20}}/>
          <Headline>{this.props.user.nickname}</Headline>
          <Body>{this.props.user.email}</Body>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <Button
            onPress={() => this.props.logout()}
            centered
            inverted
            rounded
          >Logout</Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    authToken: state.authToken,
    client: state.client,
    uid: state.uid,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  uploadProfilePicture: (authToken, client, uid, photo) => dispatch(uploadProfilePicture(authToken, client, uid, photo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
