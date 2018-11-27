import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import PropTypes from 'prop-types';
import Wallpaper from '../components/Login/Wallpaper';
import trash from '../images/trash.png';
import cards from '../images/cards.png';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignSelf: 'center'
  },
  button: {
    borderRadius: 10,
    width: 120,
    height: 40,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: 'grey',
  },
  flex: {
    flex: 1,
    width: '100%',
  },
  headTxt: {
    fontSize: 25,
    fontWeight: "500",
    left:5
  },
  distinguish: {
    fontSize: 25,
    fontWeight: "500",
    left: 5
  },
  restaurantTitle: {
    fontSize: 18,
    textAlign:'center'
  },
  exit: {
    fontSize: 20,
    fontWeight: "900",
    textAlign:'center'
  },
  price: {
    fontSize:25
  },
  dishName: {
    fontSize:18
  },
  box: {
    position: 'absolute',
    width: 400,
    height: 400,
    top:50,
    alignSelf: 'center',
  },
  imag: {
    width: 25,
    height: 25
  },
  vayv: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 8
  }
});

class OrdersBag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grandTotal: this.props.navigation.state.params.totalOrder
    };
  }
  
  render() {
    return (
      <Wallpaper>
        <ScrollView>
          <View>
            {this.props.navigation.state.params.totalOrder && this.state.grandTotal.map((item, index) => {
              return <View key={ index }><Text style={styles.headTxt}>{"\n"}{item.restaurant} {"\n"} {item.id}</Text><View><TouchableOpacity onPress={() => {}} style={styles.distinguish}><Text>{"\n"}{"\n"} <Text style={styles.dishName}>{item.name}</Text> {"\n"}<Text style={styles.price}>{item.price}</Text></Text></TouchableOpacity><View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
            /></View></View>;
            })}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}><View style={styles.vayv}><Text style={styles.dishName}>Checkout</Text><Image source={cards} style={styles.imag}/></View></TouchableOpacity>
        <TouchableOpacity style={styles.button}><View style={styles.vayv}><Text style={styles.dishName}>Empty Cart</Text><Image source={trash}  style={styles.imag}/></View></TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => {this.props.navigation.goBack(null)}}><Text style={styles.exit}>{"\n"}GO TO MAIN MENU</Text></TouchableOpacity>
      </Wallpaper>
    );
  }
}

export default OrdersBag;
