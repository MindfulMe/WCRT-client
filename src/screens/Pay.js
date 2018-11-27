import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import applePay from '../images/applepay.png';
import Wallpaper from '../components/Login/Wallpaper';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    image: {
      position: 'absolute',
      bottom: '50%',
      borderStyle:'solid',
      borderColor: 'white',
      borderWidth: 2,
      width: '92%',
      borderRadius: 20,
      height: 60,
    }
  });

class Pay extends React.Component {
  render() {
    return (
      <Wallpaper>
        <View style={styles.container}>
            <Image source={applePay} style={styles.image} />
        </View>
      </Wallpaper>
    );
  }
}

export default Pay;
