import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from '../reducers/';

import TabBarItem from '../components/tabBarItem';

import Minesweeper from './minesweeper';
import Puzzle from './puzzle';
import MainMenu from './mainMenu';

const store = createStore(reducers);

export default class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <Router>
          <Scene key="tabBar" tabs={true} tabBarStyle={style.tabBarStyle}>
            <Scene
              key="tabMinesweeper"
              hideNavBar={true}
              title="Minesweeper"
              icon={params => TabBarItem({ ...params, iconName: 'flag' })}
            >
              <Scene key="pageMinesweeper" component={Minesweeper} title="Minesweeper" />
            </Scene>
            <Scene
              key="tabPuzzle"
              hideNavBar={true}
              title="Puzzle"
              icon={params => TabBarItem({ ...params, iconName: 'extension' })}
            >
              <Scene key="pagePuzzle" component={Puzzle} title="Puzzle" />
            </Scene>
            <Scene
              key="tabSettings"
              title="Settings"
              icon={params => TabBarItem({ ...params, iconName: 'settings' })}
            >
              <Scene key="pageFour" component={MainMenu} title="Settings" />
            </Scene>
          </Scene>
        </Router>
      </Provider>
    );
  }
}

let style = StyleSheet.create({
  tabBarStyle: {
    borderTopWidth : .5,
    borderColor    : '#b7b7b7',
    backgroundColor: '#fff',
    opacity        : 1
  }
});