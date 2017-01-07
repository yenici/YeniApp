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

const MF_MINE_ICON = 'flash-on';
const MF_WRONG_MARK_ICON = 'flash-off';
const MF_MARK_ICON = 'flag';

const MF_SQUARE_COLORS = [
  '#fff',
  '#0100fe',
  '#017f01',
  '#fe0000',
  '#010080',
  '#810102',
  '#008081',
  '#000',
  '#808080',
];

class MineFieldSquare extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.square !== nextProps.square
      || this.props.fontSize !== nextProps.fontSize
      || this.props.gameFinished !== nextProps.gameFinished
      || this.props.onPress !== nextProps.onPress
      || this.props.onLongPress !== nextProps.onLongPress;
  }

  render() {
    let squareContent;
    if(this.props.square.isMarked) {
      if (this.props.gameFinished && !this.props.square.isMined) {
        // No mine under the mark
        squareContent = (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name={MF_WRONG_MARK_ICON} size={this.props.fontSize}/>
          </View>
        );
      } else {
        // Marked square with a mine
        squareContent = (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name={MF_MARK_ICON} size={this.props.fontSize}/>
          </View>
        );
      }
    } else if(this.props.square.isMined) {
      if (this.props.square.isVisible) {
        // BOOM!
        squareContent = (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name={MF_MINE_ICON} size={this.props.fontSize} style={{ color: 'red' }} />
          </View>
        );
      } else if (this.props.gameFinished) {
        // Square with a mine
        squareContent = (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name={MF_MINE_ICON} size={this.props.fontSize} />
          </View>
        );
      } else {
        // Empty square
        squareContent = (
          <Text style={[styles.mineFieldCellText, { fontSize: this.props.fontSize }]}>
            {' '}
          </Text>
        );
      }
    } else if (this.props.square.isVisible) {
      // Square with mined neighbors
      squareContent = (
        <Text
          style={[
            styles.mineFieldCellText,
            { fontSize: this.props.fontSize, color: MF_SQUARE_COLORS[this.props.square.minedNeighborsCnt] }
          ]}
        >
          {(this.props.square.isVisible && this.props.square.minedNeighborsCnt) || ' '}
        </Text>
      );
    } else {
      // Square is not visible
      squareContent = (
        <Text style={[styles.mineFieldCellText, { fontSize: this.props.fontSize }]}>
          {' '}
        </Text>
      );
    }
    return (
      <TouchableHighlight
        style={[styles.mineFieldSquare, this.props.square.isVisible ? styles.mineFieldSquareVisible : {}]}
        activeOpacity={this.props.gameFinished || this.props.square.isVisible ? 1 : 0.5}
        underlayColor={this.props.square.isVisible ? 'lightgray' : 'gray'}
        onPress={() => this.props.onPress(this.props.square.index)}
        onLongPress={() => {
          if (Platform.OS === 'android') {
            Vibration.vibrate([0, 100], false);
          } else {
            Vibration.vibrate([0]);
          }
          this.props.onLongPress(this.props.square.index);
        }}
      >
        {squareContent}
      </TouchableHighlight>
    );
  }
}

MineFieldSquare.propTypes = {
  square: PropTypes.shape({
    index: PropTypes.number.isRequired,
    isMined: PropTypes.bool,
    isMarked: PropTypes.bool,
    isVisible: PropTypes.bool,
    minedNeighborsCnt: PropTypes.number.isRequired,
  }),
  fontSize: PropTypes.number.isRequired,
  gameFinished: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  mineFieldSquare: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    margin: 0,
    backgroundColor: 'darkgray',
  },
  mineFieldSquareVisible: {
    backgroundColor: 'lightgray',
  },
  mineFieldCellText: {
    flex: 1,
    fontWeight: "bold",
    color: 'red',
  },
});

export default MineFieldSquare;
