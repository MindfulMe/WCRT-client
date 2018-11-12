import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import EStyleSheet from 'react-native-extended-stylesheet';
import Dimensions from 'Dimensions';

import ModalPickerImage from '../components/ModalPickerImage';
import { HomeHeader } from '../components/HomeHeader';
import { Footer } from '../components/Footer';
import { HomeCarousel } from '../components/HomeCarousel';

import Logo from '../components/Login/Logo';
import Wallpaper from '../components/Login/Wallpaper';

EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
  $primaryOrange: '#D57A66',
  $primaryGreen: '#00BD9D',
  $primaryPurple: '#9E768F',
  $white: '#FFF',
  $border: '#E2E2E2',
  $inputText: '#797979',
  $lightGray: '#F0F0F0',
  $darkText: '#343434',
});


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.updateInfo = this.updateInfo.bind(this);
    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);

    this.state = {
      user: null,
      message: '',
      codeInput: '',
      confirmResult: null,
      // design data
      pickerData: [],
      valid: "",
      type: "",
      value: ""
    };
  }
  static propTypes = {
    navigation: PropTypes.object,
  };

  handleAccountsPress = () => {
    this.props.navigation.navigate('Accounts', { title: 'Accounts' });
  };

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ pickerData: this.phone.getPickerData(), user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          confirmResult: null,
          pickerData: [],
          valid: "",
          type: "",
          value: ""
        });
      }
    });
  }

  componentWillUnmount() {
     if (this.unsubscribe) this.unsubscribe();
  }

  componentDidUpdate() {
    if(this.state.valid) {
      this.signIn()
      this.state.valid = false;
    }
  }

  onPressFlag() {
    this.myCountryPicker.open();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.iso2);
  }

  updateInfo() {
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue()
    });
  }

  signIn = () => {
    this.setState({ message: 'Sending code ...' });

    firebase.auth().signInWithPhoneNumber(this.phone.getValue())
      .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
      .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  }

  renderPhoneNumberInput() {

    return (
      <Wallpaper>
        <Logo />
        <PhoneInput
        style={styles.input}
          textProps={{autoFocus: true, placeholder: 'Phone number...'}}
          initialCountry="ua"
          ref={(ref) => {
            this.phone = ref;
          }}
          onPressFlag={this.onPressFlag}
          onChangePhoneNumber={this.updateInfo}
        />

        <ModalPickerImage
          ref={(ref) => {
            this.myCountryPicker = ref;
          }}
          data={this.state.pickerData}
          onChange={(country) => {
            this.selectCountry(country);
          }}
          cancelText="Cancel"
        />
    </Wallpaper>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <Wallpaper>
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={'Code ... '}
          value={codeInput}
        />
        <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
      </View>
      </Wallpaper>
    );
  }

  render() {
    const { user, confirmResult } = this.state;

    return (
      <View style={styles.container}>
        {!user && !confirmResult && this.renderPhoneNumberInput() }

        {this.renderMessage}
        {!user && confirmResult && this.renderVerificationCodeInput()}
        {user && (
          <View style={styles.container2}>
            <Wallpaper>
              <StatusBar translucent={false} barStyle="light-content" />
              <HomeHeader onPress={this.handleOptionsPress} titleText="Internet Banking" />
              <HomeCarousel />
              <Footer onPress={this.handleAccountsPress} />
              <Button title="Sign Out" color="red" onPress={this.signOut} />
            </Wallpaper>
          </View>
        )}
      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#F5FCFF',
  },
  container2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 32,
    width: 120,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
  },
});