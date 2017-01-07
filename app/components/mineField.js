import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableHighlight,
  StyleSheet,
  Vibration,
  View,
} from 'react-native';

import MineFieldSquare from './mineFieldSquare';

const MF_FONT_RATIO = 1.56261;

class MineField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
      fontSize: 0,
      paddingHorizontal: 0,
      paddingVertical: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.gameFinished !== nextProps.gameFinished
      || this.props.field !== nextProps.field
      || this.props.rows !== nextProps.rows
      || this.props.cols !== nextProps.cols
      || this.props.onOpenSquare !== nextProps.onOpenSquare
      || this.props.onMarkSquare !== nextProps.onMarkSquare
      || this.state !== nextState;
  }

  onChangeDimensions(event) {
    // TODO: Recalculate on change props
    const width = event.nativeEvent.layout.width;
    const height = event.nativeEvent.layout.height;
    if (width !== this.state.width || height !== this.state.height) {
      const squareSize = Math.floor(Math.min(width / this.props.cols, height / this.props.rows));
      const paddingHorizontal = Math.floor((width - squareSize * this.props.cols) / 2);
      const paddingVertical = Math.floor((height - squareSize * this.props.rows) / 2);
      const fontSize = Math.floor(squareSize / MF_FONT_RATIO);
      this.setState({ height, width, fontSize, paddingHorizontal, paddingVertical });
      console.log(`Dimensions: ${height} ${width}`);
      console.log(`  Paddings: ${paddingVertical} ${paddingHorizontal}`);
      console.log(`    Square: ${squareSize}`);
    }
  }

  render() {
    const fieldRows = new Array(this.props.rows);
    for(let i = 0; i < this.props.rows; i += 1) {
      let startIndex = i * this.props.cols;
      fieldRows[i] = this.props.field
        .slice(startIndex, startIndex + this.props.cols)
        .map(square => (
          <MineFieldSquare
            key={square.index}
            square={square}
            fontSize ={this.state.fontSize}
            gameFinished={this.props.gameFinished}
            onPress={this.props.onOpenSquare}
            onLongPress={this.props.onMarkSquare}
          />
        ));
    }
    return (
      <View
        style={[
          styles.mineFieldContainer,
          {
            paddingVertical: this.state.paddingVertical,
            paddingHorizontal: this.state.paddingHorizontal,
          }
          ]}
        onLayout={e => this.onChangeDimensions(e)}
      >
        {fieldRows.map((row, index) => (
          <View key={index} style={styles.mineFieldRow}>{row}</View>
        ))}
      </View>
    );
  }
}

MineField.propTypes = {
  field: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  gameFinished: PropTypes.bool,
  onOpenSquare: PropTypes.func.isRequired,
  onMarkSquare: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  mineFieldContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  mineFieldRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MineField;
