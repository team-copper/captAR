'user strict';

import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  cameraPreview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  actionButtonRight: {
    alignSelf: 'flex-end',
    width: 200,
    height: 200,
  },
  actionButtonLeft: {
    alignSelf: 'flex-start',
    width: 200,
    height: 200,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  ar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  map: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default styles;
