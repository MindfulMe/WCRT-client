import React from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity, Text, Image } from 'react-native';

import styles from './styles';

const Footer = ({ onPress1, onPress2, onPress3, onPress4 }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={onPress1}>
      <Image resizeMode="contain" style={styles.icon} source={require('../../images/cards.png')} />
      <Text style={styles.subtext}>ACCOUNTS</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onPress2}>
      <Image resizeMode="contain" style={styles.icon} source={require('../../images/dollar.png')} />
      <Text style={styles.subtext}>PAY</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onPress3}>
      <Image
        resizeMode="contain"
        style={styles.icon}
        source={require('../../images/lightning.png')}
      />
      <Text style={styles.subtext}>EARN</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onPress4}>
      <Image resizeMode="contain" style={styles.icon} source={require('../../images/map.png')} />
      <Text style={styles.subtext}>LOCATE</Text>
    </TouchableOpacity>
  </View>
);

Footer.propTypes = {
  onPress1: PropTypes.func,
  onPress2: PropTypes.func,
  onPress3: PropTypes.func,
  onPress4: PropTypes.func,
};

export default Footer;
