import React, {Component} from 'react';
import Form from '../components/Login/Form';
import Logo from '../components/Login/Logo';
import Wallpaper from '../components/Login/Wallpaper';
import ButtonSubmit from '../components/Login/ButtonSubmit';

export default class LoginScreen extends Component {
  render() {
    return (
      <Wallpaper>
        <Logo />
      </Wallpaper>
    );
  }
}
