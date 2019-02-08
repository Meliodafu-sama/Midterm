import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { defaultStyles } from '../component/styles';
import Options from '../component/Options';

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// Set default popup height to 67% of screen height
const defaultHeight = height * 0.67;

export default class MoviePopup extends Component {

  static propTypes = {
  isOpen: PropTypes.bool.isRequired,
    // Movie object that has title, genre, poster, days and times
    movie: PropTypes.object,
    // Index of chosen day
    chosenDay: PropTypes.number,
    // Index of chosem show time
    chosenTime: PropTypes.number,
    // Gets called when user chooses day
    onChooseDay: PropTypes.func,
    // Gets called when user chooses time
    onChooseTime: PropTypes.func,
    // Gets called when user books their ticket
    onBook: PropTypes.func,
    // Gets called when popup closed
    onClose: PropTypes.func,
  }

  state = {
    // Animates slide ups and downs when popup open or closed
    position: new Animated.Value(this.props.isOpen ? 0 : height),
    // Backdrop opacity
    opacity: new Animated.Value(0),
    // Popup height that can be changed by pulling it up or down
    height: defaultHeight,
    // Expanded mode with bigger poster flag
    expanded: false,
    // Visibility flag
    visible: this.props.isOpen,
  };


  _previousHeight = 0

  componentWillMount() {
    // Initialize PanResponder to handle move gestures
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        // Ignore taps
        if (dx !== 0 && dy === 0) {
          return true;
        }
        return false;
      },
      onPanResponderGrant: (evt, gestureState) => {
        // Store previous height before user changed it
        this._previousHeight = this.state.height;
      },
      onPanResponderMove: (evt, gestureState) => {
        // Pull delta and velocity values for y axis from gestureState
        const { dy, vy } = gestureState;
        // Subtract delta y from previous height to get new height
        let newHeight = this._previousHeight - dy;


        LayoutAnimation.easeInEaseOut();


        if (newHeight > height - height / 5) {
          this.setState({ expanded: true });
        } else {
          this.setState({ expanded: false });
        }


        if (vy < -0.75) {
          this.setState({
            expanded: true,
            height: height
          });
        }

        else if (vy > 0.75) {
          this.props.onClose();
        }

        else if (newHeight < defaultHeight * 0.75) {
          this.props.onClose();

        else if (newHeight > height) {
          this.setState({ height: height });
        }
        else {
          this.setState({ height: newHeight });
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { dy } = gestureState;
        const newHeight = this._previousHeight - dy;

        if (newHeight < defaultHeight) {
          this.props.onClose();
        }

        this._previousHeight = this.state.height;
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    });
  }


  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.animateOpen();
    }
    else if (this.props.isOpen && !nextProps.isOpen) {
      this.animateClose();
    }
  }

  // Open popup
  animateOpen() {
    // Update state first
    this.setState({ visible: true }, () => {
      Animated.parallel([
        // Animate opacity
        Animated.timing(
          this.state.opacity, { toValue: 0.5 } // semi-transparent
        ),
        // And slide up
        Animated.timing(
          this.state.position, { toValue: 0 } // top of the screen
        ),
      ]).start();
    });
  }

  // Close popup
  animateClose() {
    Animated.parallel([
      // Animate opacity
      Animated.timing(
        this.state.opacity, { toValue: 0 } // transparent
      ),
      // Slide down
      Animated.timing(
        this.state.position, { toValue: height } // bottom of the screen
      ),
    ]).start(() => this.setState({
      // Reset to default values
      height: defaultHeight,
      expanded: false,
      visible: false,
    }));
  }

  // Dynamic styles that depend on state
  getStyles = () => {
    return {
      imageContainer: this.state.expanded ? {
        width: width / 2,         
      } : {
        maxWidth: 110,           
        marginRight: 10,
      },
      movieContainer: this.state.expanded ? {
        flexDirection: 'column',  
        alignItems: 'center',     
      } : {
        flexDirection: 'row',     
      },
      movieInfo: this.state.expanded ? {
        flex: 0,
        alignItems: 'center',     
        paddingTop: 20,
      } : {
        flex: 1,
        justifyContent: 'center', 
      },
      title: this.state.expanded ? {
        textAlign: 'center',
      } : {},
    };
  }

  render() {
    const {
      movie,
      chosenDay,
      chosenTime,
      onChooseDay,
      onChooseTime,
      onBook
    } = this.props;
    // Pull out movie data
    const { title, genre, poster, days, times } = movie || {};
    // Render nothing if not visible
    if (!this.state.visible) {
      return null;
    }
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.props.onClose}>
          <Animated.View style={[styles.backdrop, { opacity: this.state.opacity }]}/>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.modal, {
            // Animates height
            height: this.state.height,
            // Animates position on the screen
            transform: [{ translateY: this.state.position }, { translateX: 0 }]
          }]}
        >

          {/* Content */}
          <View style={styles.content}>
            {/* Movie poster, title and genre */}
            <View
              style={[styles.movieContainer, this.getStyles().movieContainer]}
              {...this._panResponder.panHandlers}
            >
              {/* Poster */}
              <View style={[styles.imageContainer, this.getStyles().imageContainer]}>
                <Image source={{ uri: poster }} style={styles.image} />
              </View>
              {/* Title and genre */}
              <View style={[styles.movieInfo, this.getStyles().movieInfo]}>
                <Text style={[styles.title, this.getStyles().title]}>{title}</Text>
                <Text style={styles.genre}>{genre}</Text>
              </View>
            </View>

            {/* Showtimes */}
            <View>
              {/* Day */}
              <Text style={styles.sectionHeader}>Day</Text>
              {/* TODO: Add day options here */}
              <Options
                  values={days}
                  chosen={chosenDay}
                  onChoose={onChooseDay}
                />
              {/* Time */}
              <Text style={styles.sectionHeader}>Showtime</Text>
              {/* TODO: Add show time options here */}
              <Options
                  values={times}
                  chosen={chosenTime}
                  onChoose={onChooseTime}
                />
            </View>

          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableHighlight
              underlayColor="#9575CD"
              style={styles.buttonContainer}
              onPress={onBook}
            >
              <Text style={styles.button}>Book My Tickets</Text>
            </TouchableHighlight>
          </View>

        </Animated.View>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  container: {
    ...StyleSheet.absoluteFillObject,   
    justifyContent: 'flex-end',         
    backgroundColor: 'transparent',     
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,   
    backgroundColor: 'black',
  },

  modal: {
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    margin: 20,
    marginBottom: 0,
  },

  movieContainer: {
    flex: 1,                            
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,                            
  },
  image: {
    borderRadius: 10,                   
    ...StyleSheet.absoluteFillObject,   
  },
  movieInfo: {
    backgroundColor: 'transparent',     
  title: {
    ...defaultStyles.text,
    fontSize: 20,
  },
  genre: {
    ...defaultStyles.text,
    color: '#BBBBBB',
    fontSize: 14,
  },
  sectionHeader: {
    ...defaultStyles.text,
    color: '#AAAAAA',
  },
  // Footer
  footer: {
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: '#673AB7',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  button: {
    ...defaultStyles.text,
    color: '#FFFFFF',
    fontSize: 18,
  },
});