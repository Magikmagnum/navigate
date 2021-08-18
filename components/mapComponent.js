import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Constants from 'expo-constants'

const color = require('../helpers/color.json')
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MapComponent(props) {

  const currentLocation = [0.5222618, 9.3756831];
  const [client, setClient] = useState(null);
  const [streetName, setStreetName] = useState("");
  const [frontLocation, setFrontLocation] = useState(null);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);;

  useEffect(() => {

  }, [])

  const latitude = 0.5222618
  //props.coords.latitude
  const longitude = 9.3756831
  //props.coords.longitude


  const destinationMarker = () => {
    return (
      <Marker coordinate={{ latitude, longitude }}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#fff"
          }}
        >
          <Image source={require("../assets/avatar/img9.jpg")} style={{ borderRadius: 15, width: 30, height: 30, resizeMode: "cover" }} />

        </View>
      </Marker>

    )
  }

  const originMarker = () => {
    const latitude = 0.5014457;
    const longitude = 9.3948242;
    return (
      <Marker
        anchor={{ x: 0.5, y: 0.5 }}
        coordinate={{ latitude, longitude }}
      >
        <View

          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#fff"
          }}
        >
          <Image source={require("../assets/avatar/img4.jpg")} style={{ borderRadius: 15, width: 30, height: 30, resizeMode: "cover" }} />

        </View>
      </Marker >

    )
  }

  if (latitude && longitude) {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ ...styles.container, ...props.styleMap, height: windowHeight }}
      >
        {destinationMarker()}
        {originMarker()}
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
