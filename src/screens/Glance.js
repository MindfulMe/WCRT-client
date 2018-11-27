import React from 'react';
import { View, WebView } from 'react-native';

class Glance extends React.Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://form.jotformeu.com/83281320755354'}}
        scalesPageToFit
        scrollEnabled={false}
      />
    );
  }
}

export default Glance;
