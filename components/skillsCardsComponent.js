import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ImageBody, HeaderAvatar } from './cardsComponent'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
                        <Ionicons style={{ marginLeft: 2, marginRight: 32 }} name={'md-star'} color='#888' size={13} />
                        <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.voter}</Text>
                        <Ionicons style={{ marginLeft: 2, marginRight: 32 }} name={'md-bookmark'} color='#888' size={13} />
                        <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.voter}</Text>
                        <Ionicons style={{ marginLeft: 2, marginRight: 32 }} name={'md-heart'} color='#888' size={13} />
                        <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.voter}</Text>
                        <Ionicons style={{ marginLeft: 2 }} name={'md-chatbubbles'} color='#888' size={13} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
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