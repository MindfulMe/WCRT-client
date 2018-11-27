import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, View, StatusBar, Button } from 'react-native';
import firebase from 'react-native-firebase';
import { GenericHeader } from '../components/GenericHeader';
import { AccountCard } from '../components/AccountCard';
import Wallpaper from '../components/Login/Wallpaper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
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

  handleOrdersPress = () => {
    this.props.navigation.navigate('OrdersBag', {
      title: 'Orders Total',
      type: 'orders',
    });
  };

  signOut = () => {
    firebase.auth().signOut();
  }
  
  render() {
    return (
      <Wallpaper>
        <ScrollView>
        <View style={styles.container}>
            <StatusBar translucent={true} barStyle="dark-content" />
            <GenericHeader
              onPress={this.handleClosePress}
              onPressBag={this.handleOrdersPress}
              titleText="Accounts"
              leftImage="../../images/menu.png"
              rightImage="../../images/cross.png"
            />
            <AccountCard onPress={this.handleAccountPress} />
            <AccountCard onPress={this.handleAccountPress} />
        </View>
        </ScrollView>
        <Button title="Sign Out" color="red" onPress={this.signOut} />
      </Wallpaper>
    );
  }
}
