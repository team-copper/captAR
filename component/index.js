'use strict';

export { default as Main } from "./Main";
export { default as OAuthLoginForm } from "./OAuthLoginForm";
export { default as SelectGameView } from "./SelectGameView";
export { default as SelectGameActionButtonView } from "./SelectGameActionButton";
export { default as GameView } from "./GameView";
export { default as GameActionButtonView } from "./GameActionButton";
export { default as Map } from "./Map";
export { default as CameraView } from "./Camera";
export { default as Style } from "./Style";
export { default as ListView } from "./ListView";

import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux'
import { Style, Main, GameView, LoginForm, SelectGameView, ListView } from './';
import store from '../store';
import { GameScreen } from '../config/router';

export default class captAR extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={Style.container}>
          <GameScreen />
        </View>
      </Provider>
    )
  }
}
