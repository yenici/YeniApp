import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';

const MainMenu = function() {
  return (
    <View style={styles.mainMenuWrapper}>
      <View style={styles.mainMenuLine}>
        <TouchableHighlight style={styles.mainMenuItem} >
          <Icon name="tablet-android" color="white" size={72} />
        </TouchableHighlight>
        <TouchableHighlight style={styles.mainMenuItem}>
          <Icon name="tablet-mac" color="white" size={72} />
        </TouchableHighlight>
      </View>
      <View style={styles.mainMenuLine}>
        <TouchableHighlight style={styles.mainMenuItem}>
          <Icon name="tablet" color="white" size={72} />
        </TouchableHighlight>
        <TouchableHighlight style={styles.mainMenuItem}>
          <Icon name="tv" color="white" size={72} />
        </TouchableHighlight>
      </View>
      <View style={styles.mainMenuLine}>
        <TouchableHighlight style={styles.mainMenuItem}>
          <Icon name="perm-identity" color="white" size={72} />
        </TouchableHighlight>
        <TouchableHighlight style={styles.mainMenuItem}>
          <Icon name="settings" color="white" size={72} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainMenuWrapper: {
    flex: 1,
    marginVertical: 54,
    // marginBottom: 54,
    backgroundColor: 'green',
  },
  mainMenuLine: {
    flex: 1,
    flexDirection: 'row',
  },
  mainMenuItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 3,
  }
});

export default MainMenu;
