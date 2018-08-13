import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, DefaultTheme } from 'react-native-ios-kit';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Actions } from 'react-native-router-flux';

export default Topbar = props => {
  let innerContent = null;
  if (props.back) {
    innerContent = (
      <TouchableOpacity
        onPress={Actions.pop}
      >
        <Icon
          name={'ios-arrow-back'}
          size={30}
          color={'blue'}
        />
      </TouchableOpacity>
    );
  }

  if (props.title) {
    innerContent = (
      <View>
        {innerContent}
        <Text style={style.title}>Journeys</Text>
      </View>
    );
  }

  let rightButton = null;
  if (props.rightButtonPress) {
    rightButton = (
      <TouchableOpacity
        onPress={props.rightButtonPress}
      >
        <Icon
          name={props.rightButtonIcon}
          size={30}
          color={'blue'}
        />
      </TouchableOpacity>
    );
  }
  
  return (
    <View style={style.topBar}>
      <View style={{ flexDirection: 'row' }}>
        {innerContent}
        <View style={{ flex: 1 }}/>
        {rightButton}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  topBar: {
    borderTopWidth: getStatusBarHeight(),
    borderTopColor: 'white',
    minHeight: 40,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: DefaultTheme.dividerColor,
    padding: 10,
    backgroundColor: 'white',
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: getStatusBarHeight(),
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'pacifico'
  }
});
