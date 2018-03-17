import React from 'react';
import { View, Text,  Alert, Button, TextInput, StyleSheet,
        TouchableOpacity, Platform, Dimensions, Image } from 'react-native';
import {Card, CardItem,  H1 } from 'native-base';

import QA from './QA';
import Syllabus from './Syllabus';
import Tutor from './Tutor';
import Projects from './Projects';


export default class Root extends React.Component {
  state = {
    screen: 0,
}

  render() {
    if(this.state.screen == 0){
      return (
        <View style={{
            paddingTop: Expo.Constants.statusBarHeight,
            justifyContent: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,}}>
          <View style={{flex: 1}}>
          <H1> Guru-Guidance </H1>
          </View>
        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: (Dimensions.get('window').width-50)/2, height: 125, backgroundColor: 'powderblue'}} />
          <View style={{width: (Dimensions.get('window').width-50)/2, height: 125, backgroundColor: 'red'}} />
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: (Dimensions.get('window').width-50)/2, height: 125, backgroundColor: 'powderblue'}} />
          <View style={{width: (Dimensions.get('window').width-50)/2, height: 125, backgroundColor: 'red'}} />
        </View>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',}}>
        <Text style={{
          fontSize: 15
          }}> Powered by </Text>
        <Image  source={require('./images/ibm.png')}/>
        </View>
        </View>
      );
    }
    else if(this.state.screen == 1){
      <Syllabus/>
    }
    else if(this.state.screen == 2){
      <Tutor/>
    }
    else if(this.state.screen ==3){
      <QA/>
    }
    else {
      <Projects/>
    }
  }
}
