import React from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity, Text, Image } from 'react-native';
import styles from './styles';

const AccountCard = ({ onPress }) => (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.accountTitle}>
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={require('../../images/dollar.png')}
          />
          <View style={styles.titleText}>
            <Text>Account Title</Text>
            <Text>000-123 1234 5678</Text>
          </View>
        </View>
        <View style={styles.accountDetails}>
          <View style={styles.detailRow}>
            <Text>Balance</Text>
            <Text>$x,xxx.xx</Text>
          </View>
          <View style={styles.detailRow}>
            <Text>Available Funds</Text>
            <Text>$x,xxx.xx</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
);

AccountCard.propTypes = {
  onPress: PropTypes.func,
};

export default AccountCard;
