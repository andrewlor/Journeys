import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Title2, Headline, Body, DefaultTheme, Button } from 'react-native-ios-kit';
import { Topbar } from '../../ui';

const quotes = [
  {
    quote: "Most people overestimate what they can do in a year. And they underestimate what they can do in two or three decades.",
    author: "Tony Robbins"
  },
  {
    quote: "Most people sort of dabble in the idea of improving themselves. The real way to do it is, you gotta write down what the fuck you want and then go after it.",
    author: "Joe Rogan"
  },
  {
    quote: "There are consequences that you pay to constantly seeking comfort.",
    author: "Joe Rogan"
  },
  {
    quote: "Pretend you are in the part of the movie that starts and shows you as a fucking loser, and just decide not to be a loser anymore.",
    author: "Joe Rogan"
  },
  {
    quote: "I love a success story, but even more than a success story, I like a dude that fucks his life up and gets it back together again story.",
    author: "Joe Rogan"
  }
];

class Quotes extends Component {
  constructor() {
    super();
    this.state = {
      quoteIndex: 0
    };
  }

  newQuote = () => {
    this.setState({ quoteIndex: this.state.quoteIndex + 1});
  }

  render() {
    let realQuoteIndex = this.state.quoteIndex % quotes.length
    return (
      <View style={{flex: 1}}>
        <View style={style.container}>
          <Title2 style={{textAlign: 'center'}}>"{quotes[realQuoteIndex].quote}"</Title2>
          <Headline style={{margin: 20}}>- {quotes[realQuoteIndex].author}</Headline>
        </View>
        <Button
          onPress={this.newQuote}
          inverted
          rounded
          style={style.button}
        >New Quote</Button>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20
  },
  button: {
    alignSelf: 'stretch',
    padding: 15,
    margin: 20
  }
});

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);
