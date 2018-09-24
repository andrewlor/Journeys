import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Body, Headline, Icon, DefaultTheme } from 'react-native-ios-kit';
import Dimensions from 'Dimensions';

export default class InfoBubble extends Component {
  constructor() {
    super();
    this.state = {
      render: false
    };
  }

  render () {
    if (this.state.render) {
      return (
        <View style={[style.bubble, { width: Dimensions.get('window').width - 20 } ]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Headline style={style.text}>Tip</Headline>
            <View style={{ flex: 1 }}/>
            <TouchableOpacity
              onPress={() => this.setState({ render: false })}
            >
              <Icon size={30} name='ios-close' style={style.text} />
            </TouchableOpacity>
            
          </View>
          <Body style={style.text}>{this.props.text}</Body>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => this.setState({ render: true })}
          style={[style.bubble, {width: 50, height: 50, justifyContent: 'center', alignItems: 'center'}]}
        >
          <Icon size={40} name='ios-help' style={style.text} />
        </TouchableOpacity>
      );
    }
  }
}

const style = StyleSheet.create({
  bubble: {
    backgroundColor: DefaultTheme.primaryColor,
    borderRadius: 10,
    padding: 10,
    paddingTop: 5,
    margin: 5,
    position: 'absolute',
    bottom: 5,
    right: 5
  },
  text: {
    color: 'white'
  }
});
