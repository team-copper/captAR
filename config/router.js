'use strict';

import React from 'react';
import { StackNavigator } from 'react-navigation';
import { LoginForm, GameView, SelectGameView } from '../component';

// import { LoginForm } from '../component/LoginForm';
// import { GameView } from '../component/GameView';
// import {SelectGameView} from '../component/SelectGameView';

export const GameScreen = StackNavigator({
    // LoginForm: {
    //     screen: LoginForm,
    //     navigationOptions: {
    //         title: 'Sign-Up/Login',
    //         header: null
    //     }
    // },
    // SelectGameView: {
    //     screen: SelectGameView,
    //     navigationOptions: {
    //         title: 'SelectGameView',
    //         header: null
    //     }
    // },
    GameView: {
        screen: GameView,
        navigationOptions: {
            title: 'GameView',
            header: null,
        }
    }
});
