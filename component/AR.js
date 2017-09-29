'user strict';

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Style } from './index';

export default class ARView extends Component {
  constructor() {
    super();
    this.state = {trigger: false};
  }

  render() {
    return (
      <View style={Style.ar}>
        <Image style={{width: 50, height: 50}}
               source={{uri: 'http://qualiadesigns.com/wp-content/uploads/qdi-generic-testimonial-person.png'}}
        />
      </View>
    )
  }
}
