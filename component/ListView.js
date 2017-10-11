//not sure how to get item detail on press

import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

class ListView extends Component {
    state = {
       keys: [
          {'key': 'Ben', 'id': 1},
          {'key': 'Susan', 'id': 2},
          {'key': 'Robert', 'id': 3},
          {'key': 'Mary', 'id': 4},
          {'key': 'Daniel', 'id': 5},
       ]
    }
    render() {
       return (
          <View>
            <View style={styles.header}>
                <View style={styles.bar}>
                    <Text style={styles.title}>Select a Game to Join</Text>
                </View>
            </View>
             <ScrollView style={styles.marginTop}>
                 <View style={styles.scrollView}>
                {
                   this.state.keys.map((item, index) => (
                      <TouchableOpacity key = {item.id} style = {styles.item} onPress={item => console.log('i am pressed with ', item)}>
                         <Text>{item.key}</Text>
                         <Text>Number of players: {item.id}</Text>
                      </TouchableOpacity>
                   ))
                }
                </View>
             </ScrollView>
          </View>
       )
    }
 }
 export default ListView
 
 const styles = StyleSheet.create ({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#39CCCC',
        overflow: 'hidden',
      },
    bar: {
        marginTop: 28,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
      },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
      },
    scrollView: {
        marginTop: 50,
    },
    item: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    }
 })