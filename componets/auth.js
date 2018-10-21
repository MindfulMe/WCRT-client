import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet, TouchableOpacity  } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import firebase from 'react-native-firebase';

import ModalPickerImage from './ModalPickerImage';
import App from './app/index';

export default class Auth extends Component {
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
      <View>

        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}

        {user && (
          <View>
            <App />
            <Button title="Sign Out" color="red" onPress={this.signOut} />
          </View>
        )}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    minWidth: 200
  },
  info: {
    // width: 200,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginTop: 20
  },
  button: {
    marginTop: 20,
    padding: 10
  },
});