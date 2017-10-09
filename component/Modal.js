import React, { Component } from "react";
import { Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Label, Item, Input } from 'native-base';
import Modal from 'react-native-modal';
import styles from "./Style";

export default class FormModal extends Component {

    constructor(props) {
        super(props)
        this._renderButton = this._renderButton.bind(this)
        this._renderModalContent = this._renderModalContent.bind(this)
    }

    _renderButton = (text) => (
        <TouchableOpacity onPress={this.props.addMarker}>
          <View style={styles.button}>
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
      );
    
    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <Item fixedlabel>
                <Input style={styles.input} placeholder="Your next remainder" onChangeText={updatedText => this.props.updateRemainder(updatedText)} />
            </Item>
          {this._renderButton('Submit') }
        </View>
      );

    render() {
        const isModalVisible = this.props.isModalVisible
        return (
            <View>
            <TouchableWithoutFeedback onPress={this.props.showModal}>
            <Modal
                isVisible={isModalVisible}
                backdropColor={'#336E7B'}
                backdropOpacity={0.9}
                animationIn={'zoomInDown'}
                animationOut={'zoomOutUp'}
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={1000}
                >
                    {this._renderModalContent()}
            </Modal>
            </TouchableWithoutFeedback>
            </View>
        )
    }
}