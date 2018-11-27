import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  NativeModules,
  LayoutAnimation,
  Image
} from 'react-native';
import axios from 'axios';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Wallpaper from '../components/Login/Wallpaper';
import marker from '../images/marker.png';
import carImage from '../images/car.png';
import shoppingBag from '../images/shoppingAnim.png';
import { GenericHeader } from '../components/GenericHeader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 50.4547;
const LONGITUDE = 30.5238;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
  
class RealMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      cars: [],
      prevPos: null,
      curPos: { latitude: 50.4547, longitude: 30.5238 },
      curAng: 45,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      isMenu: false,
      currentMenu: [],
      currentRestaurant: '',
      w: 250,
      h: 250,
      displ: 'none',
      totalOrder: []
    };
    this.socket = new WebSocket('ws://46.101.15.119:8000/cars');
    this.socket.onmessage = (event) => {
      let response = JSON.parse(event.data);
      const flatCars = Object.keys(response).map(k => {
        return ({
          coordinate: {latitude: response[k][0][0], longitude: response[k][0][1]},
          velocity: this.getRotation(response[k][1][0], response[k][1][1])
        });
      });
      this.setState({
        cars: flatCars
      })
    }
    this.changePosition = this.changePosition.bind(this);
    this.getRotation = this.getRotation.bind(this);
    this.updateMap = this.updateMap.bind(this);
  }

  static propTypes = {
    navigation: PropTypes.object,
  };
  
  componentDidMount() {
    this.getRestaurants();
  }

  handleOrdersPress = () => {
    this.props.navigation.navigate('OrdersBag', {
      title: 'Orders Total',
      type: 'orders',
      totalOrder: this.state.totalOrder
    });
  };
  
  getRestaurants() {
    axios.get('http://46.101.15.119:8000/restaurants/')
    .then((resp) => {
      return resp.data;
    })
    .then((response) => {
      const flatMarkers = response.result.flatMap(res => {
        const ret = res.places.map((p, idx) => {
          return ({
          id: res.id,
          title: `${res.name}\n(${p.address})`,
          coordinate: {latitude: p.position[0], longitude: p.position[1]}
        });
      });
        return ret;
      });
      this.setState({
        markers: flatMarkers
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getRestaurant(restaurant, restaurantName) {
    this.setState({ isMenu: true })
    axios.get(`http://46.101.15.119:8000/restaurant/${restaurant}`)
    .then((resp) => {
      return resp.data;
    })
    .then((response) => {
      const menu = response.map(k => {
        return ({
          id: k.id,
          items: k.items
        });
      });
      this.setState({
        currentMenu: menu,
        currentRestaurant: restaurantName
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  changePosition(latOffset, lonOffset) {
    const latitude = this.state.curPos.latitude + latOffset;
    const longitude = this.state.curPos.longitude + lonOffset;
    this.setState({ prevPos: this.state.curPos, curPos: { latitude, longitude } });
    this.updateMap();
  }

  getRotation(xDiff, yDiff) {
    if (!xDiff) return 0;
    // const xDiff = curPos.latitude - prevPos.latitude;
    // const yDiff = curPos.longitude - prevPos.longitude;
    return (Math.atan2(yDiff, xDiff) * 180.0) / Math.PI;
  }

  updateMap() {
    const { curPos, prevPos, curAng } = this.state;
    const curRot = this.getRotation(prevPos, curPos);
    this.map.animateCamera({ heading: curRot, center: curPos, pitch: curAng });
  }

  unMountMenu = () => {
    this.setState({ isMenu: false })
  }

  handleClosePress = () => {
    this.props.navigation.goBack(null);
  };

  shoppingBag = (name, price, id) => {
    let item = {
      restaurant: this.state.currentRestaurant,
      name,
      price,
      id
    };

    let bag = this.state.totalOrder;
    bag.push(item);
    this.setState({totalOrder: bag })
    this.animateBag();
  }

  animateBag = () => {
    LayoutAnimation.spring();
    this.setState({w: this.state.w + 25, h: this.state.h + 25, displ: 'flex'})
    setTimeout(() => {this.setState({w: this.state.w - 25, h: this.state.h - 25,})}, 600)
    setTimeout(() => {this.setState({w: 250, h: 250, displ: 'none'})}, 500)
  }

  menuItems = () => {
    return (
      <View>
        <Image source={shoppingBag} style={[styles.box, {width: this.state.w, height: this.state.h, display: this.state.displ}]} />
      <ScrollView>
        <StatusBar translucent={true} barStyle="dark-content" />
        <GenericHeader
          onPress={this.unMountMenu}
          onPressBag={this.handleOrdersPress}
          titleText="Menu"
          leftImage="../../images/menu.png"
          rightImage="../../images/cross.png"
        />
        
      <View>
        <Text style={styles.restaurantTitle}>{this.state.currentRestaurant}</Text>
       {this.state.currentMenu.map((item, index) => {
          return <View key={ index }><Text style={styles.headTxt}>{"\n"}{item.id}</Text>{item.items.map((obj, indx) => {return <View><TouchableOpacity onPress={() => {this.shoppingBag(obj.name, obj.price, obj.id)}} style={styles.distinguish} key={ indx }><Text>{"\n"}{"\n"} <Text style={styles.dishName}>{obj.name}</Text> {"\n"}<Text style={styles.price}>{obj.price}</Text></Text></TouchableOpacity><View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        /></View>})}</View>;
        })}
        <TouchableOpacity onPress={() => {this.props.navigation.goBack(null)}}><Text style={styles.exit}>{"\n"}GO TO MAIN MENU</Text></TouchableOpacity>
      </View>
      </ScrollView>
      </View>
    )
  }

  render() {

    return (
      <Wallpaper>
        <View style={styles.container}>
          {!this.state.isMenu ? 
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={this.state.region}
              zoomEnabled
              minZoomLevel={14}
            >
              {this.state.markers.map(m => (
                <Marker
                  title={m.title}
                  image={marker}
                  key={m.id}
                  coordinate={m.coordinate}
                  onPress={() => {
                    this.getRestaurant(m.id, m.title)
                  }}
                />
              ))}

              {this.state.cars.map(c => (
                <Marker
                  title={c.title}
                  image={carImage}
                  rotation={c.velocity}
                  key={c.id}
                  coordinate={c.coordinate}
                  anchor={{ x: 0.5, y: 0.5 }}
                />
              ))}
            </MapView> : <View>{this.menuItems()}</View>
          }
        </View>
      </Wallpaper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  flex: {
    flex: 1,
    width: '100%',
  },
  buttonContainerUpDown: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainerLeftRight: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  up: {
    alignSelf: 'flex-start',
  },
  down: {
    alignSelf: 'flex-end',
  },
  left: {
    alignSelf: 'flex-start',
  },
  right: {
    alignSelf: 'flex-end',
  },
  headTxt: {
    fontSize: 25,
    fontWeight: "500",
    left:5
  },
  distinguish: {
    fontSize: 25,
    fontWeight: "500",
    left:5
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
});

function mapStateToProps(state) {
  return {
    totalOrder: state.totalOrder
  };
}

export default connect(mapStateToProps)(RealMap);
