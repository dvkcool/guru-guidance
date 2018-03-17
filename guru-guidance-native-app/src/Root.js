import React from 'react';
import { View, Text,  Alert, Button, TextInput, StyleSheet,
        TouchableOpacity, Platform, Dimensions, Image} from 'react-native';
import {Card, CardItem,  H1, H3, Thumbnail } from 'native-base';

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
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
          <H1> Guru-Guidance </H1>
          <Image source={require('./images/hand.png')}/>
          <View>
          <H3>"Building a bridge for communication between the Guru(s) and juniors"</H3>
          </View>
          </View>
        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',}}>
        <View style={{flex: 1, flexDirection: 'row',backgroundColor: 'powderblue'}}>
          <TouchableOpacity style={{paddingTop: 20}}>
          <View style={{width: (Dimensions.get('window').width-50)/2, height: 125,justifyContent: 'center',
          alignItems: 'center'}}>
          <Image source={require('./images/syllabus.png')}/>
          <Text>Syllabus </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingTop: 20}}>
          <View style={{width: (Dimensions.get('window').width-50)/2, height: 125,justifyContent: 'center',
          alignItems: 'center'}}>
          <Image source={require('./images/QA.png')}/>
          <Text>Q & A Forum </Text>
          </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'powderblue'}}>
        <TouchableOpacity>
        <View style={{width: (Dimensions.get('window').width-50)/2, height: 125,justifyContent: 'center',
        alignItems: 'center'}}>
        <Image source={require('./images/tutor.png')}/>
        <Text>Tutor </Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={{width: (Dimensions.get('window').width-50)/2, height: 125,justifyContent: 'center',
        alignItems: 'center'}}>
        <Image source={require('./images/projects.png')}/>
        <Text>Projects </Text>
        </View>
        </TouchableOpacity>
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
      return(<Syllabus/>);
    }
    else if(this.state.screen == 2){
      return(<Tutor/>);
    }
    else if(this.state.screen ==3){
      return(<QA/>);
    }
    else {
      return(<Projects/>);
    }
  }
}
