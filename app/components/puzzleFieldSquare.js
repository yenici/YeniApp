import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  Vibration,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { PZ_SQUARE_FROZEN } from '../reducers/puzzle';

class PuzzleFieldSquare extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.square !== nextProps.square
      || this.props.fontSize !== nextProps.fontSize
      || this.props.gameFinished !== nextProps.gameFinished
      || this.props.onPress !== nextProps.onPress;
  }

  render() {
    return (
      <TouchableHighlight
        style={[styles.puzzleFieldSquare, this.props.square.value === 0 ? styles.puzzleFieldSquareEmpty : '']}
        activeOpacity={this.props.gameFinished || this.props.square.isVisible ? 1 : 0.5}
        underlayColor={'lightgray'}
        disabled={this.props.gameFinished || this.props.square.moveTo === PZ_SQUARE_FROZEN}
        onPress={() => this.props.onPress(this.props.square.index)}
      >
        <Text
          style={[
            styles.puzzleFieldSquareText,
            this.props.square.index + 1 === this.props.square.value
              ? styles.puzzleFieldSquareTextInPlace
              : null,
            { fontSize: this.props.fontSize }
          ]}
        >
          {this.props.square.value !== 0 ? this.props.square.value : ' '}
        </Text>
      </TouchableHighlight>
    );
  }
}

PuzzleFieldSquare.propTypes = {
  square: PropTypes.shape({
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    moveTo: PropTypes.number.isRequired,
  }),
  fontSize: PropTypes.number.isRequired,
  gameFinished: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  puzzleFieldSquare: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    margin: 0,
    backgroundColor: 'gray',
  },
  puzzleFieldSquareEmpty: {
    backgroundColor: 'darkgray',
  },
  puzzleFieldSquareText: {
    flex: 1,
    fontWeight: "bold",
    color: 'darkblue',
  },
  puzzleFieldSquareTextInPlace: {
    color: 'green',
  },
});

export default PuzzleFieldSquare;
