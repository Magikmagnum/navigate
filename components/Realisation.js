import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'


const color = require('../helpers/color.json')

export default function Realisation(props) {

    let height = 140
    if (props.title) {
        height = 190
    }

    return (
        <TouchableOpacity>
            <View style={{ height: height, marginLeft: 20, borderWidth: 0.2 }}>
                <View style={{ height: 140, width: 200, borderColor: '#aaa', borderRadius: 12, elevation: 3, backgroundColor: color.primary.color }}>
                    <Image source={props.imageUri} style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12, flex: 1, width: null, height: null, resizeMode: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
                </View>
                {
                    props.title && <View style={{ flex: 1, paddingLeft: 2, paddingTop: 12 }}>
                        <Text style={{ fontSize: 13, color: '#222' }}>{props.title}</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>8</Text>
                            <Ionicons style={{ marginLeft: 2, marginRight: 16 }} name={'md-image'} color='#888' size={13} />
                            <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>200</Text>
                            <Ionicons style={{ marginLeft: 2, marginRight: 16 }} name={'md-heart'} color='#888' size={13} />
                            <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>30</Text>
                            <Ionicons style={{ marginLeft: 2 }} name={'md-chatbubbles'} color='#888' size={13} />
                        </View>
                    </View>
                }
            </View>
        </TouchableOpacity>

    )
}