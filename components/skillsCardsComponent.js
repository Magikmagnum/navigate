import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { ImageBody, HeaderAvatar, HeaderTitle, HeaderMore, SkillDash } from './cardsComponent'
import { SkillsChannelScreen } from '../screens/skillsChannelScreen'
import { Start } from '../components/startComponent'
import { Ionicons } from '@expo/vector-icons'
import { BorderlessButton, BaseButton, TouchableOpacity, RectButton } from 'react-native-gesture-handler'

const color = require('../helpers/color.json')

export function SkillsCards(props) {

    const [modalVisible, setModalVisible] = useState(false);
    return (
        <TouchableOpacity style={{ ...styles.content, ...props.styleContent, height: 'auto', paddingHorizontal: 20 }} onPress={() => {
            props.navigation.navigate('Skill', props)
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
                        <Ionicons style={{ marginLeft: 2, marginRight: 32 }} name={'md-images'} color='#888' size={13} />
                        <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.voter}</Text>
                        <Ionicons style={{ marginLeft: 2, marginRight: 32 }} name={'md-heart'} color='#888' size={13} />
                        <Text style={{ fontSize: 13, color: '#222', color: '#888' }}>{props.voter}</Text>
                        <Ionicons style={{ marginLeft: 2 }} name={'md-chatbubbles'} color='#888' size={13} />
                    </View>
                </View>
            </View>
            <View style={{ marginBottom: 40 }}>

            </View>
            <Modal
                presentationStyle="overFullScreen"
                animationType="slide"
                hardwareAccelerated={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                {modalVisible ? props.callback(props) : false}
            </Modal>
        </TouchableOpacity>
    )
}
/** */

const styles = StyleSheet.create({
    content: {
        height: 382,
        //backgroundColor:'#aaa', 
        //margin:8,
    },
    head: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        marginTop: 12
    }
});