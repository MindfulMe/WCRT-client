import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, StatusBar } from 'react-native';
import { GenericHeader } from '../components/GenericHeader';
import { AccountCard } from '../components/AccountCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
});

export default class Accounts extends Component {

  static propTypes = {
    navigation: PropTypes.object,
  };
  
  handleClosePress = () => {
    this.props.navigation.goBack(null);
  };

  // TODO: pressing different accounts should introduce different 'types'
  handleAccountPress = () => {
    this.props.navigation.navigate('DetailedAccount', {
      title: 'Account 1',
      type: 'account1',
    });
  };
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={false} barStyle="dark-content" />
        <GenericHeader
          onPress={this.handleClosePress}
          titleText="Accounts"
          leftImage="../../images/menu.png"
          rightImage="../../images/cross.png"
        />
        <AccountCard onPress={this.handleAccountPress} />
        <AccountCard onPress={this.handleAccountPress} />
      </View>
    );
  }
}
