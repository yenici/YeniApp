import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MineField from '../components/mineField';
import getMarkedSquaresCnt from '../selectors/minesweeper';
import * as Actions from '../actions/minesweeperActions';

const MS_CTRL_BTN_PLAY_ICON = 'sentiment-neutral';
const MS_CTRL_BTN_PLAY_COLOR = 'rgb(63, 81, 181)';
const MS_CTRL_BTN_WIN_ICON = 'sentiment-very-satisfied';
const MS_CTRL_BTN_WIN_COLOR = 'rgb(76, 175, 80)';
const MS_CTRL_BTN_LOOSE_ICON = 'sentiment-very-dissatisfied';
const MS_CTRL_BTN_LOOSE_COLOR = 'rgb(255, 64, 129)';
const MS_CTRL_BTN_SIZE = 22;
const MS_CTRL_BTN_ICON_SIZE = 32;
const MS_TOP_PANEL_HEIGHT = 60;
const MS_BOTTOM_PANEL_HEIGHT = 50;

const Minesweeper = function(props) {
  return (
    <View style={style.msWrapper}>
      <View style={style.msInfoPanel}>
        <Text>Mines: {props.markedSquaresCnt}/{props.minesCnt}</Text>
        <Icon
          type="material"
          name={
                props.status.finished
                  ? props.status.won ? MS_CTRL_BTN_WIN_ICON : MS_CTRL_BTN_LOOSE_ICON
                  : MS_CTRL_BTN_PLAY_ICON
              }
          color={
                props.status.finished
                  ? props.status.won ? MS_CTRL_BTN_WIN_COLOR : MS_CTRL_BTN_LOOSE_COLOR
                  : MS_CTRL_BTN_PLAY_COLOR
              }
          size={MS_CTRL_BTN_SIZE}
          iconStyle={{ fontSize:MS_CTRL_BTN_ICON_SIZE }}
          raised
          reverse
          onPress={props.generateField}
        />
        <Text>Time</Text>
      </View>
      <View style={style.msField}>
        <MineField
          field={props.field}
          rows={props.rowsCnt}
          cols={props.colsCnt}
          gameFinished={props.status.finished}
          onOpenSquare={props.openSquare}
          onMarkSquare={props.markSquare}
        />
      </View>
    </View>
  );
};

Minesweeper.propTypes = {
  field: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowsCnt: PropTypes.number.isRequired,
  colsCnt: PropTypes.number.isRequired,
  minesCnt: PropTypes.number.isRequired,
  status: PropTypes.shape({
    finished: PropTypes.bool,
    won: PropTypes.bool,
  }),
  markedSquaresCnt: PropTypes.number,
  openSquare: PropTypes.func,
  markSquare: PropTypes.func,
  generateField: PropTypes.func,
};

const style = StyleSheet.create({
  msWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: MS_BOTTOM_PANEL_HEIGHT,
  },
  msInfoPanel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: MS_TOP_PANEL_HEIGHT,
    borderBottomWidth : .5,
    borderColor    : '#b7b7b7',
    backgroundColor: '#fff',
  },
  msField: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => ({
  field: state.minesweeper.field,
  rowsCnt: state.minesweeper.rowsCnt,
  colsCnt: state.minesweeper.colsCnt,
  minesCnt: state.minesweeper.minesCnt,
  status: state.minesweeper.status,
  markedSquaresCnt: getMarkedSquaresCnt(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Minesweeper);
