import React, { Component } from "react";
import { StyleSheet, View, Switch } from "react-native";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import Wallpaper from '../Login/Wallpaper';

const s = StyleSheet.create({
    switch: {
      alignSelf: "center",
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 40
    },
    container: {
      marginTop: 0,
      marginLeft:0,
    },
    label: {
      color: "black",
      fontSize: 12,
    },
    input: {
      fontSize: 16,
    },
  });
  

export default class Card extends Component {
  state = { useLiteCreditCardInput: false };

  _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
  _onFocus = (field) => console.log("focusing", field);
  _setUseLiteCreditCardInput = (useLiteCreditCardInput) => this.setState({ useLiteCreditCardInput });

  render() {
    return (
        <View style={s.container}>
          <Switch
            style={s.switch}
            onValueChange={this._setUseLiteCreditCardInput}
            value={this.state.useLiteCreditCardInput} />

          { this.state.useLiteCreditCardInput ?
            (
            <View />
            ) : (
              <CreditCardInput
                autoFocus={true}
                requiresName
                requiresCVC
                cardScale={1.2}
                labelStyle={s.label}
                inputStyle={s.input}
                validColor={"black"}
                invalidColor={"red"}
                placeholderColor={"darkgray"}

                onFocus={this._onFocus}
                onChange={this._onChange} />
            )
          }
        </View>
    );
  }
}
  