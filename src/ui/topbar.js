import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, DefaultTheme } from 'react-native-ios-kit';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Actions } from 'react-native-router-flux';

export default Topbar = props => {
  let leftButton = null;
  let title = null;
  let rightButton = null;
  
  if (props.back || props.down) {
    leftButton = (
      <TouchableOpacity
        onPress={Actions.pop}
        style={{ paddingRight: 10 }}
      >
        <Icon
          name={props.back ? 'ios-arrow-back' : 'ios-arrow-down'}
          size={30}
          color={'blue'}
        />
      </TouchableOpacity>
    );
  }

  if (props.title) {
    title = (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
          <Text style={style.title}>Journeys</Text>
        </View>
      </View>
    );
  }

  if (props.rightButtonPress) {
    rightButton = (
      <TouchableOpacity
        onPress={props.rightButtonPress}
        style={{ paddingLeft: 10 }}
      >
        <Icon
          name={props.rightButtonIcon}
          size={30}
          color={'blue'}
        />
      </TouchableOpacity>
    );
  }

  let innerContent = null;
  if (title) {
    innerContent = title;
  } else {
    innerContent = (
      <View style={{ flexDirection: 'row' }}>
        {leftButton}
        <View style={{ flex: 1 }}/>
        {rightButton}
      </View>
    );
  }
  
  return (
    <View style={style.topBar}>
      {innerContent}
    </View>
  );
}

const style = StyleSheet.create({
  topBar: {
    borderTopWidth: getStatusBarHeight(),
    borderTopColor: 'white',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: DefaultTheme.dividerColor,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'pacifico'
  }
});
