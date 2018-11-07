import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from '../components/Login/Logo';
import Form from '../components/Login/Form';
import Wallpaper from '../components/Login/Wallpaper';
import ButtonSubmit from '../components/Login/ButtonSubmit';
import SignupSection from '../components/Login/SignupSection';

export default class LoginScreen extends Component {
  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form />
        <SignupSection />
        <ButtonSubmit />
      </Wallpaper>
    );
  }
}
