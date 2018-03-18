import React from 'react';
import { View, Text,  Alert, Button, TextInput, StyleSheet,
        TouchableOpacity, Platform, Dimensions, Image} from 'react-native';
import {Card, CardItem,  H1, H3, Thumbnail } from 'native-base';
import Root from './Root';
export default class QA extends React.Component {
  state = {
    screen: 0,
}
Backt= async()=>{
 this.setState({
   screen: 1
 })
}
  render() {
    if(this.state.screen ==1){
      return(<Root/>);
    }
    return (
      <View style={{
          paddingTop: Expo.Constants.statusBarHeight,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1}}>
          <TouchableOpacity onPress={this.Backt}>
        <View style={{flex: 1}}>
        <H3> Back</H3>
        <Text>_____________________________________________________________</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={{width: (Dimensions.get('window').width-50), height: 50,backgroundColor: 'orange', justifyContent: 'center',
        alignItems: 'center',}}>
        <H1> Ask a new question </H1>
        </View>
        </TouchableOpacity>
        </View>
    );
  }
}
