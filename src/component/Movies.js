import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { movies } from '../component/data';
import MoviePoster from '../component/MoviePoster';
import MoviePopup from '../component/MoviePopup';

export default class Movies extends Component {
  
  // Add starting here
  state = {
    popupIsOpen: false,
    // Day chosen by user
    chosenDay: 0,       
    // Time chosen by user
    chosenTime: null,
  }

  openMovie = (movie) => {
    this.setState({
      popupIsOpen: true,
      movie,  
    });
  }

  closeMovie = () => {
    this.setState({
      popupIsOpen: false,
      
      chosenDay: 0,
      chosenTime: null,
    });
  }

  chooseDay = (day) => {
    this.setState({
      chosenDay: day,
    });
  }

  chooseTime = (time) => {
    this.setState({
      chosenTime: time,
    });
  }

  bookTicket = () => {

    if (!this.state.chosenTime) {
      alert('Please select show time');
    } else {

      this.closeMovie();

      Actions.seat()
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}

          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {movies.map((movie, index) => <MoviePoster
            movie={movie}
            onOpen={this.openMovie}
            key={index}
          />)}
        </ScrollView>
        <MoviePopup
            movie={this.state.movie}
            isOpen={this.state.popupIsOpen}
            onClose={this.closeMovie}
            chosenDay={this.state.chosenDay}
            chosenTime={this.state.chosenTime}
            onChooseDay={this.chooseDay}
            onChooseTime={this.chooseTime}
            onBook={this.bookTicket}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,         
  },
  scrollContent: {
    flexDirection: 'row',  
    flexWrap: 'wrap',       
  },
});