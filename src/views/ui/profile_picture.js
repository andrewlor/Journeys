import React from 'react';
import { Image } from 'react-native';
import { Icon } from 'react-native-ios-kit';

export default ProfilePicture = props => {
  const IMAGE_SIZE = 100;
  if (props.uri) {
    return (
      <Image
        borderRadius={IMAGE_SIZE / 2}
        style={{ height: IMAGE_SIZE, width: IMAGE_SIZE}}
        source={{ uri: props.uri }}
      />
    );
  } else {
    return (
      <Icon
        size={IMAGE_SIZE}
        name='ios-person'
      />
    );
  }
}
