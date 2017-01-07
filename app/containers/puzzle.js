import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PuzzleField from '../components/puzzleField';
import * as Actions from '../actions/puzzleActions';

const PZ_TOP_PANEL_HEIGHT = 60;
const PZ_BOTTOM_PANEL_HEIGHT = 50;
const PZ_CTRL_BTN_SHUFFLE_COLOR = 'rgb(255, 64, 129)';
const PZ_CTRL_BTN_WIN_COLOR = 'rgb(63, 81, 181)';

const Puzzle = function(props) {
  return (
    <View style={style.pzWrapper}>
      <View style={style.pzInfoPanel}>
        <Text style={style.pzTitle}>15 puzzle</Text>
      </View>
      <View style={style.pzField}>
        <PuzzleField
          field={props.field}
          rows={props.rowsCnt}
          cols={props.colsCnt}
          gameFinished={props.finished}
          onMoveSquare={props.moveSquare}
        />
      </View>
      <View style={style.pzButtonPanel}>
        <Button
          title={props.finished ? 'YOU WIN!' : 'SHUFFLE'}
          rised
          borderRadius={5}
          backgroundColor={props.finished ? PZ_CTRL_BTN_WIN_COLOR : PZ_CTRL_BTN_SHUFFLE_COLOR}
          onPress={props.shuffleField}
        />
      </View>
    </View>
  );
};

Puzzle.propTypes = {
  field: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowsCnt: PropTypes.number.isRequired,
  colsCnt: PropTypes.number.isRequired,
  finished: PropTypes.bool,
  moveSquare: PropTypes.func,
  shuffleField: PropTypes.func,
};

const style = StyleSheet.create({
  pzWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: PZ_BOTTOM_PANEL_HEIGHT,
  },
  pzInfoPanel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: PZ_TOP_PANEL_HEIGHT,
    borderBottomWidth : .5,
    borderColor    : '#b7b7b7',
    backgroundColor: '#fff',
  },
  pzTitle: {
    fontSize: 32,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  pzField: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  pzButtonPanel: {
    margin: 10,
  },
});

const mapStateToProps = state => ({
  field: state.puzzle.field,
  rowsCnt: state.puzzle.rowsCnt,
  colsCnt: state.puzzle.colsCnt,
  finished: state.puzzle.finished,
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Puzzle);
