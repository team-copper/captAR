import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Style, LoginForm, GameView } from './';

class Main extends Component {
  render() {
    return (
      <View style={Style.container}>
        <GameView />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authenticated
  }
}

const MainContainer = connect(mapStateToProps)(Main)
export default MainContainer
