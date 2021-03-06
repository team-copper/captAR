'use strict';

import React from 'react';
import { StackNavigator } from 'react-navigation';
import { OAuthLoginForm, GameView, SelectGameView, ListView } from '../component';

export const GameScreen = StackNavigator({
    OAuthLoginForm: {
        screen: OAuthLoginForm,
        navigationOptions: {
            title: 'Sign-Up/Login',
            header: null
        }
    },
    SelectGameView: {
        screen: SelectGameView,
        navigationOptions: {
            title: 'SelectGameView',
            header: null
        }
    },
    ListView: {
        screen: ListView,
        navigationOptions: {
            header: null
        }
    },
    GameView: {
        screen: GameView,
        navigationOptions: {
            title: 'GameView',
            header: null,
        }
    }
});
