import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, ListItem } from "react-native-elements";

class ListViewFlat extends Component {
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
                    <Text style={styles.title}>Title</Text>
                </View>
            </View>
             <FlatList style={styles.marginTop}
                data={this.state.keys}
                renderItem={({item}) => (
                    <ListItem>
                        title={"Anuj"}
                    </ListItem>
                )}
             />
          </View>
       )
    }
 }
 export default ListViewFlat
 
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