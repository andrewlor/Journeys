import React from 'react';
import { Image, View } from 'react-native';
import { Icon, DefaultTheme } from 'react-native-ios-kit';

export default ProfilePicture = props => {
  const IMAGE_SIZE = props.size ? props.size : 100;
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
      <View style={{
        height: IMAGE_SIZE,
        width: IMAGE_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DefaultTheme.primaryLightColor,
        borderRadius: IMAGE_SIZE / 2
      }}>
        <Icon
          size={IMAGE_SIZE}
          name='ios-person'
        />
      </View>
    );
  }
}
