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
  Image,
} from 'react-native';
import Seatmap from 'react-seatmap';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

export default class Verify extends Component {
constructor(props) {
  super(props)

  this.state = {
    TextFirstName: '',
    TextEmailAddress: '',
    TextContact: '',
  }
}

submit = () => {
    const {TextFirstName} = this.state;
    const {TextEmailAddress} = this.state;
    const {TextContact} = this.state;

    if (TextFirstName == '' || TextEmailAddress == '' || TextContact == '') {
      Alert.alert("Fill Up the Validation Form");
    }
    else{
      Alert.alert("The barcode has been sent on your Email/Contact")
     Actions.movies()
    }
  }

  render() {
    return (
      <View style = {styles._view1}>
      <View style = {styles._view2}>
      <Image style={styles._img1}
          source={require('../images/logo.png')}/>
      </View>
      <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter First Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onSubmitEditing={() => { this.secondTextInput.focus(); }}
               blurOnSubmit={false}
               returnKeyType = { "next" }
               onChangeText={TextFirstName => this.setState({TextFirstName})}
              />
      <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Email Address"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               keyboardType="email-address"
               returnKeyType = { "next" }
               ref={(input) => { this.secondTextInput = input; }}
               onChangeText={TextEmailAddress => this.setState({TextEmailAddress})}
              />
      <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Contact Number"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               keyboardType = 'numeric'
               onChangeText={TextContact => this.setState({TextContact})}
              />

      <TouchableOpacity
               style = {styles.submitButton}
               onPress = {this.submit}>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
_view1: {
      alignItems: 'center',
      marginTop: 40,
   },

_view2: {
    bottom: 20,
},
    _img1: {
    height: 200,
    width:200,
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