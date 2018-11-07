import React, { Component } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View, Text, Dimensions } from 'react-native';
import staticData from '../../data/carousel';
import styles from './styles';

export default class HomeCarousel extends Component {
  state = {
    activeSlide: 0,
  };
  renderItem({ item }) {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Carousel
          ref={(c) => {
            this._carousel = c; // eslint-disable-line no-underscore-dangle
          }}
          data={staticData}
          renderItem={this.renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={0.9 * Dimensions.get('window').width}
          onSnapToItem={index => this.setState({ activeSlide: index })}
        />
        <Pagination
          activeDotIndex={this.state.activeSlide}
          dotsLength={3}
          dotColor="rgb(255, 255, 255)"
          inactiveDotColor="rgb(50, 50, 50)"
        />
      </View>
    );
  }
}
