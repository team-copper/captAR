'use strict';

import React from 'react';
import { StackNavigator } from 'react-navigation';
import { LoginForm, GameView } from '../component';

export const GameScreen = StackNavigator({
    LoginForm: {
        screen: LoginForm,
        navigationOptions: {
            title: 'Sign-Up/Login',
            headerLeft: null
        }
    },
    GameView: {
        screen: GameView,
        navigationOptions: {
            title: 'Enjoy your game!',
            headerLeft: null
        }
    }
});
