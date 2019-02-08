import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Seatmap from 'react-seatmap';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

export default class Seat extends Component {
constructor(props) {
  super(props)

  this.state = {
    TextInputSeat: '',
  }
}

  verify = () => {
    const {TextInputSeat} = this.state;

    if (TextInputSeat == '' ) {
      Alert.alert("Indicate Seat Number");
    }
    else{
     Actions.verify()
    }
  }

  render() {
    return (
      <ImageBackground 
            source = {require('../images/Seat.png')}
            style = {styles.image}>
            <View style = {styles._view1}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Seat Number"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={TextInputSeat => this.setState({TextInputSeat})}/>

               <TouchableOpacity
               style = {styles.submitButton}
               onPress={this.verify}>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>

            </View>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create ({
    container: {
      flex: 1,
    },

    image: {
      flex: 1,
      width: '100%',
      height: '100%',
    },

    input: {
      margin: 15,
      height: 70,
      width: 250,
      borderColor: '#7a42f4',
      color:'#9a73ef',
      borderRadius: 30,
      borderWidth: 1,
      textAlign: 'center',
      fontSize: 18,
   },

   _view1: {
      alignItems: 'center',
      marginTop: 450,
   },

   submitButtonText:{
      color: 'white',
      fontSize: 18,
      textAlign:'center',
   },

   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 50,
      width: 130,
      borderRadius: 20,
   },

  });