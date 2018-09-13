import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Body, Headline, Icon, DefaultTheme } from 'react-native-ios-kit';

export default class InfoBubble extends Component {
  constructor() {
    super();
    this.state = {
      render: true
    };
  }

  render () {
    if (this.state.render) {
      return (
        <View style={style.bubble}>
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
      return null;
    }
  }
}

const style = StyleSheet.create({
  bubble: {
    backgroundColor: DefaultTheme.primaryColor,
    borderRadius: 10,
    padding: 15,
    paddingTop: 5,
    margin: 15
  },
  text: {
    color: 'white'
  }
});
