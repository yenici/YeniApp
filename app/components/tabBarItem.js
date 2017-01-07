import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const tabBarItemActiveColor = 'rgb(63, 81, 181)';
// const tabBarItemActiveColor = '#397af8';
const tabBarItemPassiveColor = '#b7b7b7';
const tabBarItemIconSize = 24;
const tabBarItemTitleSize = 12;

const TabBarItem = ({ selected, title, iconName }) => {
  return (
    <View style={style.tabBarItemWrapper}>
      <Icon
        name={iconName}
        color={selected ? tabBarItemActiveColor : tabBarItemPassiveColor}
        size={tabBarItemIconSize}
      />
      <Text
        style={[
          style.tabBarItemTitle,
          { color: selected ? tabBarItemActiveColor : tabBarItemPassiveColor }
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

TabBarItem.propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
  iconName: PropTypes.string.isRequired,
};

const style = StyleSheet.create({
  tabBarItemWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarItemTitle: {
    fontSize: tabBarItemTitleSize,
  }
});

export default TabBarItem;
