import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ImageBackground, View, StatusBar } from 'react-native';
import { HomeHeader } from '../components/HomeHeader';
import { Footer } from '../components/Footer';
import { HomeCarousel } from '../components/HomeCarousel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };
  handleAccountsPress = () => {
    this.props.navigation.navigate('Accounts', { title: 'Accounts' });
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../images/backgrounds.jpg')}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        >
          <StatusBar translucent={false} barStyle="light-content" />
          <HomeHeader onPress={this.handleOptionsPress} titleText="Internet Banking" />
          <HomeCarousel />
          <Footer onPress={this.handleAccountsPress} />
        </ImageBackground>
      </View>
    );
  }
}
