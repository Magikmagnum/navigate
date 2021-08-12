import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ImageBody, HeaderAvatar } from './cardsComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';


const color = require('../helpers/color.json');

export function SkillsCards(props) {

    return (
        <TouchableOpacity style={{ ...styles.content, ...props.styleContent, height: 'auto', paddingHorizontal: 20, marginBottom: 40 }} onPress={() => {
            props.navigation.navigate('Skill', JSON.stringify(props))
        }}>
            <ImageBody imageUri={props.imageUri} />
            <View style={styles.head}>
                <View style={{ marginRight: 20 }}>
                    <HeaderAvatar avatarUri={props.avatarUri} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold' }}>{props.title}</Text>
                    <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.subTitle}</Text>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.note}</Text>
                        <AntDesign style={{ marginLeft: 2, marginRight: 24 }} name='staro' size={14} color='#888' />
                        <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.voter}</Text>
                        <AntDesign style={{ marginLeft: 2, marginRight: 24 }} name='book' size={14} color='#888' />
                        <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.voter}</Text>
                        <AntDesign style={{ marginLeft: 2, marginRight: 24 }} name='rocket1' size={14} color='#888' />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}



export function SkillsLitleCards(props) {

    let height = 100
    if (props.title) {
        height = 150
    }
    //backgroundColor:'#eee'
    return (
        <>
            <View style={{ height: height, marginLeft: 20, borderWidth: 0.2 }}>
                <View style={{ height: 100, width: 100, borderColor: '#aaa', borderRadius: 12, elevation: 3, backgroundColor: color.primary.color }}>
                    <Image source={props.imageUri} style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12, flex: 1, width: null, height: null, resizeMode: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
                </View>
                {
                    props.title && <View style={{ flex: 1, paddingLeft: 2, paddingTop: 12 }}>
                        <Text style={{ fontSize: 13, color: '#222' }}>{props.title}</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.note}</Text>
                            <AntDesign style={{ marginLeft: 2, marginRight: 24 }} name='staro' size={14} color='#888' />
                            <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.voter}</Text>
                            <AntDesign style={{ marginLeft: 2, marginRight: 24 }} name='book' size={14} color='#888' />
                        </View>
                    </View>
                }
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    content: {
        height: 382,
    },
    head: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        marginTop: 12
    }
});