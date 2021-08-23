import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons'


const color = require('../helpers/color.json')
const windowWidth = Dimensions.get('window').width;


export function HeaderShown(props) {

    let marginLeft = 0
    let width = windowWidth
    let alignItems = 'center'
    let theme = {
        icon: {
            color: '#000'
        },
        text: {
            color: '#000'
        },
        content: {
            backgroundColor: '#fff'
        }
    }


    if (props.alignLeft) {
        alignItems = "flex-start"
    }

    if (!props.icon && props.iconRight) {
        marginLeft = 64
        width = windowWidth - 64
    } else if (props.icon || props.iconRight) {
        marginLeft = 8
        width = windowWidth - 128
    }

    if (props.theme == 'dark') {
        theme.icon.color = '#fff'
        theme.text.color = '#fff'
        theme.content.backgroundColor = '#000'
    }
    return (
        <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', height: 64, ...theme.content, ...props.style }}>
            {props.icon ?
                <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center', height: 64, width: 64 }}
                    onPress={() => props.callback()}>
                    <Ionicons name={props.icon} color={theme.icon.color} size={24} />
                </TouchableOpacity> : null
            }
            <View style={{ alignItems: alignItems, justifyContent: 'center', height: 64, width: width }} >
                <Text style={{ ...styles.headText, marginLeft: marginLeft, ...theme.text }}>{props.title}</Text>
            </View>
            {props.iconRight ?
                <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center', height: 64, width: 64 }}
                    onPress={() => props.callbackRight()}>
                    <Ionicons name={props.iconRight} color={theme.icon.color} size={20} />
                </TouchableOpacity> : null
            }
        </SafeAreaView>
    )
}



export function HeaderShownNavigations({ data, themes }) {

    const navigation = useNavigation()

    let marginLeft = 0
    let width = windowWidth
    let alignItems = 'center'
    let theme = {
        icon: {
            color: '#000'
        },
        text: {
            color: '#000'
        },
        content: {
            backgroundColor: '#fff'
        }
    }


    if (themes == 'dark') {
        theme.icon.color = '#fff'
        theme.text.color = '#fff'
        theme.content.backgroundColor = '#000'
    }


    const MenuIteme = ({ title, flag, root }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate(root)}
                style={{ flex: 1, height: 64, marginHorizontal: 8 }} >
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }} >
                    <Text style={{ marginLeft: marginLeft, ...theme.text, fontSize: 14, fontWeight: 'bold', marginTop: 8 }}>{title}</Text>
                </View>
                {flag && <View style={{ height: 3, backgroundColor: color.primary.color }} ></View>}
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', height: 64, ...theme.content, }}>

            <View style={{ marginHorizontal: 12 }}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {data.map((item, index) => {
                        return <MenuIteme key={index} title={item.title} flag={item.flag} root={item.root} />
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({


    head: {
        flex: 1,
        //height:72,
        backgroundColor: '#fff',
        flexDirection: "row",
    },
    headText: {
        fontSize: 16,
        fontWeight: 'bold'
    },


})