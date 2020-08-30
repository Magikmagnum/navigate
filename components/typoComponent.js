import React from 'react'
import { StyleSheet, Text, Dimensions, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const color = require('../helpers/color.json')
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function Header1(props) {
    return (
        <Text numberOfLines={props.numberOfLines} style={stylist(props, styles.header1)}>{props.title}</Text>
    )
}


export function Header2(props) {
    return (
        <Text numberOfLines={props.numberOfLines} style={stylist(props, styles.header2)}>{props.title}</Text>
    )
}


export function Header3(props) {
    return (
        <Text numberOfLines={props.numberOfLines} style={stylist(props, styles.header3)}>{props.title}</Text>
    )
}


export function Header4(props) {
    return (
        <Text numberOfLines={props.numberOfLines} style={stylist(props, styles.header4)}>{props.title}</Text>
    )
}


export function Header5(props) {
    return (
        <Text numberOfLines={props.numberOfLines} style={stylist(props, styles.header5)}>{props.title}</Text>
    )
}


export function Header6(props) {
    return (
        <Text numberOfLines={props.numberOfLines} style={stylist(props, styles.header6)}>{props.title}</Text>
    )
}


export function Header7(props) {
    return (
        <Text numberOfLines={props.numberOfLines} style={stylist(props, styles.header7)}>{props.title}</Text>
    )
}


export function HeaderShown(props) {
    let marginLeft = 0
    let width = windowWidth
    if (props.icon) {
        marginLeft = 8
        width = windowWidth - 128
    }
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 64, backgroundColor: '#fff' }}>
            {props.icon ?
                <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center', height: 64, width: 64 }}
                    onPress={() => props.callback()}>
                    <Ionicons name={props.icon} color='#000' size={24} />
                </TouchableOpacity> : null
            }
            <View style={{ alignItems: 'center', justifyContent: 'center', height: 64, width: width }} >
                <Text style={{ ...styles.HeaderShownText, marginLeft: marginLeft, color: '#000' }}>{props.title}</Text>
            </View>
        </View>
    )
}

function stylist(props, styles) {
    let stl = {}
    if (props.color) {
        stl.color = props.color
    }
    if (props.fontWeight) {
        stl.fontWeight = props.fontWeight
    }
    if (props.marginTop) {
        stl.marginTop = props.marginTop
    }
    if (props.marginBottom) {
        stl.marginBottom = props.marginBottom
    }
    if (props.paddingHorizontal) {
        stl.paddingHorizontal = props.paddingHorizontal
    }
    return { ...styles, ...stl }
}



const styles = StyleSheet.create({
    header1: {
        fontSize: 48,
        fontWeight: 'bold',
        lineHeight: 72,
        //backgroundColor: '#c48b9f',
    },
    header2: {
        fontSize: 36,
        fontWeight: 'bold',
        lineHeight: 48,
        //backgroundColor: '#c48b9f',
    },
    header3: {
        fontSize: 24,
        lineHeight: 36,
        //backgroundColor: '#f8bbd0',
        textAlign: "justify",
    },
    header4: {
        fontSize: 18,
        lineHeight: 28,
        //backgroundColor: '#f8bbd0',
        textAlign: "justify",
    },
    header5: {
        fontSize: 16,
        lineHeight: 24,
        //backgroundColor: '#f8bbd0',
        textAlign: "justify",
    },
    header6: {
        fontSize: 14,
        lineHeight: 24,
        //backgroundColor: '#f8bbd0',
        color:'#666',
        textAlign: "justify",
    },
    header7: {
        fontSize: 12,
        lineHeight: 20,
        //backgroundColor: '#f8bbd0',
        textAlign: "justify",
        color: '#888'
    },
    HeaderShownText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
});

