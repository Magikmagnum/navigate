import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import MapView from 'react-native-maps'
import Constants from 'expo-constants'

const color = require('../helpers/color.json')
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MapComponent(props) {
  const latitude = 0.5222618
  //props.coords.latitude
  const longitude = 9.3756831
  //props.coords.longitude

  if (latitude && longitude) {
    return (
      <MapView
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ ...styles.container, ...props.styleMap, height: windowHeight }}
      >
        <MapView.Marker.Animated
          key={1}
          coordinate={{ latitude, longitude }}
        />
      </MapView>
    )
  }

  return (
    <View style={{ ...styles.container, height: windowHeight }}>
      <Text style={styles.paragraph}>Impossible de localiser le lieu</Text>
    </View >
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
