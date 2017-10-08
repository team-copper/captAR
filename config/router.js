'use strict';

import React from 'react';
import { StackNavigator } from 'react-navigation';
// import { LoginForm, GameView, SelectGameView } from '../component';

import { LoginForm } from '../component/LoginForm';
import { GameView } from '../component/GameView';
import SelectGameView from '../component/SelectGameView';

export const GameScreen = StackNavigator({
    // LoginForm: {
    //     screen: LoginForm,
    //     navigationOptions: {
    //         title: 'Sign-Up/Login',
    //         headerLeft: null
    //     }
    // },
    SelectGameView: {
        screen: SelectGameView,
        navigationOptions: {
            title: 'Select Your Team',
            headerLeft: null
        }
    }
    // GameView: {
    //     screen: GameView,
    //     navigationOptions: {
    //         title: 'Enjoy your game!',
    //         headerLeft: null
    //     }
    // }
});
