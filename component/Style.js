'use strict';

import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  body: {
    flex: 9,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    height: 56,
    backgroundColor: '#e9eaed',
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: 'red',
    borderWidth: 1
  },
  transparentButton: {
    marginTop: 10,
    padding: 15
  },
  transparentButtonText: {
    color: '#0485A9',
    textAlign: 'center',
    fontSize: 16
  },
  primaryButton: {
    margin: 10,
    padding: 15,
    backgroundColor: '#529ecc'
  },
  primaryButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18
  },
  loginErrorText: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  image: {
    width: 100,
    height: 100
  },
  actionButtonRight: {
    position: 'absolute',
    bottom: 0,
    left: 210,
    width: 200,
    height: 200,
  },
  actionButtonLeft: {
    position: 'absolute',
    bottom: 0,
    width: 200,
    height: 200,
  },
  actionButtonIcon: {
    fontSize: 24,
    height: 22,
    color: 'white',
  },
  selectViewButtonRight: {
    position: 'absolute',
    marginTop: 200,
  },
  selectTextContainer: {
    position: 'absolute',
    marginVertical: 50,
    alignSelf: 'center',
  },
  ar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  displayBar: {
    alignItems: 'center',
    height: 50,
    backgroundColor: '#C0C0C0',
    justifyContent: 'center',
  },
  displayFont: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  cameraPreview: {
    flex: 1,
  },
  closeCameraContainer: {
    position: 'absolute',
    marginVertical: 10,
    marginLeft: 375,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 28,
    height: 30,
    fontSize: 26,
    fontWeight: 'bold',
  },
  flagAR: {
    position: 'absolute',
    marginVertical: 120,
    width: 90,
    height: 90,
    backgroundColor: 'rgba(0,0,0,0)',
    alignSelf: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '75%',
  }
});

export default styles;
