import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import EStyleSheet from 'react-native-extended-stylesheet';

import ModalPickerImage from '../components/ModalPickerImage';
import { HomeHeader } from '../components/HomeHeader';
import { Footer } from '../components/Footer';
import { HomeCarousel } from '../components/HomeCarousel';
import LoginScreen from './LoginScreen';
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
    this.renderInfo = this.renderInfo.bind(this);
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

  renderInfo() {
    if (this.state.value) {
      return (
        <View style={styles.info}>
          <Text>
            Is Valid:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {this.state.valid.toString()}
            </Text>
          </Text>
          <Text>
            Type: <Text style={{ fontWeight: "bold" }}>{this.state.type}</Text>
          </Text>
          <Text>
            Value:{" "}
            <Text style={{ fontWeight: "bold" }}>{this.state.value}</Text>
          </Text>
        </View>
      );
    }
  }

  renderPhoneNumberInput() {

    return (
      <View style={styles.container}>
      <PhoneInput
        textProps={{autoFocus: true, placeholder: 'Phone number...'}}
        initialCountry="ua"
        ref={(ref) => {
          this.phone = ref;
        }}
        onPressFlag={this.onPressFlag}
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
      
      <TouchableOpacity onPress={this.updateInfo} style={styles.button}>
        <Text>Get Info</Text>
      </TouchableOpacity>
      <Button title="Sign In" color="green" onPress={this.signIn} />
      {this.renderInfo()}

    </View>
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
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    return (
      <View style={styles.container}>
        {!user && !confirmResult && <LoginScreen /> /*this.renderPhoneNumberInput() */}

        {this.renderMessage}
        {!user && confirmResult && this.renderVerificationCodeInput()}
        {user && (
          <View style={styles.container2}>
            
            <ImageBackground
              source={require('../images/backgrounds.jpg')}
              resizeMode="cover"
              style={{ width: '100%', height: '100%' }}
            >
              <StatusBar translucent={false} barStyle="light-content" />
              <HomeHeader onPress={this.handleOptionsPress} titleText="Internet Banking" />
              <HomeCarousel />
              <Footer onPress={this.handleAccountsPress} />
              <Button title="Sign Out" color="red" onPress={this.signOut} />
            </ImageBackground>
          </View>
        )}
      </View>
    );
  }
}

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
  }
});