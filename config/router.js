import React from 'react';
import { StackNavigator } from 'react-navigation';

import LoginForm from '../component/LoginForm';
import GameView from '../component/GameView';

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