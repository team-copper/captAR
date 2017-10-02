import React from 'react';
import { View, Text, TextInput } from 'react-native';


const TitledInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {

    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label.toUpperCase()}</Text>
            <TextInput
                autoCorrect={false}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
                style={inputStyle}
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: '#262626',
        fontSize: 18,
        fontWeight: '200',
        flex: 1,
        height: 40
    },
    labelStyle: {
        fontSize: 12,
        color: '#7F7D7D',
        fontWeight: '200',
        flex: 1
    },
    containerStyle: {
        height: 45,
        flexDirection: 'column',
         alignItems: 'flex-start',
         width: '90%',
         borderColor: '#D4D4D4',
        borderBottomWidth: 1,
    }
};

export default TitledInput;
