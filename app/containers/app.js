import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import reducers from '../reducers/';

import TabBarItem from '../components/tabBarItem';

import Minesweeper from './minesweeper';
import Puzzle from './puzzle';
import MainMenu from './mainMenu';

const RouterWithRedux = connect()(Router);
const store = createStore(reducers);

export default class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="tabBar" tabs={true} tabBarStyle={style.tabBarStyle}>
            <Scene
              key="tabMinesweeper"
              title="Minesweeper"
              icon={params => TabBarItem({ ...params, iconName: 'flag' })}
            >
              <Scene key="pageMinesweeper" component={Minesweeper} title="Minesweeper" hideNavBar />
            </Scene>
            <Scene
              key="tabPuzzle"
              title="Puzzle"
              icon={params => TabBarItem({ ...params, iconName: 'extension' })}
            >
              <Scene key="pagePuzzle" component={Puzzle} title="Puzzle" hideNavBar />
            </Scene>
            <Scene
              key="tabSettings"
              title="Settings"
              icon={params => TabBarItem({ ...params, iconName: 'settings' })}
            >
              <Scene key="pageFour" component={MainMenu} title="Settings" />
            </Scene>
          </Scene>
        </RouterWithRedux>
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