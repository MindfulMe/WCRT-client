import React from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity, Text, Image } from 'react-native';

import styles from './styles';

const Footer = ({ onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image resizeMode="contain" style={styles.icon} source={require('../../images/cards.png')} />
      <Text style={styles.subtext}>ACCOUNTS</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image resizeMode="contain" style={styles.icon} source={require('../../images/dollar.png')} />
      <Text style={styles.subtext}>PAY</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        resizeMode="contain"
        style={styles.icon}
        source={require('../../images/lightning.png')}
      />
      <Text style={styles.subtext}>GLANCE</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image resizeMode="contain" style={styles.icon} source={require('../../images/map.png')} />
      <Text style={styles.subtext}>LOCATE</Text>
    </TouchableOpacity>
  </View>
);

Footer.propTypes = {
  onPress: PropTypes.func,
};

export default Footer;
