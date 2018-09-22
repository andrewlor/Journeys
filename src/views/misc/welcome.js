import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Title1, Title2, Body, Button, DefaultTheme } from 'react-native-ios-kit';
import Carousel from 'react-native-carousel-view';
import { Actions } from 'react-native-router-flux';

import { clearNewMember } from '../../actions';

class Welcome extends Component {

  _onPress = () => {
    this.props.clearNewMember();
    Actions.pop();
  }
  
  render() {
    let pages = [
      {
        image: require('../../../assets/images/sail.png'),
        imageStyle: { width: 256, height: 180 },
        bigTitle: "Welcome to Journeys",
        title: "Your journey starts here.",
        body: "Journeys is the self help app that will help you discipline yourself and improve your life."
      },
      {
        image: require('../../../assets/images/work.png'),
        imageStyle: { width: 256, height: 180 },
        bigTitle: "How it works",
        title: "Set your aim.",
        body: "Envision what you want to accomplish in the long term. This is your long term goal for 2 - 5 years. You should be overly ambitious."
      },
      {
        image: require('../../../assets/images/workout.png'),
        imageStyle: { width: 255, height: 167 },
        bigTitle: "How it works",
        title: "Commit.",
        body: "Commit to taking specific actions that lead you towards your goal. These are short term goals that you are going to do tomorrow and should be easy enough that you will actually stick to the plan."
      },
      {
        image: require('../../../assets/images/peace.png'),
        imageStyle: { width: 246, height: 173 },
        bigTitle: "How it works",
        title: "Make Progress.",
        body: "Once you've followed through with your commitments, you're ready for more challenges. This is when you will start to see progress."
      }
    ];
    
    return (
      <View style={style.background}>
        <View style={style.topBar}/>
        <Carousel
          animate={false}
          indicatorSize={10}
          height={600}
          indicatorOffset={20}
        >
          {pages.map((page, index) => (
            <View style={style.page} key={index}>
              <Title1 style={style.text}>{page.bigTitle}</Title1>
              <Image style={[style.image, page.imageStyle]} source={page.image} />
              <Title2 style={style.text}>{page.title}</Title2>
              <Body style={[style.text, {marginTop: 0}]}>{page.body}</Body>
              {index == pages.length - 1 ? 
               <Button
                 onPress={this._onPress}
                 inverted
                 rounded
               >Get Started</Button>
               : null }
            </View>
          ))}
        </Carousel>
      </View>
    );
  }
}

const style = StyleSheet.create({
  background: {
    backgroundColor: "hsl(211.29999999999995, 100%, 60%)",
    opacity: 0.8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topBar: {
    height: getStatusBarHeight()
  },
  image: {
    margin: 10
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 20
  },
  page: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  }
});


const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => ({
  clearNewMember: () => dispatch(clearNewMember())
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
