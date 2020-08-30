import React, { useState, useEffect, useRef, Component } from 'react'
import { Platform, Text, View, StyleSheet} from 'react-native'
import MapView from 'react-native-maps'
import Constants from 'expo-constants'



export default function MapScreen (props) {
  const latitude =  props.coords.latitude
  const longitude =  props.coords.longitude
  const avatar = props.avatar

  if(latitude && longitude){
    return(
      <MapView
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{...styles.container, ...props.styleMap}}
        >
          <MapView.Marker.Animated
              key={1}
              coordinate={{ latitude, longitude }}
            />
      </MapView>
    )
  }

  return(
    <View style={styles.container}>
      <Text style={styles.paragraph}>Impossible de localiser le lieu</Text>
    </View>
  )
}

/*
const latitude =  this.props.coords.latitude
    const longitude =  this.props.coords.longitude

    if(latitude && longitude){
      console.log(latitude, longitude)
    }

    return(
      <View style={styles.container}>
        <Text style={styles.paragraph}>Impossible de localiser le lieu</Text>
      </View>
    )









*/
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
