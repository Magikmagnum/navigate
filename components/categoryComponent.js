import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

export function Category(props) {

    let height = 100
    if(props.title){
      height = 150
    }
  
    return (
      <>
        <View style={{ height: height, marginLeft: 20, borderWidth: 0.2, }}>
          <View style={{ height: 100, width: 100, borderColor:'#aaa', borderRadius: 12, elevation: 3 }}>
            <Image source={props.imageUri} style={{borderBottomLeftRadius: 12, borderBottomRightRadius: 12 , flex: 1, width: null, height: null, resizeMode: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
          </View>
          {
            props.title && <View style={{ flex: 1, paddingLeft: 2, paddingTop: 12 }}>
              <Text style={{ fontSize:13, color:'#222' }}>{props.title}</Text>
            </View>
          }
        </View>
      </>
    )
  }
  